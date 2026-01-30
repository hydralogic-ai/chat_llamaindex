# TODO

## In Progress

- [ ] Add loading states and error handling improvements

## Planned Features

### LLM Provider Support
- [ ] Azure OpenAI integration
- [ ] Ollama (local LLMs) support
- [ ] Anthropic Claude support
- [ ] Google Gemini support
- [ ] Configurable model selection via UI

### Vector Database Support
- [ ] Weaviate integration
- [ ] MongoDB Atlas Vector Search
- [ ] Pinecone integration
- [ ] Qdrant integration
- [ ] Configurable vector DB via environment

### Core Functionality
- [ ] Agent-based chat with tool calling capabilities
- [ ] Source citations with document references
- [ ] Hybrid search (semantic + keyword)
- [ ] Re-ranking for improved relevance
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
- [ ] Docker containerization
- [ ] Docker Compose setup
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Environment-based configuration
- [ ] Health check improvements
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
