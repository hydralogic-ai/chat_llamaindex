# Q&A Bot with LlamaIndex, OpenAI, and ChromaDB

A question and answer chatbot with session-based context memory. Built with LlamaIndex for RAG, ChromaDB for vector storage, and a React frontend.

## Tech Stack

| Layer | Technology |
|-------|------------|
| LLM | OpenAI GPT-4o-mini |
| Embeddings | OpenAI text-embedding-3-small |
| RAG Framework | LlamaIndex |
| Vector DB | ChromaDB |
| Backend | Python, FastAPI |
| Frontend | React, Vite, TypeScript, shadcn/ui, Tailwind CSS |

## Quick Start

### 1. Configure Environment

```bash
# Copy sample env and add your OpenAI API key
cp backend/.env.sample backend/.env

# Edit backend/.env and add your OPENAI_API_KEY
```

### 2. Install & Run (Using Makefile)

```bash
# Install all dependencies
make install

# Run the application
make run
```

- Backend: http://localhost:8000
- Frontend: http://localhost:5173

## Manual Setup

### Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Makefile Commands

| Command | Description |
|---------|-------------|
| `make install` | Install all dependencies |
| `make run` | Run backend and frontend |
| `make run-backend` | Run backend only |
| `make run-frontend` | Run frontend only |
| `make index` | Re-index documents |
| `make clean` | Remove venv and node_modules |

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/chat` | POST | Send message, get AI response |
| `/api/session/{session_id}` | DELETE | Clear session memory |
| `/api/session/{session_id}/history` | GET | Get chat history |
| `/api/index` | POST | Re-index documents |

## Project Structure

```
avnet/
├── Makefile
├── README.md
├── backend/
│   ├── .env.sample
│   ├── requirements.txt
│   ├── main.py
│   ├── chroma_db/           # Vector storage (auto-created)
│   ├── sample_data/         # Documents to index
│   │   ├── faq.txt
│   │   ├── products.txt
│   │   └── support.txt
│   └── src/
│       ├── config.py        # OpenAI configuration
│       ├── indexer.py       # Document indexing
│       ├── chatbot.py       # Chat engine with memory
│       └── api.py           # FastAPI endpoints
└── frontend/
    └── src/
        ├── components/      # React components
        ├── hooks/           # useChat hook
        └── services/        # API client
```

## Features

- **Session-based Context**: Each browser session maintains conversation history
- **Follow-up Questions**: Ask "How much does it cost?" after asking about a product
- **Vector Search**: Documents are embedded and searched using ChromaDB
- **No Login Required**: Session ID stored in browser sessionStorage

## Sample Data

The bot comes pre-loaded with sample documents in `backend/sample_data/`:

- `faq.txt` - Frequently asked questions
- `products.txt` - Product catalog with prices
- `support.txt` - Technical support information

To add your own documents, place text files in `backend/sample_data/` and run:

```bash
make index
# Or via API: POST http://localhost:8000/api/index
```

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `OPENAI_API_KEY` | Yes | - | Your OpenAI API key |
