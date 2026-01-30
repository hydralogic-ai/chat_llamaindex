import { MessageSquare, ArrowLeft, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatWindow } from './ChatWindow';

interface ChatPageProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  onBack: () => void;
}

export function ChatPage({ darkMode, onToggleTheme, onBack }: ChatPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - consistent with landing page */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={onBack}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg">RAG Chat</span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={onToggleTheme}
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {/* Chat content */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-6">
        <ChatWindow />
      </main>

      {/* Simple footer */}
      <footer className="border-t border-border bg-card/50 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          Powered by RAG Technology
        </div>
      </footer>
    </div>
  );
}
