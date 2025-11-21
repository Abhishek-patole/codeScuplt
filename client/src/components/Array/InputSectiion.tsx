import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, Edit3, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputSectionProps {
  onArrayChange: (newArray: number[]) => void;
  onInsert: (index: number, value: number) => void;
  onDelete: (index: number) => void;
  onUpdate: (index: number, value: number) => void;
  currentArray: number[];
  className?: string;
}

const SAMPLE_ARRAYS = [
  { name: "Basic", values: [1, 2, 3, 4, 5] },
  { name: "Random", values: [7, 2, 9, 1, 5, 3, 8] },
  { name: "Sorted", values: [1, 3, 5, 7, 9, 11] },
  { name: "Reverse", values: [10, 8, 6, 4, 2] },
  { name: "Large", values: [15, 23, 8, 42, 16, 4, 35, 19] }
];

export const InputSection = ({
  onArrayChange,
  onInsert,
  onDelete,
  onUpdate,
  currentArray,
  className
}: InputSectionProps) => {
  const [customInput, setCustomInput] = useState("");
  const [insertIndex, setInsertIndex] = useState("");
  const [insertValue, setInsertValue] = useState("");
  const [updateIndex, setUpdateIndex] = useState("");
  const [updateValue, setUpdateValue] = useState("");

  const handleCustomArray = () => {
    try {
      const values = customInput
        .split(",")
        .map(v => parseInt(v.trim()))
        .filter(v => !isNaN(v));
      
      if (values.length > 0) {
        onArrayChange(values);
        setCustomInput("");
      }
    } catch (error) {
      console.error("Invalid array input");
    }
  };

  const handleInsert = () => {
    const idx = parseInt(insertIndex);
    const val = parseInt(insertValue);
    if (!isNaN(idx) && !isNaN(val) && idx >= 0 && idx <= currentArray.length) {
      onInsert(idx, val);
      setInsertIndex("");
      setInsertValue("");
    }
  };

  const handleDelete = () => {
    const idx = parseInt(insertIndex);
    if (!isNaN(idx) && idx >= 0 && idx < currentArray.length) {
      onDelete(idx);
      setInsertIndex("");
    }
  };

  const handleUpdate = () => {
    const idx = parseInt(updateIndex);
    const val = parseInt(updateValue);
    if (!isNaN(idx) && !isNaN(val) && idx >= 0 && idx < currentArray.length) {
      onUpdate(idx, val);
      setUpdateIndex("");
      setUpdateValue("");
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Sample Arrays */}
      <div className="glass-morphism rounded-2xl p-6 shadow-element">
        <h3 className="text-lg font-semibold mb-4 bg-gradient-secondary bg-clip-text text-transparent">
          Sample Arrays
        </h3>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_ARRAYS.map((sample) => (
            <Badge
              key={sample.name}
              variant="outline"
              className="cursor-pointer hover:bg-primary/10 hover:border-primary transition-colors p-2"
              onClick={() => onArrayChange(sample.values)}
            >
              {sample.name}: [{sample.values.join(", ")}]
            </Badge>
          ))}
        </div>
      </div>

      {/* Custom Array Input */}
      <div className="glass-morphism rounded-2xl p-6 shadow-element">
        <h3 className="text-lg font-semibold mb-4 bg-gradient-accent bg-clip-text text-transparent">
          Custom Array
        </h3>
        <div className="flex gap-3">
          <div className="flex-1">
            <Label htmlFor="custom-array" className="sr-only">Custom Array</Label>
            <Input
              id="custom-array"
              placeholder="Enter numbers separated by commas (e.g., 1,2,3,4,5)"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              className="bg-muted/50"
            />
          </div>
          <Button 
            onClick={handleCustomArray}
            className="bg-gradient-accent hover:opacity-90"
            disabled={!customInput.trim()}
          >
            Create Array
          </Button>
        </div>
      </div>

      {/* Array Operations */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Insert/Delete Operations */}
        <div className="glass-morphism rounded-2xl p-6 shadow-element">
          <h3 className="text-lg font-semibold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Insert / Delete
          </h3>
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="Index"
                value={insertIndex}
                onChange={(e) => setInsertIndex(e.target.value)}
                className="w-20 bg-muted/50"
              />
              <Input
                placeholder="Value"
                value={insertValue}
                onChange={(e) => setInsertValue(e.target.value)}
                className="flex-1 bg-muted/50"
              />
              <Button
                size="sm"
                onClick={handleInsert}
                className="bg-gradient-success hover:opacity-90"
                disabled={!insertIndex || !insertValue}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              disabled={!insertIndex || currentArray.length === 0}
              className="w-full"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete at Index {insertIndex || "?"}
            </Button>
          </div>
        </div>

        {/* Update Operation */}
        <div className="glass-morphism rounded-2xl p-6 shadow-element">
          <h3 className="text-lg font-semibold mb-4 bg-gradient-secondary bg-clip-text text-transparent">
            Update Element
          </h3>
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="Index"
                value={updateIndex}
                onChange={(e) => setUpdateIndex(e.target.value)}
                className="w-20 bg-muted/50"
              />
              <Input
                placeholder="New Value"
                value={updateValue}
                onChange={(e) => setUpdateValue(e.target.value)}
                className="flex-1 bg-muted/50"
              />
            </div>
            <Button
              size="sm"
              onClick={handleUpdate}
              className="w-full bg-gradient-accent hover:opacity-90"
              disabled={!updateIndex || !updateValue || currentArray.length === 0}
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Update
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};