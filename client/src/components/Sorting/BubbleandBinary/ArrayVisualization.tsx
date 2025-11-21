
import {ArrayElement} from './ArrayElement'

interface ArrayVisualizationProps {
  array: number[];
  comparingIndices: number[];
  swappingIndices: number[];
  sortedIndices: number[];
  iterationNumber: number;
  isCompleted: boolean;
}

export const ArrayVisualization = ({
  array,
  comparingIndices,
  swappingIndices,
  sortedIndices,
  iterationNumber,
  isCompleted
}: ArrayVisualizationProps) => {
  
  const getElementState = (index: number) => {
    if (isCompleted || sortedIndices.includes(index)) return 'sorted';
    if (swappingIndices.includes(index)) return 'swapping';
    if (comparingIndices.includes(index)) return 'comparing';
    return 'unsorted';
  };

  return (
    <div className="glass-card p-6 rounded-xl animate-fade-in-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          {isCompleted ? '🎉 Sorting Complete!' : `Iteration ${iterationNumber}`}
        </h3>
        {!isCompleted && (
          <div className="text-sm text-muted-foreground">
            Comparing elements and moving larger ones to the right
          </div>
        )}
      </div>
      
      <div className="flex flex-wrap gap-3 justify-center min-h-[80px] items-center">
        {array.map((value, index) => (
          <ArrayElement
            key={`${iterationNumber}-${index}`}
            value={value}
            state={getElementState(index)}
            index={index}
            isAnimating={swappingIndices.includes(index)}
          />
        ))}
      </div>
      
      {isCompleted && (
        <div className="mt-4 text-center">
          <p className="text-sorted font-medium">
            ✨ Array sorted successfully in {iterationNumber} iterations!
          </p>
        </div>
      )}
    </div>
  );
};