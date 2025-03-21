import { useState } from "react";
import axios from "axios";

const Chat = () => {
    const [query, setQuery] = useState("")
    const [response, setResponse] = useState("")

    const handleChat = async () => {
        if (!query) return
        try{
            console.log(query)
            const res = await axios.post(
                'http://localhost:8000/api/chat',  
                { userquery: query },
                { headers: { "Content-Type": "application/json" } }
            )
            setResponse(res.data.response)
        }
        catch(error){
            console.log(error)
        }
    }

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <input 
                value={query}
                placeholder="Ask a question"
                type="text"
                onChange={(e) => setQuery(e.target.value)}
                style={{
                    padding: "10px",
                    border: "1px solid gray",
                    width: "60%",
                  }}
            />
            <button
                onClick={handleChat}
                style={{
                    backgroundColor: "green",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
            >
            </button>
            { response && <p style={{ marginTop: "20px", fontWeight: "bold" }}>Response: {response}</p>}
        </div>
    )

}

export default Chat;