import { User, Sparkles } from 'lucide-react';
import { StreamingText } from './StreamingText';
import type { Message } from '@/hooks/useChat';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'flex gap-3 px-6 py-3 transition-colors',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'h-9 w-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm',
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-primary/10 text-primary'
        )}
      >
        {isUser ? (
          <User className="h-4 w-4" />
        ) : (
          <Sparkles className="h-4 w-4" />
        )}
      </div>

      {/* Message Content */}
      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-4 py-3 shadow-sm',
          isUser
            ? 'bg-primary text-primary-foreground rounded-tr-md'
            : 'bg-muted text-foreground rounded-tl-md'
        )}
      >
        <div className="text-sm leading-relaxed">
          {isUser ? (
            <span className="whitespace-pre-wrap">{message.content}</span>
          ) : (
            <StreamingText content={message.content} isStreaming={message.isStreaming} />
          )}
        </div>
        <span
          className={cn(
            'text-[10px] mt-2 block',
            isUser ? 'text-primary-foreground/60' : 'text-muted-foreground'
          )}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </div>
  );
}
