import { cn } from "@/lib/utils";

interface ArrayElementProps {
  value: number;
  state: 'unsorted' | 'comparing' | 'swapping' | 'sorted';
  index: number;
  isAnimating?: boolean;
}

export const ArrayElement = ({ value, state, index, isAnimating = false }: ArrayElementProps) => {
  return (
    <div
      className={cn(
        "array-element",
        "w-14 h-14 rounded-lg flex items-center justify-center",
        "font-bold text-lg text-white",
        "transition-all duration-500 ease-in-out",
        state,
        isAnimating && "animate-pulse"
      )}
      style={{
        animationDelay: `${index * 50}ms`
      }}
    >
      {value}
    </div>
  );
};