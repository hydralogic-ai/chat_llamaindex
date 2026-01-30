import { MessageSquare } from 'lucide-react';

interface SampleQuestionsProps {
  onSelect: (question: string) => void;
  disabled: boolean;
}

const SAMPLE_QUESTIONS = [
  'What can you help me with?',
  'How does RAG work?',
  'What documents do you have?',
  'Summarize the main topics',
];

export function SampleQuestions({ onSelect, disabled }: SampleQuestionsProps) {
  return (
    <div className="py-2">
      <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1.5">
        <MessageSquare className="h-3 w-3" />
        Try asking:
      </p>
      <div className="flex flex-wrap gap-2">
        {SAMPLE_QUESTIONS.map((question) => (
          <button
            key={question}
            onClick={() => onSelect(question)}
            disabled={disabled}
            className="text-xs px-3 py-1.5 rounded-full border border-border bg-background hover:bg-muted hover:border-primary/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}
