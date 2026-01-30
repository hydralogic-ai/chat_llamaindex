// Use relative URL in production (Docker), absolute in development
const API_BASE_URL = import.meta.env.PROD ? '/api' : 'http://localhost:8000/api';

export interface ChatResponse {
  response: string;
  session_id: string;
}

export interface HealthResponse {
  status: string;
  message: string;
}

export async function sendMessage(sessionId: string, message: string): Promise<ChatResponse> {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      session_id: sessionId,
      message: message,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to send message');
  }

  return response.json();
}

export async function sendMessageStream(
  sessionId: string,
  message: string,
  onChunk: (chunk: string) => void,
  onDone: () => void,
  onError: (error: string) => void
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/chat/stream`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      session_id: sessionId,
      message: message,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to send message');
  }

  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error('No response body');
  }

  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const text = decoder.decode(value);
    const lines = text.split('\n');

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        try {
          const data = JSON.parse(line.slice(6));
          if (data.content) {
            onChunk(data.content);
          } else if (data.done) {
            onDone();
          } else if (data.error) {
            onError(data.error);
          }
        } catch {
          // Ignore parse errors for incomplete chunks
        }
      }
    }
  }
}

export async function clearSession(sessionId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/session/${sessionId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to clear session');
  }
}

export async function healthCheck(): Promise<HealthResponse> {
  const response = await fetch(`${API_BASE_URL}/health`);

  if (!response.ok) {
    throw new Error('API is not available');
  }

  return response.json();
}
