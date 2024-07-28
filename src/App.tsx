import { useRef } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom';

function App() {
  const searchRef = useRef(null);
  const router = useNavigate();

  const searchAction = () => {
    const name = searchRef?.current?.value;
    if (!name || name === '') return;
    router(`/search/${name}`);
  }
  return(
    <div className="flex items-center justify-center h-screen bg-black p-6">
      <div className="flex flex-col gap-3 text-white w-full">
      <h1 className="text-center text-4xl font-bold bg-clip-text bg-gradient-to-r text-transparent from-green-400 to-blue-500">
          ChemExpert
        </h1>
        <h1 className="text-center text-2xl font-bold mb-4">
          Search Any Element or Compound
        </h1>
        <div className="flex items-center justify-center gap-3 flex-row flex-wrap w-full max-md:justify-end">
        <input
          type="text"
          className="w-full max-w-2xl border border-white bg-transparent rounded-md p-4 py-3 placeholder-gray-400"
          placeholder="Enter element or compound details"
          style={{ outline: 'none' }}
          ref={searchRef}
        />
        <button className='bg-white text-black p-2 px-5 rounded-md w-fit h-auto font-semibold'
        onClick={()=>searchAction()}>Search</button>
        </div>
      </div>
    </div>
  )
}

export default App
