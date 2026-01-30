# RAG Chat Application

A Retrieval-Augmented Generation (RAG) chatbot with session-based context memory. Built with LlamaIndex, ChromaDB for vector storage, and a modern React frontend.

## Features

- **RAG-Powered Responses**: Answers grounded in your document knowledge base
- **Session-Based Context**: Maintains conversation history per session
- **Follow-up Questions**: Natural conversational flow with context awareness
- **Vector Search**: Fast semantic search using ChromaDB
- **Real-time Streaming**: Live response streaming for better UX
- **No Authentication Required**: Simple session-based approach

## Tech Stack

| Layer | Technology |
|-------|------------|
| LLM | OpenAI GPT-4o-mini (configurable) |
| Embeddings | OpenAI text-embedding-3-small |
| RAG Framework | LlamaIndex |
| Vector DB | ChromaDB |
| Backend | Python, FastAPI |
| Frontend | React, Vite, TypeScript, Tailwind CSS |

## Getting Started

### Prerequisites

- Python 3.9+
- Node.js 18+
- OpenAI API key

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/chat_llamaindex.git
cd chat_llamaindex
```

### 2. Configure Environment

```bash
cp backend/.env.sample backend/.env
```

Edit `backend/.env` and add your OpenAI API key:

```
OPENAI_API_KEY=your-api-key-here
```

### 3. Install & Run

Using Makefile (recommended):

```bash
make install
make run
```

Or manually:

```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

### 4. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## Project Structure

```
chat_llamaindex/
├── backend/
│   ├── main.py              # Application entry point
│   ├── requirements.txt     # Python dependencies
│   ├── .env.sample          # Environment template
│   ├── sample_data/         # Documents for indexing
│   └── src/
│       ├── config.py        # Configuration settings
│       ├── indexer.py       # Document indexing logic
│       ├── chatbot.py       # Chat engine with memory
│       └── api.py           # FastAPI routes
├── frontend/
│   └── src/
│       ├── components/      # React components
│       ├── hooks/           # Custom React hooks
│       └── services/        # API client
├── Makefile                 # Build automation
└── README.md
```

## API Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/chat` | POST | Send message and get response |
| `/api/session/{session_id}` | DELETE | Clear session memory |
| `/api/session/{session_id}/history` | GET | Retrieve chat history |
| `/api/index` | POST | Re-index documents |

## Adding Your Documents

Place your text files in `backend/sample_data/` and run:

```bash
make index
```

Supported formats: `.txt`, `.pdf`, `.md`

## Makefile Commands

| Command | Description |
|---------|-------------|
| `make install` | Install all dependencies |
| `make run` | Start backend and frontend |
| `make run-backend` | Start backend only |
| `make run-frontend` | Start frontend only |
| `make index` | Re-index documents |
| `make clean` | Remove venv and node_modules |

## Configuration

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes | OpenAI API key |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [LlamaIndex](https://www.llamaindex.ai/) - RAG framework
- [ChromaDB](https://www.trychroma.com/) - Vector database
- [FastAPI](https://fastapi.tiangolo.com/) - Backend framework
- [Vite](https://vitejs.dev/) - Frontend build tool
