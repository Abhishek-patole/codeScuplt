import { Play, Pause, SkipBack, SkipForward, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface ControlPanelProps {
  isPlaying: boolean;
  canPlay: boolean;
  canPrev: boolean;
  canNext: boolean;
  currentStep: number;
  totalSteps: number;
  currentDescription: string;
  onPlay: () => void;
  onPause: () => void;
  onPrev: () => void;
  onNext: () => void;
  onGoToStep: (step: number) => void;
  playSpeed: number;
  onSpeedChange: (speed: number) => void;
}

export const ControlPanel = ({
  isPlaying,
  canPlay,
  canPrev,
  canNext,
  currentStep,
  totalSteps,
  currentDescription,
  onPlay,
  onPause,
  onPrev,
  onNext,
  onGoToStep,
  playSpeed,
  onSpeedChange
}: ControlPanelProps) => {
  const speedOptions = [
    { value: 2500, label: "0.5x" },
    { value: 1500, label: "1x" },
    { value: 800, label: "1.5x" },
    { value: 500, label: "2x" }
  ];

  const getCurrentSpeedLabel = () => {
    const option = speedOptions.find(opt => opt.value === playSpeed);
    return option?.label ?? "1x";
  };

  return (
    <div className="queue-container space-y-6">
      {/* Current Operation Description */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          <span className="font-medium">{currentDescription}</span>
        </div>
      </div>

      {/* Step Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Step {currentStep + 1} of {totalSteps}</span>
          <span>{Math.round(((currentStep + 1) / totalSteps) * 100)}%</span>
        </div>
        <Slider
          value={[currentStep]}
          onValueChange={([value]) => onGoToStep(value)}
          max={totalSteps - 1}
          step={1}
          className="w-full"
        />
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center gap-4">
        {/* Previous */}
        <Button
          variant="outline"
          size="lg"
          onClick={onPrev}
          disabled={!canPrev}
          className="control-button"
        >
          <SkipBack className="h-5 w-5" />
        </Button>

        {/* Play/Pause */}
        <Button
          size="lg"
          onClick={isPlaying ? onPause : onPlay}
          disabled={!canPlay && !isPlaying}
          className={`control-button px-8 ${isPlaying ? 'active' : ''}`}
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6 ml-1" />
          )}
        </Button>

        {/* Next */}
        <Button
          variant="outline"
          size="lg"
          onClick={onNext}
          disabled={!canNext}
          className="control-button"
        >
          <SkipForward className="h-5 w-5" />
        </Button>
      </div>

      {/* Speed Control */}
      <div className="flex items-center justify-center gap-4">
        <Zap className="h-4 w-4 text-muted-foreground" />
        <div className="flex gap-2">
          {speedOptions.map((option) => (
            <Button
              key={option.value}
              variant="outline"
              size="sm"
              onClick={() => onSpeedChange(option.value)}
              className={`control-button ${playSpeed === option.value ? 'active' : ''}`}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};