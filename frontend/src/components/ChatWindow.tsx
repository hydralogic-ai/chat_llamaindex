import { useEffect, useRef, useCallback, useState } from 'react';
import { Trash2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { SampleQuestions } from './SampleQuestions';
import { useChat } from '@/hooks/useChat';

export function ChatWindow() {
  const { messages, isLoading, send, clear } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef<number>(0);
  const scrollDebounceRef = useRef<number | null>(null);
  const [userScrolledUp, setUserScrolledUp] = useState(false);

  const SCROLL_DEBOUNCE = 200;
  const SCROLL_THRESHOLD = 100;

  const isNearBottom = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return true;
    const { scrollTop, scrollHeight, clientHeight } = container;
    return scrollHeight - scrollTop - clientHeight < SCROLL_THRESHOLD;
  }, []);

  const handleScroll = useCallback(() => {
    setUserScrolledUp(!isNearBottom());
  }, [isNearBottom]);

  useEffect(() => {
    if (userScrolledUp) return;

    const now = performance.now();
    const timeSinceLastScroll = now - lastScrollTime.current;

    if (timeSinceLastScroll < SCROLL_DEBOUNCE) {
      if (scrollDebounceRef.current === null) {
        scrollDebounceRef.current = window.setTimeout(() => {
          scrollDebounceRef.current = null;
          if (scrollRef.current && !userScrolledUp) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
            lastScrollTime.current = performance.now();
          }
        }, SCROLL_DEBOUNCE - timeSinceLastScroll);
      }
      return;
    }

    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
      lastScrollTime.current = now;
    }
  }, [messages, userScrolledUp]);

  useEffect(() => {
    if (isLoading) {
      setUserScrolledUp(false);
    }
  }, [isLoading]);

  useEffect(() => {
    return () => {
      if (scrollDebounceRef.current !== null) {
        clearTimeout(scrollDebounceRef.current);
      }
    };
  }, []);

  const showSampleQuestions = messages.length <= 1;

  return (
    <div className="w-full max-w-4xl h-[calc(100vh-2rem)] flex flex-col bg-card rounded-2xl shadow-2xl border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">RAG Chat Assistant</h1>
            <p className="text-xs text-muted-foreground">Powered by LlamaIndex</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={clear}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Clear
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="h-full overflow-y-auto"
          onScroll={handleScroll}
        >
          <div className="flex flex-col py-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}

            {isLoading && messages[messages.length - 1]?.content === '' && (
              <div className="flex gap-3 px-6 py-4">
                <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-muted rounded-2xl px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:0.1s]" />
                    <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={scrollRef} />
          </div>
        </div>
      </div>

      {/* Sample Questions */}
      {showSampleQuestions && (
        <div className="border-t bg-muted/30 px-4 py-3">
          <SampleQuestions onSelect={send} disabled={isLoading} />
        </div>
      )}

      {/* Input */}
      <div className="border-t bg-background/50 backdrop-blur">
        <ChatInput onSend={send} isLoading={isLoading} />
      </div>
    </div>
  );
}
