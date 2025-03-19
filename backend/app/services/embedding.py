from sentence_transformers import SentenceTransformer
import chromadb

model = SentenceTransformer('all-MiniLM-L6-v2')
chromaClient = chromadb.PersistentClient('./chroma')
collection = chromaClient.get_or_create_collection('documets')

def generate_embeddings(text: str, doc_id: str):
    vector = model.encode(text).tolist()
    print(vector)
    collection.add(ids=[doc_id], embeddings=[vector], metadatas=[{'text': text}])

def search_similar_documents(query: str, top_k=3):
    vector_query = model.encode(query).tolist()
    results = collection.query(query_embeddings=[vector_query], n_results=top_k)
    return results

