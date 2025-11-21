import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { Plus, Minus, Eye, Trash2, Gamepad2 } from 'lucide-react';

interface OperationPanelProps {
  onPush: (value: string | number) => Promise<boolean>;
  onPop: () => Promise<string | number | null>;
  onPeek: () => string | number | null;
  onClear: () => void;
  maxSize: number;
  onMaxSizeChange: (size: number) => void;
  isOperating: boolean;
  currentSize: number;
}

export const OperationPanel: React.FC<OperationPanelProps> = ({
  onPush,
  onPop,
  onPeek,
  onClear,
  maxSize,
  onMaxSizeChange,
  isOperating,
  currentSize,
}) => {
  const [pushValue, setPushValue] = useState<string>('');

  const handlePush = async () => {
    if (!pushValue.trim()) return;
    
    const value = isNaN(Number(pushValue)) ? pushValue : Number(pushValue);
    const success = await onPush(value);
    
    if (success) {
      setPushValue('');
    }
  };

  const generateRandomValue = () => {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    setPushValue(randomNum.toString());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isOperating) {
      handlePush();
    }
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border shadow-glow-stack">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl bg-gradient-text bg-clip-text text-transparent">
          Game Controls
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Stack Configuration */}
        <div className="space-y-4">
          <Label className="text-sm font-medium">Stack Size Limit</Label>
          <div className="space-y-2">
            <Slider
              value={[maxSize]}
              onValueChange={(value) => onMaxSizeChange(value[0])}
              max={10}
              min={3}
              step={1}
              disabled={isOperating}
              className="w-full"
            />
            <div className="text-xs text-muted-foreground text-center">
              Max: {maxSize} elements
            </div>
          </div>
        </div>

        <Separator className="opacity-50" />

        {/* Push Operation */}
        <div className="space-y-4">
          <Label className="text-sm font-medium bg-gradient-text bg-clip-text text-transparent">
            Push Operation
          </Label>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter value..."
              value={pushValue}
              onChange={(e) => setPushValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isOperating}
              className="flex-1 bg-input/50 backdrop-blur-sm border-border"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={generateRandomValue}
              disabled={isOperating}
              className="bg-secondary/50 hover:bg-secondary/80"
            >
              <Gamepad2 className="h-4 w-4" />
            </Button>
          </div>
          <Button
            onClick={handlePush}
            disabled={isOperating || !pushValue.trim() || currentSize >= maxSize}
            className="w-full bg-gradient-stack hover:shadow-glow-stack text-white font-medium"
          >
            <Plus className="mr-2 h-4 w-4" />
            Push Element
          </Button>
        </div>

        <Separator className="opacity-50" />

        {/* Stack Operations */}
        <div className="space-y-3">
          <Label className="text-sm font-medium bg-gradient-text bg-clip-text text-transparent">
            Stack Operations
          </Label>
          
          <Button
            onClick={onPop}
            disabled={isOperating || currentSize === 0}
            variant="outline"
            className="w-full bg-destructive/10 hover:bg-destructive/20 border-destructive/30 hover:border-destructive/50 text-destructive hover:text-destructive"
          >
            <Minus className="mr-2 h-4 w-4" />
            Pop Element
          </Button>

          <Button
            onClick={onPeek}
            disabled={isOperating || currentSize === 0}
            variant="outline"
            className="w-full bg-warning/10 hover:bg-warning/20 border-warning/30 hover:border-warning/50 text-warning hover:text-warning"
          >
            <Eye className="mr-2 h-4 w-4" />
            Peek Top
          </Button>

          <Button
            onClick={onClear}
            disabled={isOperating || currentSize === 0}
            variant="outline"
            className="w-full bg-muted/20 hover:bg-muted/30 border-border hover:border-muted text-muted-foreground hover:text-foreground"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear Stack
          </Button>
        </div>

        {/* Status */}
        <div className="bg-secondary/30 rounded-lg p-3 text-center">
          <div className="text-sm text-muted-foreground">
            Current Size: <span className="text-foreground font-medium">{currentSize}</span>
          </div>
          {isOperating && (
            <div className="text-xs text-stack-top mt-1 animate-glow-pulse">
              Operation in progress...
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};