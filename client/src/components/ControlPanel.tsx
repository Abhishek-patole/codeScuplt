import { Button } from "@/components/ui/button";
import { Play, Pause, StepForward, StepBack, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface ControlPanelProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onReset: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  currentStep: number;
  totalSteps: number;
}

export const ControlPanel = ({
  isPlaying,
  onPlay,
  onPause,
  onNext,
  onPrevious,
  onReset,
  canGoNext,
  canGoPrevious,
  currentStep,
  totalSteps
}: ControlPanelProps) => {
  return (
    <div className="glass-card p-6 rounded-xl">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-center gap-3">
          <Button
            onClick={onPrevious}
            disabled={!canGoPrevious}
            className="control-button"
            size="lg"
          >
            <StepBack className="w-5 h-5" />
          </Button>
          
          <Button
            onClick={isPlaying ? onPause : onPlay}
            disabled={!canGoNext && !isPlaying}
            className={cn(
              "control-button text-lg px-8",
              isPlaying && "from-[hsl(var(--swapping))] to-[hsl(var(--swapping)/0.8)]"
            )}
            size="lg"
          >
            {isPlaying ? (
              <>
                <Pause className="w-6 h-6 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-6 h-6 mr-2" />
                Play
              </>
            )}
          </Button>
          
          <Button
            onClick={onNext}
            disabled={!canGoNext}
            className="control-button"
            size="lg"
          >
            <StepForward className="w-5 h-5" />
          </Button>
          
          <Button
            onClick={onReset}
            className="control-button from-[hsl(var(--secondary))] to-[hsl(var(--secondary-glow))]"
            size="lg"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="text-center">
          <div className="text-sm text-muted-foreground mb-2">
            Step {currentStep} of {totalSteps}
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary-glow))] h-2 rounded-full transition-all duration-300"
              style={{ width: `${totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};