from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, StorageContext

from .config import (
    SAMPLE_DATA_PATH,
    VECTOR_DB_PROVIDER,
    get_vector_store_config,
)

# Collection name for the documents
COLLECTION_NAME = "qa_documents"


def _get_chroma_vector_store(config: dict, collection_name: str, create_new: bool = False):
    """Get ChromaDB vector store."""
    import chromadb
    from llama_index.vector_stores.chroma import ChromaVectorStore

    client = chromadb.PersistentClient(path=config["path"])

    if create_new:
        # Delete existing collection to re-index
        try:
            client.delete_collection(name=collection_name)
        except Exception:
            pass
        collection = client.create_collection(name=collection_name)
    else:
        try:
            collection = client.get_collection(name=collection_name)
        except Exception:
            collection = client.create_collection(name=collection_name)

    return ChromaVectorStore(chroma_collection=collection)


def _get_mongodb_vector_store(config: dict, collection_name: str, create_new: bool = False):
    """Get MongoDB Atlas vector store."""
    from pymongo import MongoClient
    from llama_index.vector_stores.mongodb import MongoDBAtlasVectorSearch

    client = MongoClient(config["uri"])
    db = client[config["db_name"]]
    collection = db[collection_name]

    if create_new:
        # Clear existing documents
        collection.delete_many({})

    return MongoDBAtlasVectorSearch(
        mongodb_client=client,
        db_name=config["db_name"],
        collection_name=collection_name,
        vector_index_name="vector_index",  # Must match Atlas Search index name
    )


def get_vector_store(create_new: bool = False):
    """Factory function to get vector store based on configuration."""
    config = get_vector_store_config()
    provider = config["provider"]

    if provider == "chroma":
        return _get_chroma_vector_store(config, COLLECTION_NAME, create_new)
    elif provider == "mongodb":
        return _get_mongodb_vector_store(config, COLLECTION_NAME, create_new)
    else:
        raise ValueError(f"Unknown vector store provider: {provider}")


def load_and_index_documents():
    """Load documents from sample_data and create/update the index."""
    # Get vector store (create new for re-indexing)
    vector_store = get_vector_store(create_new=True)
    storage_context = StorageContext.from_defaults(vector_store=vector_store)

    # Load documents
    documents = SimpleDirectoryReader(SAMPLE_DATA_PATH).load_data()

    # Create index
    index = VectorStoreIndex.from_documents(
        documents,
        storage_context=storage_context,
    )

    print(f"[Indexer] Indexed {len(documents)} documents using {VECTOR_DB_PROVIDER}")
    return index, len(documents)


def get_index():
    """Get the existing index from vector store."""
    vector_store = get_vector_store(create_new=False)

    # Check if collection has documents
    try:
        index = VectorStoreIndex.from_vector_store(vector_store=vector_store)
        return index
    except Exception:
        # Collection is empty or doesn't exist, create it
        print("[Indexer] No existing index found, creating new one...")
        return load_and_index_documents()[0]
