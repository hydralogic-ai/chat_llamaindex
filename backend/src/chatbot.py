from typing import Dict, Generator
from llama_index.core.memory import ChatMemoryBuffer
from llama_index.core.chat_engine.condense_plus_context import CondensePlusContextChatEngine
from llama_index.core.retrievers import QueryFusionRetriever
from llama_index.core.schema import QueryBundle

from .indexer import get_index
from .config import llm, ENABLE_HYBRID_SEARCH

# Store session memories: {session_id: ChatMemoryBuffer}
session_memories: Dict[str, ChatMemoryBuffer] = {}

# Store chat engines: {session_id: ChatEngine}
session_engines: Dict[str, CondensePlusContextChatEngine] = {}

SYSTEM_PROMPT = """You are a helpful assistant that answers questions based on the provided context.

Your role:
- Answer questions accurately based on the provided context
- Maintain conversation context - remember what topics were discussed earlier
- When users ask follow-up questions, refer back to previously discussed topics
- Be concise but thorough - provide key details without unnecessary fluff
- If asked about something not in the context, politely say you don't have that information

Response guidelines:
- Use bullet points for lists of features or steps
- Include specific details when available
- Always be helpful and accurate"""


def get_memory(session_id: str) -> ChatMemoryBuffer:
    """Get or create memory buffer for a session."""
    if session_id not in session_memories:
        session_memories[session_id] = ChatMemoryBuffer.from_defaults(token_limit=4096)
    return session_memories[session_id]


def get_retriever(index):
    """Get retriever with optional hybrid search support."""
    if ENABLE_HYBRID_SEARCH:
        # Hybrid search: combines vector similarity with BM25 keyword search
        from llama_index.retrievers.bm25 import BM25Retriever

        # Vector retriever (semantic search)
        vector_retriever = index.as_retriever(similarity_top_k=3)

        # BM25 retriever (keyword search)
        try:
            # Get nodes from the index for BM25
            nodes = list(index.docstore.docs.values())
            bm25_retriever = BM25Retriever.from_defaults(
                nodes=nodes,
                similarity_top_k=3,
            )

            # Fusion retriever combines both
            retriever = QueryFusionRetriever(
                retrievers=[vector_retriever, bm25_retriever],
                similarity_top_k=5,
                num_queries=1,  # Don't generate additional queries
                mode="reciprocal_rerank",  # RRF fusion
                use_async=False,
            )
            print("[Chatbot] Using hybrid search (vector + BM25)")
            return retriever
        except Exception as e:
            print(f"[Chatbot] Failed to initialize hybrid search: {e}")
            print("[Chatbot] Falling back to vector-only search")
            return vector_retriever
    else:
        # Standard vector-only retrieval
        return index.as_retriever(similarity_top_k=5)


def get_chat_engine(session_id: str) -> CondensePlusContextChatEngine:
    """Get or create chat engine for a session."""
    if session_id not in session_engines:
        index = get_index()
        retriever = get_retriever(index)
        memory = get_memory(session_id)

        chat_engine = CondensePlusContextChatEngine.from_defaults(
            retriever=retriever,
            memory=memory,
            llm=llm,
            system_prompt=SYSTEM_PROMPT,
            verbose=False,
        )
        session_engines[session_id] = chat_engine

    return session_engines[session_id]


def chat(session_id: str, message: str) -> str:
    """Process a chat message and return the response."""
    engine = get_chat_engine(session_id)
    response = engine.chat(message)
    return str(response)


def chat_stream(session_id: str, message: str) -> Generator[str, None, None]:
    """Process a chat message and stream the response."""
    engine = get_chat_engine(session_id)
    response = engine.stream_chat(message)

    for token in response.response_gen:
        yield token


def clear_session(session_id: str) -> bool:
    """Clear memory and engine for a session."""
    cleared = False

    if session_id in session_memories:
        del session_memories[session_id]
        cleared = True

    if session_id in session_engines:
        del session_engines[session_id]
        cleared = True

    return cleared


def get_session_history(session_id: str) -> list:
    """Get chat history for a session."""
    if session_id not in session_memories:
        return []

    memory = session_memories[session_id]
    messages = memory.get_all()

    return [
        {"role": msg.role.value, "content": msg.content}
        for msg in messages
    ]
