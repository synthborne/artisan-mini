import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Settings } from 'lucide-react';

interface ChatHeaderProps {
  onChangeDetails: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onChangeDetails }) => {
  return (
    <header className="flex items-center justify-between p-4 border-b border-border bg-card shadow-soft">
      <div className="flex items-center gap-3">
        <Avatar className="w-10 h-10 shadow-soft">
          <AvatarFallback className="bg-gradient-warm text-primary-foreground font-semibold text-lg">
            🤖
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-semibold text-lg text-foreground">artisan-mini</h1>
          <p className="text-sm text-muted-foreground">Your craft assistant</p>
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={onChangeDetails}
        className="text-muted-foreground hover:text-foreground transition-smooth"
        aria-label="Change your details"
      >
        <Settings className="w-4 h-4 mr-2" />
        Change details
      </Button>
    </header>
  );
};