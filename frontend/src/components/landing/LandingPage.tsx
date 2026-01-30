import { Header } from './Header';
import { Hero } from './Hero';
import { Features } from './Features';
import { HowItWorks } from './HowItWorks';
import { TryItNow } from './TryItNow';
import { Footer } from './Footer';

interface LandingPageProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  onStartChat: () => void;
}

export function LandingPage({ darkMode, onToggleTheme, onStartChat }: LandingPageProps) {
  return (
    <div className="min-h-screen">
      <Header darkMode={darkMode} onToggleTheme={onToggleTheme} onStartChat={onStartChat} />
      <Hero onStartChat={onStartChat} />
      <Features />
      <HowItWorks />
      <TryItNow onStartChat={onStartChat} />
      <Footer />
    </div>
  );
}
