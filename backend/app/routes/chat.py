from fastapi import APIRouter
from pydantic import BaseModel
from transformers import pipeline
from app.services.embedding import search_similar_documents

router = APIRouter()

class ChatRequest(BaseModel):
    userquery: str
q_pipeline = pipeline('question-answering', model='deepset/roberta-base-squad2')


@router.post('/chat/')
async def chat(query: ChatRequest):
    userquery = query.userquery
    print(userquery)
    docs = search_similar_documents(userquery, top_k=1)
    print(docs)

    if not docs['ids']:
        return {'error': 'No relevant documents foun'}
    
    base_context = docs["metadatas"][0][0]["text"]
    
    result = q_pipeline(question=userquery, context=base_context)

    return {'response': result['answer']}
