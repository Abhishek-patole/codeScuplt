import { BinarySearchElement } from "./BinarySearchElement";
import { SearchStep } from "@/hooks/useBinarySearch";
import "@/styles/bubblesort.css"

interface BinarySearchVisualizationProps {
  currentStep: SearchStep;
}

export const BinarySearchVisualization = ({ currentStep }: BinarySearchVisualizationProps) => {
  if (!currentStep) return null;

  const {
    array,
    target,
    left,
    right,
    middle,
    searchingIndex,
    eliminatedIndices,
    foundIndex,
    isCompleted,
    isFound
  } = currentStep;

  const getElementState = (index: number) => {
    if (foundIndex === index) return 'found';
    if (eliminatedIndices.includes(index)) return 'eliminated';
    if (searchingIndex === index) return 'searching';
    return 'normal';
  };

  return (
    <div className="glass-card p-8 rounded-xl animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">
            {isCompleted ? (
              isFound ? '🎉 Target Found!' : '❌ Target Not Found'
            ) : (
              `Searching for ${target}`
            )}
          </h3>
          {!isCompleted && (
            <div className="text-sm text-muted-foreground">
              Current search bounds: [{left}, {right}]
              {middle !== null && ` | Middle: ${middle}`}
            </div>
          )}
        </div>
        
        {/* Target display */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Target:</span>
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[hsl(var(--target))] to-[hsl(var(--target)/0.8)] flex items-center justify-center font-bold text-white shadow-lg">
            {target}
          </div>
        </div>
      </div>

      {/* Search bounds indicator */}
      {/* {!isCompleted && left <= right && (
        <div className="relative mb-4">
          <div 
            className="search-bounds"
            style={{
              left: `${(left / array.length) * 100}%`,
              width: `${((right - left + 1) / array.length) * 100}%`
            }}
          />
        </div>
      )} */}
      
      {/* Array visualization */}
      <div className="flex flex-wrap gap-4 justify-center min-h-[100px] items-center relative">
        {array.map((value, index) => (
          <BinarySearchElement
            key={`search-${index}`}
            value={value}
            index={index}
            state={getElementState(index)}
            isLeft={index === left && !isCompleted}
            isRight={index === right && !isCompleted}
            isMiddle={index === middle}
            target={target}
          />
        ))}
      </div>
      
      {/* Results */}
      {isCompleted && (
        <div className="mt-6 text-center">
          {isFound ? (
            <div className="space-y-2">
              <p className="text-[hsl(var(--found))] font-medium text-lg">
                ✨ Found {target} at index {foundIndex}!
              </p>
              <p className="text-sm text-muted-foreground">
                Search completed in {currentStep.stepNumber} steps
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-[hsl(var(--eliminated))] font-medium text-lg">
                Target {target} is not in the array
              </p>
              <p className="text-sm text-muted-foreground">
                Exhausted all possibilities in {currentStep.stepNumber} steps
              </p>
            </div>
          )}
        </div>
      )}
      
      {/* Legend */}
      {!isCompleted && (
        <div className="mt-6 border-t border-[hsl(var(--border))] pt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-br from-[hsl(var(--bounds))] to-[hsl(var(--bounds)/0.8)] rounded border-2 border-[hsl(var(--bounds))]"></div>
              <span>Bounds (L/R)</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-br from-[hsl(var(--searching))] to-[hsl(var(--searching)/0.8)] rounded"></div>
              <span>Searching (M)</span>
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
  );
};