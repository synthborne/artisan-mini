import React, { useEffect, useRef } from 'react';
import { ChatHeader } from './ChatHeader';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  strategies?: any[];
  isStrategySelection?: boolean;
  hasUserBudget?: boolean;
  selectedStrategyIndex?: number;
}

interface ChatViewProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  onChangeDetails: () => void;
  selectStrategy?: (strategyIndex: number) => void;
  showStrategySelection?: () => void;
  pendingStrategies?: any[] | null;
  conversationContext?: any;
}

export const ChatView: React.FC<ChatViewProps> = ({
  messages,
  onSendMessage,
  onChangeDetails,
  selectStrategy,
  showStrategySelection,
  pendingStrategies,
  conversationContext
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gradient-subtle">
      <ChatHeader onChangeDetails={onChangeDetails} />
      
      <ScrollArea className="flex-1">
        <div 
          className="p-4 space-y-1"
          role="log"
          aria-label="Chat messages"
          aria-live="polite"
        >
          {messages.length === 0 ? (
            <div className="flex items-center justify-center min-h-64 text-center">
              <div className="space-y-4 max-w-lg">
                <div className="w-16 h-16 bg-gradient-warm rounded-full mx-auto flex items-center justify-center shadow-glow">
                  <span className="text-2xl">👋</span>
                </div>
                <div className="space-y-3">
                  <p className="text-muted-foreground">
                    Welcome! Send a message to get personalized marketing strategies.
                  </p>
                  <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-left">
                    <h4 className="text-sm font-medium">💡 For better results, include:</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Your budget range</li>
                      <li>• Target audience (tourists, collectors, etc.)</li>
                      <li>• Tech comfort level (smartphone only, social media savvy, etc.)</li>
                      <li>• Business size (single artisan, cooperative, family business)</li>
                    </ul>
                    <div className="mt-3 p-2 bg-background rounded border-l-2 border-primary/50">
                      <p className="text-xs italic">
                        <strong>Example:</strong> "I make blue pottery in Jaipur. Single artisan, smartphone only, no ad budget but willing to spend ₹2,000 this month on materials. Want online sales to urban collectors and tourists."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {messages.length === 1 && messages[0].text.includes('Namaste! I\'m artisan-mini') && (
                <div className="mb-4 bg-muted/30 rounded-lg p-4 space-y-2">
                  <h4 className="text-sm font-medium">💡 For better results, include:</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Your budget range</li>
                    <li>• Target audience (tourists, collectors, etc.)</li>
                    <li>• Tech comfort level (smartphone only, social media savvy, etc.)</li>
                    <li>• Business size (single artisan, cooperative, family business)</li>
                  </ul>
                  <div className="mt-3 p-2 bg-background rounded border-l-2 border-primary/50">
                    <p className="text-xs italic">
                      <strong>Example:</strong> "I make blue pottery in Jaipur. Single artisan, smartphone only, no ad budget but willing to spend ₹2,000 this month on materials. Want online sales to urban collectors and tourists."
                    </p>
                  </div>
                </div>
              )}
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message.text}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                  strategies={message.strategies}
                  isStrategySelection={message.isStrategySelection}
                  onSelectStrategy={selectStrategy}
                  onShowStrategySelection={showStrategySelection}
                  hasUserBudget={message.hasUserBudget}
                  selectedStrategyIndex={message.selectedStrategyIndex}
                  isFollowUpMode={conversationContext && conversationContext.selectedStrategy}
                />
              ))}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <ChatInput onSendMessage={onSendMessage} />
    </div>
  );
};