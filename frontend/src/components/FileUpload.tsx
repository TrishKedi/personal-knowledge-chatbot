import { useState } from "react"
import axios from "axios"
import { upload } from "@testing-library/user-event/dist/upload"

const FileUpload = () => {

    const [file, setFile] = useState<File | null>(null)
    const [uploading, setIsUploading] = useState(false)

    const handleUpload = async () =>{

        if (!file) return;

        const formData = new FormData()
        formData.append('file', file)

        try {
            await axios.post('http://localhost:8000/api/upload', formData)
        }
        catch(error){
            console.log(error)
        }
        finally{
            setIsUploading(false)
        }
    }

    return (
        <div  style={{ padding: "20px", textAlign: "center" }}>
            <input type="File" onChange={ (e) => setFile(e.target.files?.[0] || null)}/>
            <button
                onClick={ handleUpload }
                disabled={uploading}
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  cursor: "pointer",
                  marginLeft: "10px",
                }}
            >
                {uploading ? 'uploading' : 'upload'}
            </button>
        </div>
    )

}

export default FileUpload