import { useEffect, useRef, useCallback, useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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

  const SCROLL_DEBOUNCE = 200; // ms between scroll updates
  const SCROLL_THRESHOLD = 100; // px from bottom to consider "near bottom"

  // Check if user is near the bottom of the scroll container
  const isNearBottom = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return true;
    const { scrollTop, scrollHeight, clientHeight } = container;
    return scrollHeight - scrollTop - clientHeight < SCROLL_THRESHOLD;
  }, []);

  // Handle user scroll to detect when they've scrolled up
  const handleScroll = useCallback(() => {
    setUserScrolledUp(!isNearBottom());
  }, [isNearBottom]);

  // Debounced auto-scroll to bottom
  useEffect(() => {
    // Don't scroll if user has scrolled up
    if (userScrolledUp) return;

    const now = performance.now();
    const timeSinceLastScroll = now - lastScrollTime.current;

    // Debounce scroll updates
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

  // Reset userScrolledUp when a new message is sent (user sends message)
  useEffect(() => {
    if (isLoading) {
      setUserScrolledUp(false);
    }
  }, [isLoading]);

  // Cleanup debounce timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollDebounceRef.current !== null) {
        clearTimeout(scrollDebounceRef.current);
      }
    };
  }, []);

  // Show sample questions only when there's just the welcome message
  const showSampleQuestions = messages.length <= 1;

  return (
    <Card className="w-full max-w-4xl h-[calc(100vh-2rem)] flex flex-col shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between border-b py-4 px-6">
        <CardTitle className="text-xl font-semibold">LlamaIndex Q&A Assistant</CardTitle>
        <Button variant="outline" size="sm" onClick={clear}>
          Clear Chat
        </Button>
      </CardHeader>

      <CardContent className="flex-1 p-0 overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="h-full overflow-y-auto"
          onScroll={handleScroll}
        >
          <div className="flex flex-col">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}

            {isLoading && messages[messages.length - 1]?.content === '' && (
              <div className="flex gap-3 p-4 px-6">
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-xs font-medium shrink-0">
                  AI
                </div>
                <div className="bg-muted rounded-lg px-4 py-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
                    <span
                      className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                      style={{ animationDelay: '0.1s' }}
                    />
                    <span
                      className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={scrollRef} />
          </div>
        </div>
      </CardContent>

      {showSampleQuestions && (
        <div className="border-t px-2">
          <SampleQuestions onSelect={send} disabled={isLoading} />
        </div>
      )}

      <CardFooter className="p-0 border-t">
        <ChatInput onSend={send} isLoading={isLoading} />
      </CardFooter>
    </Card>
  );
}
