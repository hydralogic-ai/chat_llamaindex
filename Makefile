.PHONY: help install install-backend install-frontend run run-backend run-frontend dev clean index docker-build docker-up docker-down docker-logs docker-clean

# Default target
help:
	@echo "RAG Chat - Available Commands"
	@echo "=============================="
	@echo ""
	@echo "Local Development:"
	@echo "  make install          - Install all dependencies (backend + frontend)"
	@echo "  make install-backend  - Install backend dependencies only"
	@echo "  make install-frontend - Install frontend dependencies only"
	@echo "  make run              - Run both backend and frontend"
	@echo "  make run-backend      - Run backend server only"
	@echo "  make run-frontend     - Run frontend dev server only"
	@echo "  make index            - Re-index documents in sample_data"
	@echo "  make clean            - Remove virtual env and node_modules"
	@echo ""
	@echo "Docker:"
	@echo "  make docker-build     - Build Docker images"
	@echo "  make docker-up        - Start containers (detached)"
	@echo "  make docker-down      - Stop containers"
	@echo "  make docker-logs      - View container logs"
	@echo "  make docker-clean     - Remove containers and volumes"
	@echo ""
	@echo "Quick Start (Local):"
	@echo "  1. cp backend/.env.sample backend/.env"
	@echo "  2. Edit backend/.env with your API keys"
	@echo "  3. make install && make run"
	@echo ""
	@echo "Quick Start (Docker):"
	@echo "  1. cp .env.docker .env"
	@echo "  2. Edit .env with your API keys"
	@echo "  3. make docker-up"

# ===========================================
# Local Development
# ===========================================

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
	@echo "Starting RAG Chat..."
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

# Clean up local files
clean:
	@echo "Cleaning up..."
	rm -rf backend/venv
	rm -rf backend/chroma_db
	rm -rf frontend/node_modules
	rm -rf frontend/dist
	@echo "Clean complete!"

# ===========================================
# Docker
# ===========================================

# Build Docker images
docker-build:
	@echo "Building Docker images..."
	docker compose build

# Start containers
docker-up:
	@echo "Starting containers..."
	docker compose up -d
	@echo ""
	@echo "RAG Chat is running!"
	@echo "Frontend: http://localhost"
	@echo "API: http://localhost:8000"
	@echo ""
	@echo "View logs: make docker-logs"

# Stop containers
docker-down:
	@echo "Stopping containers..."
	docker compose down

# View logs
docker-logs:
	docker compose logs -f

# Clean Docker resources
docker-clean:
	@echo "Removing containers and volumes..."
	docker compose down -v --rmi local
	@echo "Docker cleanup complete!"
