import { Button } from "@/components/ui/button";
import { Play, Pause, SkipBack, SkipForward, RotateCcw, Shuffle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ControlPanelProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onReset: () => void;
  onShuffle: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
  className?: string;
}

export const ControlPanel = ({
  isPlaying,
  onPlay,
  onPause,
  onPrevious,
  onNext,
  onReset,
  onShuffle,
  canGoBack,
  canGoForward,
  className
}: ControlPanelProps) => {
  return (
    <div className={cn("glass-morphism rounded-2xl p-6 shadow-element", className)}>
      <h3 className="text-lg font-semibold mb-4 bg-gradient-accent bg-clip-text text-transparent">
        Animation Controls
      </h3>
      
      <div className="flex items-center justify-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={onReset}
          className="border-muted hover:border-accent hover:bg-accent/10"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={onPrevious}
          disabled={!canGoBack}
          className="border-muted hover:border-accent hover:bg-accent/10 disabled:opacity-50"
        >
          <SkipBack className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          onClick={isPlaying ? onPause : onPlay}
          className="bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-glow"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={onNext}
          disabled={!canGoForward}
          className="border-muted hover:border-accent hover:bg-accent/10 disabled:opacity-50"
        >
          <SkipForward className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={onShuffle}
          className="border-muted hover:border-accent hover:bg-accent/10"
        >
          <Shuffle className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};