import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface StrategyDetailsProps {
  onShowStrategySelection: () => void;
  hasOtherStrategies?: boolean;
  isFollowUpMode?: boolean;
}

export const StrategyDetails: React.FC<StrategyDetailsProps> = ({
  onShowStrategySelection,
  hasOtherStrategies = true,
  isFollowUpMode = false
}) => {
  if (!hasOtherStrategies) return null;

  return (
    <div className="mt-6 pt-4 border-t border-border/50">
      {isFollowUpMode && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-700 dark:text-blue-300 text-center">
            💬 <strong>Follow-up Mode:</strong> You can ask specific questions about this strategy below!
          </p>
        </div>
      )}
      <div className="flex items-center justify-center">
        <Button
          variant="outline"
          size="sm"
          onClick={onShowStrategySelection}
          className="flex items-center gap-2 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Choose Another Strategy
        </Button>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">
        Want to explore a different approach? Click above to see all available strategies.
      </p>
    </div>
  );
};
