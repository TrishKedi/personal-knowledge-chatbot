import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = 'http://localhost:8000/api'
export const useChatMutation = () => {

    return useMutation({
        mutationFn: async (userquery: string) => {
            const response = await axios.post(`${BASE_URL}/chat`, {userquery})
            return response.data
        }
    })

};

export const useUploadMutation = () => {
    return useMutation({
        mutationFn: async (file: File) => {
            const formData = new FormData()
            formData.append('file', file)
            await axios.post(`${BASE_URL}/upload`, formData)

        }
    })

};