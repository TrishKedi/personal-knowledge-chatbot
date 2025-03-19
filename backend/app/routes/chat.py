from fastapi import APIRouter
from transformers import pipeline
from app.services.embedding import search_similar_documents

router = APIRouter()

q_pipeline = pipeline('question-answering', model='deepset/roberta-base-squad2')

@router.post('/chat/')
async def chat(userquery: str):
    docs = search_similar_documents(userquery, top_k=1)

    if not docs['ids']:
        return {'error': 'No relevant documents foun'}
    
    base_context = docs["metadatas"][0][0]["text"]
    
    result = q_pipeline(question=userquery, context=base_context)

    return {'response': result['answer']}
