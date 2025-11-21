import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shuffle, Plus } from "lucide-react";
import { toast } from "sonner";

interface ArrayInputProps {
  onArrayChange: (array: number[]) => void;
  currentArray: number[];
  disabled?: boolean;
}

const SAMPLE_ARRAYS = [
  { name: "Small Random", array: [64, 34, 25, 12, 22, 11, 90] },
  { name: "Reverse Sorted", array: [9, 8, 7, 6, 5, 4, 3, 2, 1] },
  { name: "Nearly Sorted", array: [1, 3, 2, 4, 6, 5, 7, 9, 8] },
  { name: "Duplicates", array: [5, 2, 8, 2, 9, 1, 5, 4] },
  { name: "Large Array", array: [45, 23, 67, 12, 89, 34, 56, 78, 90, 11, 33, 77] }
];

export const ArrayInput = ({ onArrayChange, currentArray, disabled = false }: ArrayInputProps) => {
  const [inputValue, setInputValue] = useState(currentArray.join(', '));

  const handleInputChange = (value: string) => {
    setInputValue(value);
    
    try {
      // Parse comma-separated numbers
      const numbers = value
        .split(',')
        .map(s => s.trim())
        .filter(s => s !== '')
        .map(s => {
          const num = parseInt(s);
          if (isNaN(num)) throw new Error(`"${s}" is not a valid number`);
          if (num < 0 || num > 999) throw new Error(`Number ${num} must be between 0 and 999`);
          return num;
        });

      if (numbers.length === 0) {
        toast.error("Please enter at least one number");
        return;
      }

      if (numbers.length > 15) {
        toast.error("Maximum 15 numbers allowed for better visualization");
        return;
      }

      onArrayChange(numbers);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Invalid input format");
    }
  };

  const handleSampleSelect = (sampleArray: number[]) => {
    setInputValue(sampleArray.join(', '));
    onArrayChange(sampleArray);
    toast.success("Sample array loaded!");
  };

  const generateRandom = () => {
    const length = 6 + Math.floor(Math.random() * 6); // 6-12 elements
    const randomArray = Array.from(
      { length }, 
      () => Math.floor(Math.random() * 99) + 1
    );
    setInputValue(randomArray.join(', '));
    onArrayChange(randomArray);
    toast.success("Random array generated!");
  };

  return (
    <div className="glass-card p-6 rounded-xl space-y-6">
      <div>
        <Label htmlFor="array-input" className="text-base font-semibold mb-3 block">
          Enter Array Elements
        </Label>
        <div className="flex gap-3">
          <Input
            id="array-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={(e) => handleInputChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleInputChange(inputValue)}
            placeholder="Enter numbers separated by commas (e.g., 64, 34, 25, 12)"
            className="input-glow"
            disabled={disabled}
          />
          <Button
            onClick={generateRandom}
            className="control-button shrink-0"
            disabled={disabled}
          >
            <Shuffle className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Enter 2-15 numbers between 0-999, separated by commas
        </p>
      </div>

      <div>
        <Label className="text-base font-semibold mb-3 block">
          Or Choose a Sample Array
        </Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {SAMPLE_ARRAYS.map((sample) => (
            <Button
              key={sample.name}
              onClick={() => handleSampleSelect(sample.array)}
              variant="outline"
              className="text-xs p-2 h-auto flex flex-col items-start hover:bg-muted/50"
              disabled={disabled}
            >
              <span className="font-medium">{sample.name}</span>
              <span className="text-muted-foreground text-xs">
                [{sample.array.slice(0, 4).join(', ')}{sample.array.length > 4 ? '...' : ''}]
              </span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};