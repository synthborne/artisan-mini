import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface DetailsGateProps {
  onSubmit: (craftType: string, location: string, additionalInfo?: string) => void;
  initialData?: {
    craftType: string;
    location: string;
    additionalInfo?: string;
  };
}

export const DetailsGate: React.FC<DetailsGateProps> = ({ onSubmit, initialData }) => {
  const [craftType, setCraftType] = useState(initialData?.craftType || '');
  const [location, setLocation] = useState(initialData?.location || '');
  const [additionalInfo, setAdditionalInfo] = useState(initialData?.additionalInfo || '');

  const isValid = craftType.trim() !== '' && location.trim() !== '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onSubmit(craftType.trim(), location.trim(), additionalInfo.trim() || undefined);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm flex items-start justify-center p-4 pt-8 z-50 overflow-y-auto">
      <Card className="w-full max-w-md shadow-elevated mb-8">
        <CardHeader className="text-center space-y-2">
          <div className="w-16 h-16 bg-gradient-warm rounded-full mx-auto flex items-center justify-center shadow-glow">
            <span className="text-2xl">🏺</span>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome to Artisan Chat</CardTitle>
          <CardDescription className="text-muted-foreground">
            Let's get to know your craft and location to personalize your marketing strategies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="craftType" className="text-sm font-medium">
                Your Craft
              </Label>
              <Input
                id="craftType"
                type="text"
                placeholder="e.g., pottery"
                value={craftType}
                onChange={(e) => setCraftType(e.target.value)}
                className="transition-smooth focus:shadow-soft"
                aria-describedby="craft-description"
              />
              <p id="craft-description" className="text-xs text-muted-foreground">
                What type of artisan work do you do?
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium">
                Your Location
              </Label>
              <Input
                id="location"
                type="text"
                placeholder="e.g., Jaipur, Rajasthan"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="transition-smooth focus:shadow-soft"
                aria-describedby="location-description"
              />
              <p id="location-description" className="text-xs text-muted-foreground">
                Where are you based?
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalInfo" className="text-sm font-medium">
                Additional Information <span className="text-muted-foreground">(Optional)</span>
              </Label>
              <Input
                id="additionalInfo"
                type="text"
                placeholder="e.g., single artisan, smartphone only, tech comfortable"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                className="transition-smooth focus:shadow-soft"
                aria-describedby="additional-description"
              />
              <p id="additional-description" className="text-xs text-muted-foreground">
                Any other details that can help personalize your marketing suggestions
              </p>
            </div>


            <Button
              type="submit"
              variant="artisan"
              size="lg"
              disabled={!isValid}
              className="w-full text-base"
            >
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};