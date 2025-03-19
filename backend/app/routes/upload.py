from fastapi import APIRouter, File, UploadFile
from app.services import embedding
import pymupdf
import os

router = APIRouter()

UPLOAD_DIR = 'uploads'
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post('/upload/')
async def uplaod_file(file : UploadFile = File(...)):
    file_path = f'{UPLOAD_DIR}/{file.filename}'
    with open(file_path, 'wb') as f:
        f.write(await file.read())

    text = extract_text(file_path)
    embedding.generate_embeddings(text, file.filename)
    return { 'filename': file.filename, 'text': text }

def extract_text(file_path: str) -> str:
    text = ''
    doc = pymupdf.open(file_path)

    for page in doc:
        text += page.get_text()
    
    return text

