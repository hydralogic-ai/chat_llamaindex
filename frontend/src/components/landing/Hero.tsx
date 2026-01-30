import { ArrowRight, Play, Clock, Zap, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  onStartChat: () => void;
}

const trustIndicators = [
  { icon: Clock, text: 'Always Available' },
  { icon: Zap, text: 'Instant Responses' },
  { icon: Lock, text: 'Secure' },
];

export function Hero({ onStartChat }: HeroProps) {
  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm font-medium">AI-Powered Knowledge Assistant</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            Get Instant Answers from{' '}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Your Knowledge Base
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            Harness the power of Retrieval-Augmented Generation (RAG) to unlock insights from your documents. Ask questions naturally and get accurate, contextual answers in seconds.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <Button
              size="lg"
              onClick={onStartChat}
              className="px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Chatting
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg font-semibold"
            >
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm text-muted-foreground animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            {trustIndicators.map((indicator) => (
              <div key={indicator.text} className="flex items-center gap-2">
                <indicator.icon className="w-4 h-4 text-primary" />
                <span>{indicator.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
