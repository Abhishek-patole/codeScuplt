import { ArrayElement } from "./ArrayElement";
import { cn } from "@/lib/utils";

interface ArrayContainerProps {
  array: (number | string)[];
  activeIndex?: number;
  highlightedIndices?: number[];
  operation?: 'insert' | 'delete' | 'update' | null;
  operationIndex?: number;
  title?: string;
  className?: string;
}

export const ArrayContainer = ({
  array,
  activeIndex = -1,
  highlightedIndices = [],
  operation = null,
  operationIndex = -1,
  title = "Array Visualization",
  className
}: ArrayContainerProps) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          {title}
        </h2>
        <div className="h-1 bg-gradient-primary rounded-full w-32" />
      </div>
      
      <div className="relative">
        {/* Array Container */}
        <div className="glass-morphism rounded-2xl p-8 shadow-card-custom">
          <div className="flex flex-wrap gap-4 justify-center items-center min-h-[100px]">
            {array.length === 0 ? (
              <div className="text-muted-foreground text-lg">
                Array is empty. Add some elements!
              </div>
            ) : (
              array.map((value, index) => (
                <ArrayElement
                  key={`${index}-${value}-${Date.now()}`}
                  value={value}
                  index={index}
                  isActive={activeIndex === index}
                  isHighlighted={highlightedIndices.includes(index)}
                  operation={operationIndex === index ? operation : null}
                />
              ))
            )}
          </div>
        </div>

        {/* Array Info */}
        <div className="mt-4 flex justify-between text-sm text-muted-foreground">
          <span>Length: {array.length}</span>
          <span>Memory: {array.length * 4} bytes (approx.)</span>
        </div>
      </div>
    </div>
  );
};