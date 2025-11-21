import { useState } from "react";
import { ArrayInput } from "@/components/Sorting/BubbleandBinary/ArrayInput";
import { ArrayVisualization } from "@/components/Sorting/BubbleandBinary/ArrayVisualization";
import { ControlPanel } from "@/components/ControlPanel";

import { useBubbleSort } from "@/hooks/useBubbleSort";
import { toast } from "sonner";

const BubbleSort = () => {
  const [currentArray, setCurrentArray] = useState([64, 34, 25, 12, 22, 11, 90]);
  
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
  } = useBubbleSort(currentArray);

  const handleArrayChange = (newArray: number[]) => {
    setCurrentArray(newArray);
    toast.success(`Array updated with ${newArray.length} elements`);
  };

  const handleReset = () => {
    reset(currentArray);
    toast.info("Algorithm reset to beginning");
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Navigation */}
        {/* <Navigation /> */}
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[hsl(var(--searching))] to-[hsl(var(--target))] bg-clip-text text-transparent">
            Bubble Sort Visualizer
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch the bubble sort algorithm in action! Enter your own array or choose a sample to see how elements bubble up to their correct positions.
          </p>
        </div>

        {/* Array Input */}
        <ArrayInput
          onArrayChange={handleArrayChange}
          currentArray={currentArray}
          disabled={isPlaying}
        />

        {/* Visualization */}
        {currentStep && (
          <ArrayVisualization
            array={currentStep.array}
            comparingIndices={currentStep.comparingIndices}
            swappingIndices={currentStep.swappingIndices}
            sortedIndices={currentStep.sortedIndices}
            iterationNumber={currentStep.iterationNumber}
            isCompleted={isCompleted}
          />
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
              
              {currentStep.iterationNumber > 0 && !isCompleted && (
                <div className="mt-4 text-sm">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 bg-gradient-to-br from-[hsl(var(--comparing))] to-[hsl(var(--comparing)/0.8)] rounded"></div>
                      <span>Comparing</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 bg-gradient-to-br from-[hsl(var(--swapping))] to-[hsl(var(--swapping)/0.8)] rounded"></div>
                      <span>Swapping</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 bg-gradient-to-br from-[hsl(var(--sorted))] to-[hsl(var(--sorted)/0.8)] rounded"></div>
                      <span>Sorted</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Algorithm Explanation */}
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">How Bubble Sort Works</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2 text-[hsl(var(--primary))]">Algorithm Steps:</h4>
              <ol className="space-y-2 text-muted-foreground">
                <li>1. Compare adjacent elements in the array</li>
                <li>2. If they're in the wrong order, swap them</li>
                <li>3. Continue through the entire array</li>
                <li>4. Repeat until no more swaps are needed</li>
                <li>5. The largest elements "bubble up" to the end</li>
              </ol>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-[hsl(var(--secondary))]">Time Complexity:</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><strong>Best Case:</strong> O(n) - when array is already sorted</li>
                <li><strong>Average Case:</strong> O(n²) - random order</li>
                <li><strong>Worst Case:</strong> O(n²) - reverse sorted</li>
                <li><strong>Space Complexity:</strong> O(1) - in-place sorting</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BubbleSort;