import os
from dotenv import load_dotenv
from llama_index.core import Settings

load_dotenv()

# ===========================================
# Provider Configuration
# ===========================================
LLM_PROVIDER = os.getenv("LLM_PROVIDER", "anthropic").lower()
VECTOR_DB_PROVIDER = os.getenv("VECTOR_DB_PROVIDER", "chroma").lower()
ENABLE_HYBRID_SEARCH = os.getenv("ENABLE_HYBRID_SEARCH", "false").lower() == "true"

# ===========================================
# Paths
# ===========================================
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHROMA_DB_PATH = os.path.join(BASE_DIR, "chroma_db")
SAMPLE_DATA_PATH = os.path.join(BASE_DIR, "sample_data")

# ===========================================
# MongoDB Configuration
# ===========================================
MONGODB_URI = os.getenv("MONGODB_URI", "")
MONGODB_DB_NAME = os.getenv("MONGODB_DB_NAME", "rag_chat")
MONGODB_COLLECTION = os.getenv("MONGODB_COLLECTION", "documents")


def get_llm():
    """Factory function to create LLM based on provider configuration."""

    if LLM_PROVIDER == "anthropic":
        from llama_index.llms.anthropic import Anthropic

        api_key = os.getenv("ANTHROPIC_API_KEY")
        if not api_key:
            raise ValueError("ANTHROPIC_API_KEY is required when LLM_PROVIDER=anthropic")

        model = os.getenv("ANTHROPIC_MODEL", "claude-3-haiku-20240307")
        return Anthropic(
            model=model,
            api_key=api_key,
            temperature=0.7,
        )

    elif LLM_PROVIDER == "openai":
        from llama_index.llms.openai import OpenAI

        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise ValueError("OPENAI_API_KEY is required when LLM_PROVIDER=openai")

        model = os.getenv("OPENAI_MODEL", "gpt-4o-mini")
        return OpenAI(
            model=model,
            api_key=api_key,
            temperature=0.7,
        )

    elif LLM_PROVIDER == "azure":
        from llama_index.llms.azure_openai import AzureOpenAI

        api_key = os.getenv("AZURE_OPENAI_API_KEY")
        endpoint = os.getenv("AZURE_OPENAI_ENDPOINT")
        deployment = os.getenv("AZURE_OPENAI_DEPLOYMENT")
        api_version = os.getenv("AZURE_API_VERSION", "2024-02-15-preview")

        if not all([api_key, endpoint, deployment]):
            raise ValueError(
                "AZURE_OPENAI_API_KEY, AZURE_OPENAI_ENDPOINT, and AZURE_OPENAI_DEPLOYMENT "
                "are required when LLM_PROVIDER=azure"
            )

        return AzureOpenAI(
            api_key=api_key,
            azure_endpoint=endpoint,
            deployment_name=deployment,
            api_version=api_version,
            temperature=0.7,
        )

    elif LLM_PROVIDER == "ollama":
        from llama_index.llms.ollama import Ollama

        base_url = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
        model = os.getenv("OLLAMA_MODEL", "llama3")

        return Ollama(
            model=model,
            base_url=base_url,
            temperature=0.7,
            request_timeout=120.0,
        )

    else:
        raise ValueError(
            f"Unknown LLM_PROVIDER: {LLM_PROVIDER}. "
            "Supported: anthropic, openai, azure, ollama"
        )


def get_embed_model():
    """Get embedding model. Using HuggingFace BGE by default (free, local)."""
    from llama_index.embeddings.huggingface import HuggingFaceEmbedding

    model_name = os.getenv("EMBEDDING_MODEL", "BAAI/bge-small-en-v1.5")
    return HuggingFaceEmbedding(model_name=model_name)


def get_vector_store_config():
    """Get vector store configuration based on provider."""

    if VECTOR_DB_PROVIDER == "chroma":
        return {
            "provider": "chroma",
            "path": CHROMA_DB_PATH,
        }

    elif VECTOR_DB_PROVIDER == "mongodb":
        if not MONGODB_URI:
            raise ValueError("MONGODB_URI is required when VECTOR_DB_PROVIDER=mongodb")

        return {
            "provider": "mongodb",
            "uri": MONGODB_URI,
            "db_name": MONGODB_DB_NAME,
            "collection": MONGODB_COLLECTION,
        }

    else:
        raise ValueError(
            f"Unknown VECTOR_DB_PROVIDER: {VECTOR_DB_PROVIDER}. "
            "Supported: chroma, mongodb"
        )


# ===========================================
# Initialize Global Settings
# ===========================================
llm = get_llm()
embed_model = get_embed_model()

Settings.llm = llm
Settings.embed_model = embed_model

# Log configuration on startup
print(f"[Config] LLM Provider: {LLM_PROVIDER}")
print(f"[Config] Vector DB: {VECTOR_DB_PROVIDER}")
print(f"[Config] Hybrid Search: {ENABLE_HYBRID_SEARCH}")
