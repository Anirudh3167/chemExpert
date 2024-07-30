import { useEffect, useState } from "react";
import { BlackboxAI, messagesType } from "../AI-agent/blackboxAI/BlackboxAI";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Chatbox({name, formula}:{name:string | undefined, formula:string | undefined}) {
    const [show, setShow] = useState(false);
    const [inputVal, setInputVal] = useState('');
    const [messages, setMessages] = useState<messagesType[]>([]);
    useEffect(()=>{
        setMessages([
            {role:"system", content : `Hi, I am ${name} with my chemical formula as ${formula}. How can I help you?`},]);
    },[name, formula]);
    const handleSetShow = () => {
        setShow(!show);
    }
    const sendMsg = async () => {
        if (!name || !formula) return ;
        const msg = inputVal;
        if (!msg || msg === '') return;
        setMessages((prev) => [...prev, {role:"user", content: msg}]);
        setInputVal('');
        // Send the request to the AI and get the response
        await BlackboxAI("chat", [{role:"ntg", content: name}, {role:"ntg", content: formula}, ...messages, {role:"user", content: msg}]).then((res) => {
            setMessages((prev) => [...prev, {role:"system", content: res}]);
        })
    }
    return(
    !show ? 
            <button className='bg-white text-black p-2 px-5 rounded-md w-fit h-auto font-semibold fixed bottom-4 right-4 z-10'
            onClick={()=>handleSetShow()}>
            Chat with {name} </button>
    :
    <div className="w-full max-h-screen h-full flex flex-col bg-black items-center justify-center max-w-md fixed top-0 right-0 z-10 border-l border-white">
    {/* Top Section */}
    <div className="w-full flex flex-row h-auto max-h-16 gap-5 items-center justify-start p-2">
      <button className="bg-red-800 flex items-center justify-center p-2 px-3 rounded-lg" onClick={() => handleSetShow()}>
        Close
      </button>
      <h1 className="text-3xl font-bold h-full overflow-hidden">{name}</h1>
    </div>
    {/* Chat Conversation */}
    <div className="w-full flex-grow flex flex-col p-2 overflow-auto">
      {messages.map((msg, index) => (
        <div
          className={`flex flex-row w-full h-auto items-end ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          key={index}
        >
          <div
            className={`max-w-4/5  min-w-10 w-auto flex flex-row gap-3 ${msg.role === "user" ? "bg-white bg-opacity-25" : "bg-transparent"} rounded-lg p-2`}
            key={index}
          >
            <Markdown remarkPlugins={[remarkGfm]}>{msg.content}</Markdown>
          </div>
        </div>
      ))}
    </div>
    {/* Bottom Section */}
    <div className="w-full flex flex-row h-auto gap-3 items-center justify-end p-2">
      <input className="w-full h-10 p-2 outline-none bg-transparent border-2 border-white rounded-lg text-white" 
      placeholder="Type here..." value={inputVal} onChange={(e)=>setInputVal(e.target.value)} />
      <button
        className="bg-white text-black p-1 px-5 rounded-md w-fit h-auto font-semibold"
        onClick={() => sendMsg()}
      >
        Send
      </button>
    </div>
  </div>
    )
}