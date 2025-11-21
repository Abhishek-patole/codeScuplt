import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Plus, Minus, RotateCcw, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { sampleTrees } from '@/utils/bst';

interface ControlPanelProps {
  onInsert: (value: number) => void;
  onDelete: (value: number) => void;
  onSearch: (value: number) => void;
  onClear: () => void;
  onLoadSample: (sample: number[]) => void;
  onPlay: () => void;
  onPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSpeedChange: (speed: number) => void;
  isPlaying: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
  speed: number;
  currentMessage?: string;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  onInsert,
  onDelete,
  onSearch,
  onClear,
  onLoadSample,
  onPlay,
  onPause,
  onPrevious,
  onNext,
  onSpeedChange,
  isPlaying,
  canGoBack,
  canGoForward,
  speed,
  currentMessage
}) => {
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const handleInsert = () => {
    const value = parseInt(inputValue);
    if (!isNaN(value)) {
      onInsert(value);
      setInputValue('');
    }
  };

  const handleDelete = () => {
    const value = parseInt(inputValue);
    if (!isNaN(value)) {
      onDelete(value);
      setInputValue('');
    }
  };

  const handleSearch = () => {
    const value = parseInt(searchValue);
    if (!isNaN(value)) {
      onSearch(value);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  const handleSampleLoad = (sampleName: string) => {
    const sample = sampleTrees[sampleName as keyof typeof sampleTrees];
    if (sample) {
      onLoadSample(sample);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tree Operations */}
      <div className="control-panel">
        <h3 className="text-lg font-semibold mb-4 text-primary">Tree Operations</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="nodeValue">Node Value</Label>
            <div className="flex gap-2">
              <Input
                id="nodeValue"
                type="number"
                placeholder="Enter number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, handleInsert)}
                className="flex-1"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="searchValue">Search Value</Label>
            <div className="flex gap-2">
              <Input
                id="searchValue"
                type="number"
                placeholder="Search for..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, handleSearch)}
                className="flex-1"
              />
              <Button 
                onClick={handleSearch}
                className="control-btn control-btn--primary"
                disabled={!searchValue}
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={handleInsert} className="control-btn" disabled={!inputValue}>
            <Plus className="w-4 h-4" />
            Insert
          </Button>
          
          <Button onClick={handleDelete} className="control-btn" disabled={!inputValue}>
            <Minus className="w-4 h-4" />
            Delete
          </Button>
          
          <Button onClick={onClear} className="control-btn" variant="destructive">
            <RotateCcw className="w-4 h-4" />
            Clear
          </Button>
        </div>
      </div>

      {/* Sample Trees */}
      <div className="control-panel">
        <h3 className="text-lg font-semibold mb-4 text-primary">Sample Trees</h3>
        
        <div className="space-y-2">
          <Label>Load Predefined Tree</Label>
          <Select onValueChange={handleSampleLoad}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a sample tree" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="balanced">Balanced Tree</SelectItem>
              <SelectItem value="simple">Simple Tree</SelectItem>
              <SelectItem value="rightSkewed">Right Skewed</SelectItem>
              <SelectItem value="leftSkewed">Left Skewed</SelectItem>
              <SelectItem value="complex">Complex Tree</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="control-panel">
        <h3 className="text-lg font-semibold mb-4 text-primary">Search Playback</h3>
        
        {currentMessage && (
          <div className="mb-4 p-3 rounded-lg bg-accent/20 border border-accent/30">
            <p className="text-sm font-medium text-accent">{currentMessage}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          <Button 
            onClick={onPrevious} 
            className="control-btn"
            disabled={!canGoBack}
          >
            <SkipBack className="w-4 h-4" />
            Previous
          </Button>
          
          <Button 
            onClick={isPlaying ? onPause : onPlay} 
            className="control-btn control-btn--primary"
            disabled={!currentMessage}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          
          <Button 
            onClick={onNext} 
            className="control-btn"
            disabled={!canGoForward}
          >
            <SkipForward className="w-4 h-4" />
            Next
          </Button>
        </div>

        <div className="space-y-2">
          <Label>Animation Speed</Label>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Slow</span>
            <Slider
              value={[speed]}
              onValueChange={(value) => onSpeedChange(value[0])}
              max={5}
              min={0.5}
              step={0.5}
              className="flex-1"
            />
            <span className="text-sm text-muted-foreground">Fast</span>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            {speed}x speed
          </div>
        </div>
      </div>
    </div>
  );
};