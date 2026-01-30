import chromadb
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, StorageContext
from llama_index.vector_stores.chroma import ChromaVectorStore

from .config import CHROMA_DB_PATH, SAMPLE_DATA_PATH

# Collection name for the Q&A bot
COLLECTION_NAME = "qa_documents"


def get_chroma_client():
    """Get persistent ChromaDB client."""
    return chromadb.PersistentClient(path=CHROMA_DB_PATH)


def get_or_create_collection():
    """Get or create the ChromaDB collection."""
    client = get_chroma_client()
    return client.get_or_create_collection(name=COLLECTION_NAME)


def load_and_index_documents():
    """Load documents from sample_data and create/update the index."""
    # Initialize ChromaDB
    client = get_chroma_client()

    # Delete existing collection to re-index
    try:
        client.delete_collection(name=COLLECTION_NAME)
    except Exception:
        pass

    # Create new collection
    chroma_collection = client.create_collection(name=COLLECTION_NAME)

    # Set up vector store
    vector_store = ChromaVectorStore(chroma_collection=chroma_collection)
    storage_context = StorageContext.from_defaults(vector_store=vector_store)

    # Load documents
    documents = SimpleDirectoryReader(SAMPLE_DATA_PATH).load_data()

    # Create index
    index = VectorStoreIndex.from_documents(
        documents,
        storage_context=storage_context,
    )

    return index, len(documents)


def get_index():
    """Get the existing index from ChromaDB."""
    client = get_chroma_client()

    try:
        chroma_collection = client.get_collection(name=COLLECTION_NAME)
    except Exception:
        # Collection doesn't exist, create it
        return load_and_index_documents()[0]

    # Set up vector store from existing collection
    vector_store = ChromaVectorStore(chroma_collection=chroma_collection)

    # Create index from existing vector store
    index = VectorStoreIndex.from_vector_store(vector_store=vector_store)

    return index
