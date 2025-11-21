import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { 
  Play, 
  Pause, 
  StepForward, 
  StepBack, 
  RotateCcw, 
  Gauge,
  Activity
} from 'lucide-react';

interface AnimationControlsProps {
  isPlaying: boolean;
  isPaused: boolean;
  canPlay: boolean;
  canStep: boolean;
  currentStep: number;
  totalSteps: number;
  speed: number;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSpeedChange: (speed: number) => void;
  onReset: () => void;
}

export const AnimationControls: React.FC<AnimationControlsProps> = ({
  isPlaying,
  isPaused,
  canPlay,
  canStep,
  currentStep,
  totalSteps,
  speed,
  onPlay,
  onPause,
  onNext,
  onPrev,
  onSpeedChange,
  onReset
}) => {
  return (
    <Card className="p-6 bg-card border-border shadow-medium">
      <div className="space-y-6">
        {/* Status Display */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="h-5 w-5 text-primary" />
            <div>
              <h3 className="text-lg font-semibold text-foreground">Animation Controls</h3>
              <p className="text-sm text-muted-foreground">
                {!canPlay ? 'No animation steps available' :
                 isPlaying ? 'Animation playing...' :
                 isPaused ? 'Animation paused' :
                 'Animation ready to play'}
              </p>
            </div>
          </div>
          
          {canStep && (
            <div className="text-right">
              <p className="text-lg font-bold text-primary">
                {currentStep + 1} / {totalSteps}
              </p>
              <p className="text-xs text-muted-foreground">Current Step</p>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {canStep && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-medium">Progress</Label>
              <span className="text-xs text-muted-foreground">
                {Math.round(((currentStep + 1) / totalSteps) * 100)}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${((currentStep + 1) / totalSteps) * 100}%` 
                }}
              ></div>
            </div>
          </div>
        )}

        {/* Main Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Play/Pause Button */}
          <Button
            onClick={isPlaying ? onPause : onPlay}
            disabled={!canPlay}
            className={`
              flex items-center gap-2 px-6 py-3 text-base font-semibold
              ${isPlaying 
                ? 'bg-warning hover:bg-warning/90 text-warning-foreground' 
                : 'bg-gradient-primary hover:opacity-90 text-white border-none'
              }
              shadow-medium transition-all duration-normal
            `}
          >
            {isPlaying ? (
              <>
                <Pause className="h-5 w-5" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-5 w-5" />
                Play
              </>
            )}
          </Button>

          {/* Step Controls */}
          <div className="flex items-center gap-2">
            <Button
              onClick={onPrev}
              disabled={!canStep || currentStep <= -1}
              variant="outline"
              size="icon"
              className="border-secondary text-secondary hover:bg-secondary hover:text-white"
            >
              <StepBack className="h-4 w-4" />
            </Button>
            
            <Button
              onClick={onNext}
              disabled={!canStep || currentStep >= totalSteps - 1}
              variant="outline"
              size="icon"
              className="border-secondary text-secondary hover:bg-secondary hover:text-white"
            >
              <StepForward className="h-4 w-4" />
            </Button>
          </div>

          {/* Reset Button */}
          <Button
            onClick={onReset}
            disabled={!canStep}
            variant="outline"
            className="flex items-center gap-2 border-destructive text-destructive hover:bg-destructive hover:text-white"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>

        {/* Speed Control */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Gauge className="h-4 w-4 text-muted-foreground" />
            <Label className="text-sm font-medium">
              Animation Speed: {speed.toFixed(1)}x
            </Label>
          </div>
          
          <div className="px-2">
            <Slider
              value={[speed]}
              onValueChange={(values) => onSpeedChange(values[0])}
              min={0.5}
              max={3.0}
              step={0.1}
              className="w-full"
              disabled={isPlaying}
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0.5x (Slow)</span>
              <span>1.0x (Normal)</span>
              <span>3.0x (Fast)</span>
            </div>
          </div>
        </div>

        {/* Help Text */}
        <div className="bg-muted/30 rounded-lg p-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong>Tip:</strong> Use the step controls to move through the animation manually, 
            or click Play to watch the full sequence. Adjust the speed slider to control 
            animation timing.
          </p>
        </div>
      </div>
    </Card>
  );
};