import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Pause, SkipBack, SkipForward, Square, Zap } from 'lucide-react';
import { AlgorithmState } from '../../types/graph';

interface ControlPanelProps {
  algorithmState: AlgorithmState;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onStartNodeChange: (nodeId: string) => void;
  onEndNodeChange: (nodeId: string) => void;
  onSpeedChange: (speed: number) => void;
  nodeOptions: Array<{ id: string; label: string }>;
  speed: number;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  algorithmState,
  onPlay,
  onPause,
  onStop,
  onNext,
  onPrevious,
  onStartNodeChange,
  onEndNodeChange,
  onSpeedChange,
  nodeOptions,
  speed
}) => {
  const { isRunning, isPaused, currentStep, steps, startNode, endNode } = algorithmState;

  return (
    <div className="glass-panel p-6 space-y-6">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary mb-2 flex items-center justify-center gap-2">
          <Zap className="w-6 h-6" />
          Algorithm Control Center
        </h2>
        <p className="text-muted-foreground text-sm">
          Control the pathfinding simulation
        </p>
      </div>

      {/* Node Selection */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Start City</label>
          <Select value={startNode || ''} onValueChange={onStartNodeChange}>
            <SelectTrigger className="w-full bg-input/50 border-border/50">
              <SelectValue placeholder="Select start city" />
            </SelectTrigger>
            <SelectContent>
              {nodeOptions.map((node) => (
                <SelectItem key={node.id} value={node.id}>
                  {node.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">End City</label>
          <Select value={endNode || ''} onValueChange={onEndNodeChange}>
            <SelectTrigger className="w-full bg-input/50 border-border/50">
              <SelectValue placeholder="Select end city" />
            </SelectTrigger>
            <SelectContent>
              {nodeOptions.map((node) => (
                <SelectItem key={node.id} value={node.id}>
                  {node.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Speed Control */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Animation Speed</label>
        <Select value={speed.toString()} onValueChange={(value) => onSpeedChange(Number(value))}>
          <SelectTrigger className="w-full bg-input/50 border-border/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0.5">0.5x - Slow</SelectItem>
            <SelectItem value="1">1x - Normal</SelectItem>
            <SelectItem value="1.5">1.5x - Fast</SelectItem>
            <SelectItem value="2">2x - Very Fast</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Control Buttons */}
      <div className="grid grid-cols-5 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrevious}
          disabled={currentStep <= 0 || isRunning}
          className="btn-neon"
        >
          <SkipBack className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={isRunning && !isPaused ? onPause : onPlay}
          disabled={!startNode || !endNode}
          className={`btn-neon ${isRunning && !isPaused ? 'active' : ''}`}
        >
          {isRunning && !isPaused ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onStop}
          disabled={!isRunning && currentStep === 0}
          className="btn-neon"
        >
          <Square className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onNext}
          disabled={currentStep >= steps.length - 1 || isRunning}
          className="btn-neon"
        >
          <SkipForward className="w-4 h-4" />
        </Button>

        <div className="text-xs text-center text-muted-foreground flex items-center justify-center">
          {steps.length > 0 && (
            <span className="font-mono">
              {currentStep + 1}/{steps.length}
            </span>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      {steps.length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentStep + 1) / steps.length) * 100}%`
              }}
            />
          </div>
        </div>
      )}

      {/* Current Step Description */}
      {steps.length > 0 && currentStep < steps.length && (
        <div className="glass-panel p-4 bg-muted/20">
          <h4 className="text-sm font-semibold text-primary mb-2">Current Step:</h4>
          <p className="text-sm text-foreground">
            {steps[currentStep]?.description}
          </p>
        </div>
      )}
    </div>
  );
};