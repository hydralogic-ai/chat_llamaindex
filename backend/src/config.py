import os
from dotenv import load_dotenv
from llama_index.llms.anthropic import Anthropic
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.core import Settings

load_dotenv()

ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")

if not ANTHROPIC_API_KEY:
    raise ValueError("ANTHROPIC_API_KEY environment variable is not set")

# Initialize LLM (Claude)
llm = Anthropic(
    model="claude-3-haiku-20240307",
    api_key=ANTHROPIC_API_KEY,
    temperature=0.7,
)

# Initialize Embedding model (free, local)
embed_model = HuggingFaceEmbedding(
    model_name="BAAI/bge-small-en-v1.5"
)

# Set global settings
Settings.llm = llm
Settings.embed_model = embed_model

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHROMA_DB_PATH = os.path.join(BASE_DIR, "chroma_db")
SAMPLE_DATA_PATH = os.path.join(BASE_DIR, "sample_data")
