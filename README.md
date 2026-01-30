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
| LLM | Anthropic Claude (configurable: OpenAI, Azure, Ollama) |
| Embeddings | HuggingFace BGE (free, runs locally) |
| RAG Framework | LlamaIndex |
| Vector DB | ChromaDB (configurable: MongoDB Atlas) |
| Backend | Python, FastAPI |
| Frontend | React, Vite, TypeScript, Tailwind CSS |

## Getting Started

### Prerequisites

- Python 3.9+
- Node.js 18+
- API key for your chosen LLM provider (Anthropic, OpenAI, Azure, or Ollama)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/chat_llamaindex.git
cd chat_llamaindex
```

### 2. Configure Environment

```bash
cp backend/.env.sample backend/.env
```

Edit `backend/.env` and configure your LLM provider:

```bash
# Default: Anthropic Claude
LLM_PROVIDER=anthropic
ANTHROPIC_API_KEY=your-api-key-here

# Or use OpenAI
# LLM_PROVIDER=openai
# OPENAI_API_KEY=your-api-key-here

# Or use Ollama (local, no API key needed)
# LLM_PROVIDER=ollama
# OLLAMA_MODEL=llama3
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
│   ├── Dockerfile           # Backend container
│   ├── .env.sample          # Environment template
│   ├── sample_data/         # Documents for indexing
│   └── src/
│       ├── config.py        # Multi-provider configuration
│       ├── indexer.py       # Document indexing (Chroma/MongoDB)
│       ├── chatbot.py       # Chat engine with hybrid search
│       └── api.py           # FastAPI routes
├── frontend/
│   ├── Dockerfile           # Frontend container
│   ├── nginx.conf           # Production nginx config
│   └── src/
│       ├── components/      # React components
│       ├── hooks/           # Custom React hooks
│       └── services/        # API client
├── docker-compose.yml       # Container orchestration
├── .env.docker              # Docker environment template
├── Makefile                 # Build automation
├── TODO.md                  # Project roadmap
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

## Docker Deployment

### Quick Start with Docker

```bash
# Copy environment template
cp .env.docker .env

# Edit .env with your API keys
nano .env

# Start the application
make docker-up
```

Access the app at http://localhost

### Docker Commands

| Command | Description |
|---------|-------------|
| `make docker-build` | Build Docker images |
| `make docker-up` | Start containers (detached) |
| `make docker-down` | Stop containers |
| `make docker-logs` | View container logs |
| `make docker-clean` | Remove containers and volumes |

### Using Ollama with Docker

When running in Docker, Ollama connects to the host machine:

```bash
# In .env
LLM_PROVIDER=ollama
OLLAMA_BASE_URL=http://host.docker.internal:11434
OLLAMA_MODEL=llama3
```

## Local Development Commands

| Command | Description |
|---------|-------------|
| `make install` | Install all dependencies |
| `make run` | Start backend and frontend |
| `make run-backend` | Start backend only |
| `make run-frontend` | Start frontend only |
| `make index` | Re-index documents |
| `make clean` | Remove venv and node_modules |

## Configuration

### LLM Providers

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `LLM_PROVIDER` | No | `anthropic` | Provider: `anthropic`, `openai`, `azure`, `ollama` |
| `ANTHROPIC_API_KEY` | If Anthropic | - | Anthropic API key |
| `OPENAI_API_KEY` | If OpenAI | - | OpenAI API key |
| `AZURE_OPENAI_ENDPOINT` | If Azure | - | Azure OpenAI endpoint URL |
| `AZURE_OPENAI_API_KEY` | If Azure | - | Azure OpenAI API key |
| `AZURE_OPENAI_DEPLOYMENT` | If Azure | - | Azure deployment name |
| `OLLAMA_BASE_URL` | If Ollama | `http://localhost:11434` | Ollama server URL |
| `OLLAMA_MODEL` | If Ollama | `llama3` | Ollama model name |

### Vector Database & Search

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VECTOR_DB_PROVIDER` | No | `chroma` | Vector DB: `chroma`, `mongodb` |
| `MONGODB_URI` | If MongoDB | - | MongoDB Atlas connection string |
| `MONGODB_DB_NAME` | If MongoDB | `rag_chat` | MongoDB database name |
| `ENABLE_HYBRID_SEARCH` | No | `false` | Enable semantic + keyword search |

## Roadmap

See [TODO.md](TODO.md) for the full roadmap.

**Completed**
- [x] Azure OpenAI, OpenAI, Anthropic, Ollama support
- [x] MongoDB Atlas Vector Search
- [x] Hybrid search (semantic + keyword)
- [x] Environment-based provider configuration
- [x] Docker + Docker Compose deployment

**Planned**
- [ ] Weaviate, Pinecone, Qdrant vector stores
- [ ] Google Gemini support
- [ ] Data ingestion (PDF, Word, web crawler)
- [ ] Agent-based chat with tools
- [ ] Source citations
- [ ] CI/CD pipeline

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. Check [TODO.md](TODO.md) for areas where help is needed.

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
