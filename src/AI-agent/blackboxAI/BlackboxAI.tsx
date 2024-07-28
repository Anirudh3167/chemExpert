export interface messagesType {
    role: string;
    content: string;
}
export async function BlackboxAI(query_type: string, messages: messagesType[]) {

    let info_prompt = '';
    let chat_input: messagesType[] = [];
    if (query_type === 'query') {
        let q = messages[0].content;
        info_prompt = `
            You are an expert Chemist.

            Your job is to provide the required information about a compound.

            The compound is ${q}.

            You should respond in the following format:
            #SEP#
            {
                "name": "name of the compound",
                "description": "description of the compound",
                "uses": [use1, use2, ...],
                "chemicalFormula": "chemical formula of the compound",
                "facts": [fact1, fact2, ...],
                "boilingPoint": "boiling point of the compound",
                "meltingPoint": "melting point of the compound"
            }
            #SEP#

            This should include that (#SEP#) to seperate the JSON response.
            Remember the output should be in JSON format and it shuold parsable by JSON.parse().

            Some common guidelines is,
            1. don't generate multiline text as it is not parsed by the JSON
            2. The output must be in the expected format.

            You must include that (#SEP#) to seperate the JSON response.
        `
        chat_input = [...messages.slice(1),{role:"system", content: info_prompt}];
    } else if (query_type === 'chat') {
        let compound = messages[0].content;
        let formula = messages[1].content;
        info_prompt = `
            You are an expert Chemist.

            In order to teach chemistry to children in an easy and effective way you decide to act as the given compound.

            The compound given is ${compound}.
            It's formula is ${formula}.

            The responses should short and precise along with humor.
            Make the response as short as possible unless user asks
            You should make the response more friendly to the kids by adding a bit of humor along with learning
        `
        chat_input = [{role:"system", content: info_prompt},...messages.slice(2)];
    }
    const res = await fetch("/api/chat", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify({
          "messages": chat_input,
          "agentMode": {},
          "trendingAgentMode": {}
        })
      }).then(r=>r.text());

    //   console.log("Type: ", query_type, "\n\nResponse: ", res);
      
    //   return res.slice('$@$v=v1.20-rv1$@$2$@$'.length)
    return  query_type === "query" ? res : 
    // res.slice('$@$v=v1.22-rv1$@$*'.length)
    res.replace(/\$@\$(v=v\d+\.\d+-rv\d+)\$@\$/,'');
    ;
}