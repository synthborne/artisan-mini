import React from 'react';
import { cn } from '@/lib/utils';
import { StrategySelection } from './StrategySelection';
import { StrategyDetails } from './StrategyDetails';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
  strategies?: any[];
  isStrategySelection?: boolean;
  onSelectStrategy?: (strategyIndex: number) => void;
  onShowStrategySelection?: () => void;
  hasUserBudget?: boolean;
  selectedStrategyIndex?: number;
  isFollowUpMode?: boolean;
  languageInfo?: { language: string; confidence: number; code: string };
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  isUser, 
  timestamp, 
  strategies, 
  isStrategySelection, 
  onSelectStrategy,
  onShowStrategySelection,
  hasUserBudget,
  selectedStrategyIndex,
  isFollowUpMode,
  languageInfo
}) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={cn(
      "flex w-full mb-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[80%] sm:max-w-[70%] rounded-lg px-4 py-3 shadow-soft transition-smooth",
        isUser 
          ? "bg-chat-bubble-user text-chat-bubble-user-foreground ml-4" 
          : "bg-chat-bubble-bot text-chat-bubble-bot-foreground mr-4 border border-border"
      )}>
        {isStrategySelection && strategies && onSelectStrategy ? (
          <StrategySelection 
            strategies={strategies} 
            onSelectStrategy={onSelectStrategy}
            hasUserBudget={hasUserBudget}
            languageInfo={languageInfo}
          />
        ) : (
          <div>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
            {selectedStrategyIndex !== undefined && strategies && onShowStrategySelection && (
              <StrategyDetails 
                onShowStrategySelection={onShowStrategySelection}
                hasOtherStrategies={strategies.length > 1}
                isFollowUpMode={isFollowUpMode}
              />
            )}
          </div>
        )}
        <p className={cn(
          "text-xs mt-2 opacity-70",
          isUser ? "text-right" : "text-left"
        )}>
          {formatTime(timestamp)}
        </p>
      </div>
    </div>
  );
};