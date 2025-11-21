import { useState } from "react";
import { Plus, Minus, FileText, Trash2, Eye, Search, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InputPanelProps {
  onEnqueue: (element: string) => void;
  onDequeue: () => void;
  onPeek: () => void;
  onIsEmpty: () => void;
  onSize: () => void;
  onLoadSample: () => void;
  onClear: () => void;
  queueLength: number;
}

export const InputPanel = ({
  onEnqueue,
  onDequeue,
  onPeek,
  onIsEmpty,
  onSize,
  onLoadSample,
  onClear,
  queueLength
}: InputPanelProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleEnqueue = () => {
    if (inputValue.trim()) {
      onEnqueue(inputValue.trim());
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleEnqueue();
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Primary Operations Panel */}
      <Card className="queue-container">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" />
            Primary Operations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Enqueue */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Add Element (Enqueue)
            </label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter element..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button 
                onClick={handleEnqueue}
                disabled={!inputValue.trim()}
                className="btn-gradient-primary control-button px-4"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Dequeue */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Remove Element (Dequeue)
            </label>
            <Button 
              onClick={onDequeue}
              disabled={queueLength === 0}
              className="w-full btn-gradient-danger control-button"
            >
              <Minus className="h-4 w-4 mr-2" />
              Remove from Front
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Query Operations Panel */}
      <Card className="queue-container">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-accent" />
            Query Operations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Peek */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              View Front Element
            </label>
            <Button 
              onClick={onPeek}
              disabled={queueLength === 0}
              className="w-full btn-gradient-success control-button"
            >
              <Eye className="h-4 w-4 mr-2" />
              Peek Front
            </Button>
          </div>

          {/* Size */}
          <Button 
            onClick={onSize}
            className="w-full btn-gradient-warning control-button"
          >
            <Hash className="h-4 w-4 mr-2" />
            Get Size ({queueLength})
          </Button>

          {/* Is Empty */}
          <Button 
            onClick={onIsEmpty}
            className="w-full control-button"
          >
            <Search className="h-4 w-4 mr-2" />
            Check if Empty
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions Panel */}
      <Card className="queue-container">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-accent" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Load Sample */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Try Sample Operations
            </label>
            <Button 
              onClick={onLoadSample}
              className="w-full btn-gradient-primary control-button"
            >
              <FileText className="h-4 w-4 mr-2" />
              Load Sample Data
            </Button>
          </div>

          {/* Clear Queue */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Reset Everything
            </label>
            <Button 
              onClick={onClear}
              className="w-full btn-gradient-danger control-button"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Queue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};