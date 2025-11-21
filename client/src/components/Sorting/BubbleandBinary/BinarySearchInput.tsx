import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Shuffle, Target } from "lucide-react";
import { toast } from "sonner";

interface BinarySearchInputProps {
  onArrayChange: (array: number[]) => void;
  onTargetChange: (target: number) => void;
  currentArray: number[];
  currentTarget: number;
  disabled?: boolean;
}

const SAMPLE_ARRAYS = [
  { name: "Small Sorted", array: [1, 3, 5, 7, 9, 11, 13], target: 7 },
  { name: "Medium Range", array: [2, 8, 12, 16, 25, 34, 42, 58, 67, 73], target: 34 },
  { name: "Large Numbers", array: [100, 250, 400, 550, 700, 850, 999], target: 550 },
  { name: "Powers of 2", array: [1, 2, 4, 8, 16, 32, 64, 128, 256], target: 64 },
  { name: "Fibonacci", array: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55], target: 21 }
];

export const BinarySearchInput = ({
  onArrayChange,
  onTargetChange,
  currentArray,
  currentTarget,
  disabled = false
}: BinarySearchInputProps) => {
  const [inputValue, setInputValue] = useState(currentArray.join(', '));
  const [targetValue, setTargetValue] = useState(currentTarget.toString());

  const validateAndUpdateArray = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) {
      toast.error("Please enter some numbers");
      return false;
    }

    const numbers = trimmed.split(',').map(s => {
      const num = parseInt(s.trim());
      return isNaN(num) ? null : num;
    }).filter(n => n !== null) as number[];

    if (numbers.length === 0) {
      toast.error("Please enter valid numbers separated by commas");
      return false;
    }

    if (numbers.length < 2) {
      toast.error("Please enter at least 2 numbers");
      return false;
    }

    if (numbers.length > 15) {
      toast.error("Maximum 15 numbers allowed");
      return false;
    }

    if (numbers.some(n => n < 0 || n > 999)) {
      toast.error("Numbers must be between 0 and 999");
      return false;
    }

    onArrayChange(numbers);
    return true;
  };

  const validateAndUpdateTarget = (value: string) => {
    const num = parseInt(value.trim());
    if (isNaN(num)) {
      toast.error("Please enter a valid target number");
      return false;
    }

    if (num < 0 || num > 999) {
      toast.error("Target must be between 0 and 999");
      return false;
    }

    onTargetChange(num);
    return true;
  };

  const handleArraySubmit = () => {
    if (validateAndUpdateArray(inputValue)) {
      toast.success("Array updated! Note: Array will be sorted automatically for binary search");
    }
  };

  const handleTargetSubmit = () => {
    if (validateAndUpdateTarget(targetValue)) {
      toast.success("Target updated!");
    }
  };

  const handleSampleLoad = (sample: typeof SAMPLE_ARRAYS[0]) => {
    setInputValue(sample.array.join(', '));
    setTargetValue(sample.target.toString());
    onArrayChange(sample.array);
    onTargetChange(sample.target);
    toast.success(`Loaded ${sample.name} sample`);
  };

  const handleRandomGenerate = () => {
    const size = Math.floor(Math.random() * 6) + 5; // 5-10 elements
    const numbers: number[] = [];
    for (let i = 0; i < size; i++) {
      numbers.push(Math.floor(Math.random() * 100) + 1);
    }
    numbers.sort((a, b) => a - b); // Sort for binary search
    const randomTarget = numbers[Math.floor(Math.random() * numbers.length)];
    
    setInputValue(numbers.join(', '));
    setTargetValue(randomTarget.toString());
    onArrayChange(numbers);
    onTargetChange(randomTarget);
    toast.success("Generated random sorted array with target!");
  };

  return (
    <Card className="glass-card p-6 animate-fade-in-up">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary-glow))] bg-clip-text text-transparent">
            Binary Search Configuration
          </h2>
          <p className="text-muted-foreground">
            Configure your sorted array and target value for binary search
          </p>
        </div>

        {/* Array Input */}
        <div className="space-y-3">
          <Label htmlFor="array-input" className="text-lg font-semibold">
            Array Elements (will be sorted automatically)
          </Label>
          <div className="flex gap-3">
            <Input
              id="array-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter numbers separated by commas (e.g., 5, 2, 8, 1, 9)"
              className="input-glow"
              disabled={disabled}
              onKeyPress={(e) => e.key === 'Enter' && handleArraySubmit()}
            />
            <Button 
              onClick={handleArraySubmit}
              disabled={disabled}
              className="control-button"
            >
              Update
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Enter 2-15 numbers (0-999). Array will be automatically sorted for binary search.
          </p>
        </div>

        {/* Target Input */}
        <div className="space-y-3">
          <Label htmlFor="target-input" className="text-lg font-semibold flex items-center gap-2">
            <Target className="w-5 h-5" />
            Target Value
          </Label>
          <div className="flex gap-3">
            <Input
              id="target-input"
              value={targetValue}
              onChange={(e) => setTargetValue(e.target.value)}
              placeholder="Enter target number to search for"
              className="input-glow"
              disabled={disabled}
              onKeyPress={(e) => e.key === 'Enter' && handleTargetSubmit()}
            />
            <Button 
              onClick={handleTargetSubmit}
              disabled={disabled}
              className="control-button"
            >
              Set Target
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={handleRandomGenerate}
            disabled={disabled}
            className="control-button from-[hsl(var(--secondary))] to-[hsl(var(--secondary-glow))]"
          >
            <Shuffle className="w-4 h-4 mr-2" />
            Random
          </Button>
          
          {SAMPLE_ARRAYS.map((sample, index) => (
            <Button
              key={index}
              onClick={() => handleSampleLoad(sample)}
              disabled={disabled}
              variant="outline"
              className="hover:bg-[hsl(var(--accent)/0.1)]"
            >
              {sample.name}
            </Button>
          ))}
        </div>

        {/* Current Configuration Display */}
        <div className="border-t border-[hsl(var(--border))] pt-4">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-muted-foreground">Current Array:</span>
              <div className="mt-1 p-2 bg-[hsl(var(--muted))] rounded text-center font-mono">
                {currentArray.length > 0 ? `[${currentArray.join(', ')}]` : 'No array set'}
              </div>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Target:</span>
              <div className="mt-1 p-2 bg-[hsl(var(--muted))] rounded text-center font-mono font-bold">
                {currentTarget}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};