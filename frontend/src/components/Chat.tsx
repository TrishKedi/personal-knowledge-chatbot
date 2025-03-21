import { useState } from "react";
import axios from "axios";
import { useChatMutation } from "../api/api"
import { Container, Typography, TextField, Button, CircularProgress} from "@mui/material"


const Chat = () => {
    const [query, setQuery] = useState("")
    const [response, setResponse] = useState("")
    const chatMutation = useChatMutation();

    const handleChat = async () => {
        if (!query) return
        chatMutation.mutate(query)
    
    }

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <Container maxWidth="sm" sx={{ mt: 4}}>
                <Typography variant="h4"> AI Knowledge bot</Typography>
                <TextField
                    fullWidth
                    label='Ask a question'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    variant="outlined"
                    sx={{ mb: 4}}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleChat}
                    disabled={chatMutation.status == 'pending'}
                >
                    { chatMutation.status == 'pending' ? ( <CircularProgress size={24}/> ) : 'Ask'}

                </Button>

                {chatMutation.isSuccess && (
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        {chatMutation.data.response}
                    </Typography>
                )}
                {chatMutation.isError && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {chatMutation.error.message}
                    </Typography>
                )}
            </Container>
   
        </div>
    )

}

export default Chat;