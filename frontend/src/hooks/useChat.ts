import { useState, useCallback, useEffect, useRef } from 'react';
import { sendMessageStream, clearSession } from '@/services/api';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function getOrCreateSessionId(): string {
  const key = 'qa_bot_session_id';
  let sessionId = sessionStorage.getItem(key);

  if (!sessionId) {
    sessionId = generateUUID();
    sessionStorage.setItem(key, sessionId);
  }

  return sessionId;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId] = useState<string>(getOrCreateSessionId);
  const streamingMessageId = useRef<string | null>(null);

  // Add welcome message on mount
  useEffect(() => {
    setMessages([
      {
        id: generateUUID(),
        role: 'assistant',
        content: `Welcome to LlamaIndex Q&A Assistant! I can help you with:

• **Features** - Data connectors, indexes, query engines, chat engines
• **Installation** - pip commands, setup, configuration
• **Integrations** - LLM providers, vector stores, embeddings
• **Troubleshooting** - Common issues and solutions

Ask me anything about LlamaIndex, or click a sample question below!`,
        timestamp: new Date(),
      },
    ]);
  }, []);

  const send = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      setError(null);

      // Add user message
      const userMessage: Message = {
        id: generateUUID(),
        role: 'user',
        content: content.trim(),
        timestamp: new Date(),
      };

      // Create placeholder for streaming response
      const assistantMessageId = generateUUID();
      streamingMessageId.current = assistantMessageId;

      const assistantMessage: Message = {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage, assistantMessage]);
      setIsLoading(true);

      try {
        await sendMessageStream(
          sessionId,
          content.trim(),
          // onChunk - append to the streaming message
          (chunk: string) => {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantMessageId
                  ? { ...msg, content: msg.content + chunk }
                  : msg
              )
            );
          },
          // onDone
          () => {
            streamingMessageId.current = null;
            setIsLoading(false);
          },
          // onError
          (errorMsg: string) => {
            setError(errorMsg);
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantMessageId
                  ? { ...msg, content: `Sorry, I encountered an error: ${errorMsg}` }
                  : msg
              )
            );
            streamingMessageId.current = null;
            setIsLoading(false);
          }
        );
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
        setError(errorMessage);

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? { ...msg, content: `Sorry, I encountered an error: ${errorMessage}. Please try again.` }
              : msg
          )
        );
        streamingMessageId.current = null;
        setIsLoading(false);
      }
    },
    [sessionId, isLoading]
  );

  const clear = useCallback(async () => {
    try {
      await clearSession(sessionId);
      setMessages([
        {
          id: generateUUID(),
          role: 'assistant',
          content: 'Conversation cleared. How can I help you with LlamaIndex?',
          timestamp: new Date(),
        },
      ]);
      setError(null);
    } catch (err) {
      console.error('Failed to clear session:', err);
    }
  }, [sessionId]);

  return {
    messages,
    isLoading,
    error,
    sessionId,
    send,
    clear,
  };
}
