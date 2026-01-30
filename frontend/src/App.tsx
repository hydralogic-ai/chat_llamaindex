import { useState, useEffect } from 'react';
import { LandingPage } from './components/landing/LandingPage';
import { ChatPage } from './components/ChatPage';

type View = 'landing' | 'chat';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const [view, setView] = useState<View>('landing');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {view === 'landing' ? (
        <LandingPage
          darkMode={darkMode}
          onToggleTheme={toggleTheme}
          onStartChat={() => setView('chat')}
        />
      ) : (
        <ChatPage
          darkMode={darkMode}
          onToggleTheme={toggleTheme}
          onBack={() => setView('landing')}
        />
      )}
    </div>
  );
}

export default App;
