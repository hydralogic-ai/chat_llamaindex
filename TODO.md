# TODO

## In Progress

- [ ] Add loading states and error handling improvements

## Planned Features

### LLM Provider Support (env: `LLM_PROVIDER`)
- [x] Azure OpenAI integration ✅
- [x] Ollama (local LLMs) support ✅
- [x] Anthropic Claude support ✅
- [x] OpenAI support ✅
- [ ] Google Gemini support
- [ ] Configurable model selection via UI

### Vector Database Support (env: `VECTOR_DB_PROVIDER`)
- [x] MongoDB Atlas Vector Search ✅
- [ ] Weaviate integration
- [ ] Pinecone integration
- [ ] Qdrant integration

### Search & Retrieval (env: `ENABLE_HYBRID_SEARCH`)
- [x] Hybrid search (semantic + keyword) ✅
- [ ] Re-ranking for improved relevance
- [ ] Source citations with document references

### Core Functionality
- [ ] Agent-based chat with tool calling capabilities
- [ ] Configurable chunking strategies
- [ ] Conversation export (JSON, Markdown)
- [ ] Search within chat history

### Data Ingestion Layer
- [ ] File upload API with progress tracking
- [ ] Batch ingestion support
- [ ] **File Formats:**
  - [ ] PDF (with OCR support)
  - [ ] Word documents (.docx, .doc)
  - [ ] Excel/CSV spreadsheets
  - [ ] PowerPoint presentations
  - [ ] Markdown files
  - [ ] HTML files
  - [ ] JSON/JSONL
  - [ ] Plain text
- [ ] **Data Connectors:**
  - [ ] Web crawler/scraper
  - [ ] Sitemap ingestion
  - [ ] GitHub repositories
  - [ ] Notion pages
  - [ ] Confluence wiki
  - [ ] Google Drive
  - [ ] S3/Azure Blob/GCS
  - [ ] Database (SQL) connector
  - [ ] API endpoint ingestion
- [ ] **Processing Pipeline:**
  - [ ] Configurable text splitters/chunking
  - [ ] Metadata extraction
  - [ ] Document deduplication
  - [ ] Incremental updates (add/update/delete)
  - [ ] Background job processing
  - [ ] Ingestion status dashboard

### Document Management
- [ ] Document listing and search
- [ ] Document preview
- [ ] Delete/re-index documents
- [ ] Metadata filtering
- [ ] Collection/folder organization
- [ ] Access control per document

### UI/UX Improvements
- [ ] Dark/Light theme toggle
- [ ] Mobile responsive design
- [ ] Code syntax highlighting (Prism/Shiki)
- [ ] Copy button for code blocks
- [ ] Message feedback (thumbs up/down)
- [ ] Typing indicators
- [ ] Source preview panel

### Backend Enhancements
- [ ] Persistent chat history (PostgreSQL/SQLite)
- [ ] Response caching layer
- [ ] Rate limiting and usage tracking
- [ ] WebSocket support for streaming
- [ ] API key management

### Observability & Debugging
- [ ] LlamaIndex tracing integration
- [ ] Request/response logging
- [ ] Token usage tracking
- [ ] Query latency metrics
- [ ] Debug mode with retrieval visualization

### DevOps & Infrastructure
- [x] Docker containerization ✅
- [x] Docker Compose setup ✅
- [x] Health checks ✅
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Kubernetes manifests (optional)

### Documentation
- [ ] API documentation (OpenAPI/Swagger)
- [ ] Architecture diagram
- [ ] Deployment guide
- [ ] Provider configuration guide

## Completed

- [x] Basic RAG chat functionality
- [x] Session-based memory
- [x] ChromaDB vector storage
- [x] React frontend with Tailwind CSS
- [x] Streaming responses with word-by-word display
- [x] Makefile automation
- [x] Multi-provider LLM support (Anthropic, OpenAI, Azure, Ollama)
- [x] MongoDB Atlas Vector Search integration
- [x] Hybrid search (vector + BM25 keyword)
- [x] Environment-based configuration
- [x] Docker + Docker Compose deployment

## Ideas (Backlog)

- [ ] Voice input/output (Whisper + TTS)
- [ ] Multi-language support
- [ ] Plugin system for custom tools
- [ ] Admin dashboard
- [ ] Analytics and usage statistics
- [ ] User authentication (OAuth, API keys)
- [ ] Team/workspace support
- [ ] Multi-modal support (images, charts)
- [ ] Evaluation framework (RAGAS)
- [ ] A/B testing for prompts
- [ ] Custom persona/system prompts
- [ ] Conversation branching
