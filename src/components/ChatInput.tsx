import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { detectLanguage, getLocalizedText } from '@/utils/languageDetection';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  lastUserMessage?: string; // To detect language from last user message
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false, lastUserMessage }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Detect language for placeholder text
  const languageInfo = lastUserMessage ? detectLanguage(lastUserMessage) : { language: 'English', confidence: 1, code: 'en' };
  const placeholder = getLocalizedText(languageInfo, 'placeholder');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    if (trimmedMessage && !disabled) {
      onSendMessage(trimmedMessage);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // Allow Shift+Enter for new line
        return;
      } else {
        // Enter to send
        e.preventDefault();
        handleSubmit(e);
      }
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [message]);

  const isMessageValid = message.trim().length > 0;

  return (
    <div className="p-4 border-t border-border bg-card">
      <form onSubmit={handleSubmit} className="flex gap-3 items-end">
        <div className="flex-1">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`${placeholder} (Enter to send, Shift+Enter for new line)`}
            disabled={disabled}
            className="min-h-[48px] max-h-[120px] resize-none transition-smooth focus:shadow-soft"
            aria-label="Chat message input"
          />
        </div>
        <Button
          type="submit"
          variant="artisan"
          size="icon"
          disabled={!isMessageValid || disabled}
          className="h-12 w-12 shrink-0"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
      <p className="text-xs text-muted-foreground mt-2 text-center">
        Press Enter to send, Shift+Enter for new line
      </p>
    </div>
  );
};