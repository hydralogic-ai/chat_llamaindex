import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StreamingTextProps {
  content: string;
  isStreaming?: boolean;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 p-1.5 rounded-md bg-secondary/80 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
      title="Copy code"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-green-500" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </button>
  );
}

export function StreamingText({ content, isStreaming = false }: StreamingTextProps) {
  return (
    <div className={cn('streaming-text', isStreaming && 'is-streaming')}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Code blocks
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match && !className;
            const codeString = String(children).replace(/\n$/, '');

            if (isInline) {
              return (
                <code
                  className="bg-secondary/80 px-1.5 py-0.5 rounded text-sm font-mono"
                  {...props}
                >
                  {children}
                </code>
              );
            }

            return (
              <div className="my-3 rounded-xl overflow-hidden bg-secondary/50 relative group">
                {match && (
                  <div className="px-4 py-2 text-xs text-muted-foreground bg-secondary/80 border-b border-border/50 font-medium">
                    {match[1]}
                  </div>
                )}
                <CopyButton text={codeString} />
                <pre className="p-4 overflow-x-auto">
                  <code className="text-sm font-mono" {...props}>
                    {children}
                  </code>
                </pre>
              </div>
            );
          },
          // Paragraphs
          p({ children }) {
            return <p className="mb-3 last:mb-0">{children}</p>;
          },
          // Lists
          ul({ children }) {
            return <ul className="list-disc list-inside mb-3 space-y-1.5 ml-1">{children}</ul>;
          },
          ol({ children }) {
            return <ol className="list-decimal list-inside mb-3 space-y-1.5 ml-1">{children}</ol>;
          },
          li({ children }) {
            return <li className="leading-relaxed">{children}</li>;
          },
          // Headings
          h1({ children }) {
            return <h1 className="text-lg font-bold mb-3 mt-4 first:mt-0">{children}</h1>;
          },
          h2({ children }) {
            return <h2 className="text-base font-bold mb-2 mt-4 first:mt-0">{children}</h2>;
          },
          h3({ children }) {
            return <h3 className="text-sm font-bold mb-2 mt-3 first:mt-0">{children}</h3>;
          },
          // Bold and italic
          strong({ children }) {
            return <strong className="font-semibold">{children}</strong>;
          },
          em({ children }) {
            return <em className="italic">{children}</em>;
          },
          // Links
          a({ href, children }) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2 hover:opacity-80"
              >
                {children}
              </a>
            );
          },
          // Blockquotes
          blockquote({ children }) {
            return (
              <blockquote className="border-l-3 border-primary/50 pl-4 my-3 italic text-muted-foreground">
                {children}
              </blockquote>
            );
          },
          // Horizontal rule
          hr() {
            return <hr className="my-4 border-border/50" />;
          },
          // Tables
          table({ children }) {
            return (
              <div className="my-3 overflow-x-auto rounded-lg border border-border/50">
                <table className="min-w-full text-sm">{children}</table>
              </div>
            );
          },
          thead({ children }) {
            return <thead className="bg-secondary/50">{children}</thead>;
          },
          th({ children }) {
            return (
              <th className="px-3 py-2 font-semibold text-left border-b border-border/50">
                {children}
              </th>
            );
          },
          td({ children }) {
            return (
              <td className="px-3 py-2 border-b border-border/30">{children}</td>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
      {isStreaming && <span className="streaming-cursor" />}
    </div>
  );
}
