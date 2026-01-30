import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TryItNowProps {
  onStartChat: () => void;
}

export function TryItNow({ onStartChat }: TryItNowProps) {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 p-8 md:p-12">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Ready to get started?</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Experience the Power of RAG
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Start chatting with your knowledge base today. No complex setup required - just ask your first question and see the magic happen.
            </p>

            <Button
              size="lg"
              onClick={onStartChat}
              className="px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Try It Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
