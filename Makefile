.PHONY: help install install-backend install-frontend run run-backend run-frontend dev clean index

# Default target
help:
	@echo "Q&A Bot - Available Commands"
	@echo "============================="
	@echo ""
	@echo "Setup:"
	@echo "  make install          - Install all dependencies (backend + frontend)"
	@echo "  make install-backend  - Install backend dependencies only"
	@echo "  make install-frontend - Install frontend dependencies only"
	@echo ""
	@echo "Run:"
	@echo "  make run              - Run both backend and frontend"
	@echo "  make run-backend      - Run backend server only"
	@echo "  make run-frontend     - Run frontend dev server only"
	@echo "  make dev              - Run both in development mode"
	@echo ""
	@echo "Utilities:"
	@echo "  make index            - Re-index documents in sample_data"
	@echo "  make clean            - Remove virtual env and node_modules"
	@echo ""
	@echo "Setup Steps:"
	@echo "  1. cp backend/.env.sample backend/.env"
	@echo "  2. Edit backend/.env and add your OPENAI_API_KEY"
	@echo "  3. make install"
	@echo "  4. make run"

# Install all dependencies
install: install-backend install-frontend

# Install backend dependencies
install-backend:
	@echo "Setting up backend..."
	cd backend && python3.11 -m venv venv || python3 -m venv venv
	cd backend && . venv/bin/activate && pip install --upgrade pip
	cd backend && . venv/bin/activate && pip install -r requirements.txt
	@echo "Backend setup complete!"

# Install frontend dependencies
install-frontend:
	@echo "Setting up frontend..."
	cd frontend && npm install
	@echo "Frontend setup complete!"

# Run backend server
run-backend:
	@echo "Starting backend server on http://localhost:8000..."
	cd backend && . venv/bin/activate && python main.py

# Run frontend dev server
run-frontend:
	@echo "Starting frontend on http://localhost:5173..."
	cd frontend && npm run dev

# Run both (backend in background)
run:
	@echo "Starting Q&A Bot..."
	@echo "Backend: http://localhost:8000"
	@echo "Frontend: http://localhost:5173"
	@echo ""
	@echo "Press Ctrl+C to stop"
	@make -j2 run-backend run-frontend

# Development mode (same as run)
dev: run

# Re-index documents
index:
	@echo "Re-indexing documents..."
	cd backend && . venv/bin/activate && python -c "from src.indexer import load_and_index_documents; idx, count = load_and_index_documents(); print(f'Indexed {count} documents')"

# Clean up
clean:
	@echo "Cleaning up..."
	rm -rf backend/venv
	rm -rf backend/chroma_db
	rm -rf frontend/node_modules
	rm -rf frontend/dist
	@echo "Clean complete!"
