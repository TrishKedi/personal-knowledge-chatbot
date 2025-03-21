from fastapi import FastAPI
from  fastapi.middleware.cors import CORSMiddleware
from app.routes import upload, chat


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow requests from React
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

app.include_router(upload.router, prefix='/api')
app.include_router(chat.router, prefix='/api')