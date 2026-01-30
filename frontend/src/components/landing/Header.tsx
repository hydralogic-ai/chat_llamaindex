import { MessageSquare, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  onStartChat: () => void;
}

export function Header({ darkMode, onToggleTheme, onStartChat }: HeaderProps) {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-lg">RAG Chat</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            How It Works
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={onToggleTheme}
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button onClick={onStartChat} className="hidden sm:flex">
            Start Chatting
          </Button>
        </div>
      </div>
    </header>
  );
}
