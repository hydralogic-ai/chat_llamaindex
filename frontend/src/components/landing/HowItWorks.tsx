import { HelpCircle, Search, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: HelpCircle,
    step: '1',
    title: 'Ask a Question',
    description: 'Type your question in natural language, just like you would ask a colleague.',
  },
  {
    icon: Search,
    step: '2',
    title: 'AI Searches Your Docs',
    description: 'Our RAG system intelligently searches through your knowledge base to find relevant information.',
  },
  {
    icon: CheckCircle,
    step: '3',
    title: 'Get Accurate Answers',
    description: 'Receive comprehensive, accurate answers synthesized from your documents.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting answers from your knowledge base is as easy as having a conversation.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line - Hidden on mobile */}
          <div className="hidden md:block absolute top-16 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((item, index) => (
              <div
                key={item.title}
                className="relative flex flex-col items-center text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Step Number Badge */}
                <div className="relative z-10 mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg">
                    <item.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{item.step}</span>
                  </div>
                </div>

                <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
