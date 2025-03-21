import { useState } from "react"
import axios from "axios"
import { useUploadMutation } from "../api/api"
import { Container, Button, CircularProgress, Typography, Input} from "@mui/material"

const FileUpload = () => {

    const [file, setFile] = useState<File | null>(null)
    const [uploading, setIsUploading] = useState(false)

    const uploadMutation = useUploadMutation();

    const handleUpload = async () =>{
        if (!file) return;
        uploadMutation.mutate(file)
    }

    const handleFileChange= (event: React.ChangeEvent<HTMLInputElement>) =>{
        const fileInput = event.currentTarget;

        if(fileInput.files == null || fileInput.files.length == 0){
            return;
        }
        
        setFile(fileInput.files[0]);
    }

    return (
        <div  style={{ padding: "20px", textAlign: "center" }}>
            <Container>
                <Typography variant="h5" gutterBottom>Uplaod File</Typography>
            </Container>
            <Input type="file" onChange={handleFileChange} sx={{ mb: 2 }}/>
            <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
                disabled={uploadMutation.status =='pending'}
            >
                { uploadMutation.status == 'pending'? (<CircularProgress size={24} />) : 'Upload File'}
                
            </Button>
            {uploadMutation.isSuccess && (
                <Typography variant="h6" color="success" sx={{ mt: 2 }}> File successfully uploaded</Typography>
            )}

            { uploadMutation.isError && (
                <Typography variant="h6" color="success" sx={{ mt: 2 }}> File upload failed</Typography>
            )}
         
        </div>
    )

}

export default FileUpload