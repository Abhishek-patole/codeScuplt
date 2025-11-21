import { cn } from "@/lib/utils";

interface BinarySearchElementProps {
  value: number;
  index: number;
  state: 'normal' | 'searching' | 'target' | 'found' | 'eliminated' | 'bounds';
  isLeft?: boolean;
  isRight?: boolean;
  isMiddle?: boolean;
  target?: number;
}

export const BinarySearchElement = ({ 
  value, 
  index, 
  state, 
  isLeft = false,
  isRight = false,
  isMiddle = false,
  target
}: BinarySearchElementProps) => {
  const isTarget = target !== undefined && value === target;
  
  return (
    <div className="relative">
      {/* Search bounds indicator */}
      {(isLeft || isRight) && (
        <div className={cn(
          "absolute -top-6 text-xs font-bold",
          "text-[hsl(var(--bounds))]",
          isLeft && "left-0",
          isRight && "right-0"
        )}>
          {isLeft ? 'L' : 'R'}
        </div>
      )}
      
      {/* Middle indicator */}
      {isMiddle && (
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-[hsl(var(--searching))]">
          M
        </div>
      )}
      
      <div
        className={cn(
          "array-element",
          "w-16 h-16 rounded-lg flex items-center justify-center",
          "font-bold text-lg text-white relative",
          "transition-all duration-700 ease-in-out",
          // Apply target highlighting first if it's the target value
          isTarget && state !== 'found' && "target",
          // Then apply the main state
          state,
          // Add bounds styling for left/right boundaries
          (isLeft || isRight) && "bounds"
        )}
        style={{
          animationDelay: `${index * 100}ms`
        }}
      >
        {value}
        
        {/* Special effects for middle element */}
        {isMiddle && state === 'searching' && (
          <div className="absolute -inset-1 rounded-lg border-2 border-[hsl(var(--searching))] animate-pulse" />
        )}
        
        {/* Index display */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground">
          {index}
        </div>
      </div>
    </div>
  );
};