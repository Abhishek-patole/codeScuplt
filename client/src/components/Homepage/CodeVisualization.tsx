import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

const codeSteps = [
  {
    line: 1,
    code: "function binarySearch(arr, target) {",
    highlight: false,
    explanation: "Define the binary search function"
  },
  {
    line: 2,
    code: "  let left = 0;",
    highlight: false,
    explanation: "Initialize left pointer to start of array"
  },
  {
    line: 3,
    code: "  let right = arr.length - 1;",
    highlight: false,
    explanation: "Initialize right pointer to end of array"
  },
  {
    line: 4,
    code: "  while (left <= right) {",
    highlight: false,
    explanation: "Loop while search space is valid"
  },
  {
    line: 5,
    code: "    let mid = Math.floor((left + right) / 2);",
    highlight: false,
    explanation: "Calculate middle index"
  },
  {
    line: 6,
    code: "    if (arr[mid] === target) return mid;",
    highlight: false,
    explanation: "Check if middle element is target"
  },
  {
    line: 7,
    code: "    else if (arr[mid] < target) left = mid + 1;",
    highlight: false,
    explanation: "Search right half if middle is too small"
  },
  {
    line: 8,
    code: "    else right = mid - 1;",
    highlight: false,
    explanation: "Search left half if middle is too large"
  },
  {
    line: 9,
    code: "  }",
    highlight: false,
    explanation: "End of while loop"
  },
  {
    line: 10,
    code: "  return -1;",
    highlight: false,
    explanation: "Return -1 if target not found"
  },
  {
    line: 11,
    code: "}",
    highlight: false,
    explanation: "End of function"
  }
];

export const CodeVisualization = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highlightedSteps, setHighlightedSteps] = useState<number[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && currentStep < codeSteps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => {
          const next = prev + 1;
          setHighlightedSteps(prevHighlighted => [...prevHighlighted, prev]);
          return next;
        });
      }, 1500);
    } else if (currentStep >= codeSteps.length - 1) {
      setIsPlaying(false);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentStep]);

  const handlePlay = () => {
    if (currentStep >= codeSteps.length - 1) {
      setCurrentStep(0);
      setHighlightedSteps([]);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setHighlightedSteps([]);
  };

  return (
    <div className="relative">
      {/* Main Code Card */}
      <Card className="bg-card/80 backdrop-blur-md border border-border shadow-glass p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-destructive rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="ml-3 text-sm font-mono text-muted-foreground">binary-search.js</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePlay}
              className="h-8 w-8"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleReset}
              className="h-8 w-8"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Code Display */}
        <div className="font-mono text-sm space-y-1 relative">
          {codeSteps.map((step, index) => (
            <div
              key={index}
              className={`relative transition-all duration-500 rounded px-2 py-1 ${
                index === currentStep 
                  ? 'bg-primary/20 border-l-2 border-primary transform scale-105' 
                  : highlightedSteps.includes(index)
                  ? 'bg-accent/10 border-l-2 border-accent'
                  : 'hover:bg-muted/30'
              }`}
            >
              <span className="text-muted-foreground mr-4 select-none">
                {step.line.toString().padStart(2, '0')}
              </span>
              <span className={`${
                index === currentStep ? 'text-primary font-medium' : 'text-foreground'
              }`}>
                {step.code}
              </span>
              
              {/* Execution indicator */}
              {index === currentStep && (
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-4 bg-muted rounded-full h-1 overflow-hidden">
          <div 
            className="h-full bg-gradient-primary transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / codeSteps.length) * 100}%` }}
          ></div>
        </div>
      </Card>

      {/* Explanation Card */}
      <Card className="mt-4 bg-gradient-glass backdrop-blur-md border border-white/20 p-4">
        <div className="text-sm">
          <div className="text-accent font-medium mb-1">Step {currentStep + 1} of {codeSteps.length}</div>
          <div className="text-foreground">{codeSteps[currentStep]?.explanation}</div>
        </div>
      </Card>

      {/* Floating elements for visual appeal */}
      <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/30 rounded-full blur-sm animate-float"></div>
      <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-accent/30 rounded-full blur-sm animate-float" style={{ animationDelay: '1s' }}></div>
    </div>
  );
};