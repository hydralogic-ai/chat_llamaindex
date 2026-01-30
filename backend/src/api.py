from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import json

from .chatbot import chat, chat_stream, clear_session, get_session_history
from .indexer import load_and_index_documents

app = FastAPI(
    title="Q&A Bot API",
    description="Question and Answer bot with session-based context",
    version="1.0.0",
)

# CORS middleware for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:5176",
        "http://localhost:3000",
        "http://localhost:80",
        "http://localhost",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    session_id: str
    message: str


class ChatResponse(BaseModel):
    response: str
    session_id: str


class HealthResponse(BaseModel):
    status: str
    message: str


class IndexResponse(BaseModel):
    status: str
    documents_indexed: int


class HistoryResponse(BaseModel):
    session_id: str
    messages: list


@app.get("/api/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint."""
    return HealthResponse(status="ok", message="Q&A Bot API is running")


@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """Process a chat message and return AI response (non-streaming)."""
    if not request.session_id:
        raise HTTPException(status_code=400, detail="session_id is required")

    if not request.message or not request.message.strip():
        raise HTTPException(status_code=400, detail="message is required")

    try:
        response = chat(request.session_id, request.message.strip())
        return ChatResponse(response=response, session_id=request.session_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/chat/stream")
async def chat_stream_endpoint(request: ChatRequest):
    """Process a chat message and stream AI response."""
    if not request.session_id:
        raise HTTPException(status_code=400, detail="session_id is required")

    if not request.message or not request.message.strip():
        raise HTTPException(status_code=400, detail="message is required")

    async def generate():
        try:
            for chunk in chat_stream(request.session_id, request.message.strip()):
                # Send as Server-Sent Events format
                yield f"data: {json.dumps({'content': chunk})}\n\n"
            yield f"data: {json.dumps({'done': True})}\n\n"
        except Exception as e:
            yield f"data: {json.dumps({'error': str(e)})}\n\n"

    return StreamingResponse(
        generate(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        }
    )


@app.delete("/api/session/{session_id}")
async def clear_session_endpoint(session_id: str):
    """Clear session memory."""
    cleared = clear_session(session_id)
    if cleared:
        return {"status": "ok", "message": "Session cleared"}
    return {"status": "ok", "message": "Session not found or already cleared"}


@app.get("/api/session/{session_id}/history", response_model=HistoryResponse)
async def get_history_endpoint(session_id: str):
    """Get chat history for a session."""
    history = get_session_history(session_id)
    return HistoryResponse(session_id=session_id, messages=history)


@app.post("/api/index", response_model=IndexResponse)
async def reindex_documents():
    """Re-index all documents in sample_data folder."""
    try:
        _, doc_count = load_and_index_documents()
        return IndexResponse(status="ok", documents_indexed=doc_count)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
