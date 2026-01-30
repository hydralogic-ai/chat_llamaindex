import { Brain, Zap, MessageSquare, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: Brain,
    title: 'Intelligent Retrieval',
    description: 'Advanced RAG technology finds the most relevant information from your knowledge base with remarkable accuracy.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Get instant responses powered by streaming technology. No waiting around for answers.',
  },
  {
    icon: MessageSquare,
    title: 'Conversational Memory',
    description: 'Maintains context throughout your conversation for natural, flowing dialogue.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your data stays private. Enterprise-grade security ensures your information is protected.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose RAG Chat?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built with cutting-edge AI technology to deliver accurate, fast, and secure answers from your documents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
