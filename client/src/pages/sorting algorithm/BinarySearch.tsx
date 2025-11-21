import { useState } from "react";
import { BinarySearchInput } from "@/components/Sorting/BubbleandBinary/BinarySearchInput";
import { BinarySearchVisualization } from "@/components/Sorting/BubbleandBinary/BinarySearchVisualization";
import { ControlPanel } from "@/components/ControlPanel";

import { useBinarySearch } from "@/hooks/useBinarySearch";
import { toast } from "sonner";

const BinarySearch = () => {
  const [currentArray, setCurrentArray] = useState([1, 3, 5, 7, 9, 11, 13]);
  const [currentTarget, setCurrentTarget] = useState(7);
  
  const {
    currentStep,
    isPlaying,
    isCompleted,
    currentStepIndex,
    totalSteps,
    canGoNext,
    canGoPrevious,
    play,
    pause,
    next,
    previous,
    reset
  } = useBinarySearch(currentArray, currentTarget);

  const handleArrayChange = (newArray: number[]) => {
    const sortedArray = [...newArray].sort((a, b) => a - b);
    setCurrentArray(sortedArray);
    toast.success(`Array updated and sorted with ${sortedArray.length} elements`);
  };

  const handleTargetChange = (newTarget: number) => {
    setCurrentTarget(newTarget);
    toast.success(`Target set to ${newTarget}`);
  };

  const handleReset = () => {
    reset(currentArray, currentTarget);
    toast.info("Binary search reset to beginning");
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Navigation */}
        {/* <Navigation /> */}
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[hsl(var(--searching))] to-[hsl(var(--target))] bg-clip-text text-transparent">
            Binary Search Visualizer
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch the binary search algorithm efficiently find your target! This algorithm works on sorted arrays and eliminates half the search space in each step.
          </p>
        </div>

        {/* Search Configuration */}
        <BinarySearchInput
          onArrayChange={handleArrayChange}
          onTargetChange={handleTargetChange}
          currentArray={currentArray}
          currentTarget={currentTarget}
          disabled={isPlaying}
        />

        {/* Visualization */}
        {currentStep && (
          <BinarySearchVisualization currentStep={currentStep} />
        )}

        {/* Control Panel */}
        <ControlPanel
          isPlaying={isPlaying}
          onPlay={play}
          onPause={pause}
          onNext={next}
          onPrevious={previous}
          onReset={handleReset}
          canGoNext={canGoNext}
          canGoPrevious={canGoPrevious}
          currentStep={currentStepIndex}
          totalSteps={totalSteps}
        />

        {/* Algorithm Info */}
        {currentStep && (
          <div className="glass-card p-6 rounded-xl">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Current Step</h3>
              <p className="text-muted-foreground">{currentStep.description}</p>
              
              {!isCompleted && (
                <div className="mt-4 text-sm">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 bg-gradient-to-br from-[hsl(var(--bounds))] to-[hsl(var(--bounds)/0.8)] rounded border-2 border-[hsl(var(--bounds))]"></div>
                      <span>Search Bounds</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 bg-gradient-to-br from-[hsl(var(--searching))] to-[hsl(var(--searching)/0.8)] rounded"></div>
                      <span>Middle Element</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 bg-gradient-to-br from-[hsl(var(--target))] to-[hsl(var(--target)/0.8)] rounded"></div>
                      <span>Target Value</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 bg-gradient-to-br from-[hsl(var(--eliminated))] to-[hsl(var(--eliminated)/0.6)] rounded opacity-40"></div>
                      <span>Eliminated</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Algorithm Explanation */}
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">How Binary Search Works</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2 text-[hsl(var(--searching))]">Algorithm Steps:</h4>
              <ol className="space-y-2 text-muted-foreground">
                <li>1. Start with the entire sorted array</li>
                <li>2. Find the middle element</li>
                <li>3. Compare middle element with target</li>
                <li>4. If found, return the index</li>
                <li>5. If target is smaller, search left half</li>
                <li>6. If target is larger, search right half</li>
                <li>7. Repeat until found or exhausted</li>
              </ol>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-[hsl(var(--target))]">Time Complexity:</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><strong>Best Case:</strong> O(1) - target is at middle</li>
                <li><strong>Average Case:</strong> O(log n) - logarithmic search</li>
                <li><strong>Worst Case:</strong> O(log n) - target at edge</li>
                <li><strong>Space Complexity:</strong> O(1) - constant space</li>
                <li><strong>Prerequisite:</strong> Array must be sorted</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinarySearch;