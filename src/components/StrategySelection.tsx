import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Strategy {
  craft: string;
  given_budget: number;
  allocated_budget: number;
  location: string;
  strategy_title: string;
  marketing_strategy: string;
  strategy_explanation: string;
  strategy_working: string;
  tech_requirements: string;
  estimated_timeline: string;
  allocations: Array<{
    item: string;
    amount: number;
    explanation: string;
  }>;
}

interface StrategySelectionProps {
  strategies: Strategy[];
  onSelectStrategy: (strategyIndex: number) => void;
  hasUserBudget?: boolean; // Whether user provided a budget
}

export const StrategySelection: React.FC<StrategySelectionProps> = ({
  strategies,
  onSelectStrategy,
  hasUserBudget = false
}) => {
  // Use the same logic as formatMultipleStrategies - check given_budget field
  const userProvidedBudget = strategies[0]?.given_budget > 0;
  
  // Sort strategies by allocated_budget (lowest to highest)
  const sortedStrategies = [...strategies].sort((a, b) => a.allocated_budget - b.allocated_budget);
  
  // Assign labels based on budget order: lowest = budget-friendly, highest = premium
  const budgetLabels = ['💰 Budget-Friendly Strategy', '⭐ Mid-Range Strategy', '💎 Premium Strategy'];

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          🎯 Choose a strategy to explore in detail
        </h3>
        <p className="text-sm text-muted-foreground">
          Click on any strategy below to get a comprehensive breakdown
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
        {sortedStrategies.map((strategy, index) => {
          // Find the original index in the unsorted array
          const originalIndex = strategies.findIndex(s => s === strategy);
          
          return (
          <Card 
            key={originalIndex} 
            className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border-2 hover:border-primary/50"
            onClick={() => onSelectStrategy(originalIndex)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium">
                  {userProvidedBudget ? strategy.strategy_title : budgetLabels[index]}
                </CardTitle>
                <Badge variant="secondary" className="text-xs">
                  ₹{strategy.allocated_budget.toLocaleString('en-IN')}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div>
                  {!userProvidedBudget && (
                    <h4 className="font-medium text-sm mb-1">{strategy.strategy_title}</h4>
                  )}
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {strategy.marketing_strategy}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="text-xs">
                    <span className="font-medium">Timeline:</span> {strategy.estimated_timeline}
                  </div>
                  
                  <div className="text-xs">
                    <span className="font-medium">Key Focus:</span> {strategy.strategy_explanation.substring(0, 100)}...
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectStrategy(originalIndex);
                  }}
                >
                  View Detailed Strategy
                </Button>
              </div>
            </CardContent>
          </Card>
          );
        })}
      </div>
      
      <div className="text-center mt-4">
        <p className="text-xs text-muted-foreground">
          Or ask me to elaborate on any specific aspect! 💬
        </p>
      </div>
    </div>
  );
};
