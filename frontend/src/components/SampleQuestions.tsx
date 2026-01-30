import { Button } from '@/components/ui/button';

interface SampleQuestionsProps {
  onSelect: (question: string) => void;
  disabled: boolean;
}

const SAMPLE_QUESTIONS = [
  'What is LlamaIndex?',
  'How do I install LlamaIndex?',
  'What vector stores are supported?',
  'What is RAG?',
  'How do I use Anthropic with LlamaIndex?',
  'What is LlamaCloud pricing?',
];

export function SampleQuestions({ onSelect, disabled }: SampleQuestionsProps) {
  return (
    <div className="px-4 pb-2">
      <p className="text-xs text-muted-foreground mb-2">Try asking:</p>
      <div className="flex flex-wrap gap-2">
        {SAMPLE_QUESTIONS.map((question) => (
          <Button
            key={question}
            variant="outline"
            size="sm"
            className="text-xs h-7"
            onClick={() => onSelect(question)}
            disabled={disabled}
          >
            {question}
          </Button>
        ))}
      </div>
    </div>
  );
}
