import { cn } from "@/lib/utils";

interface ArrayElementProps {
  value: number | string;
  index: number;
  isActive?: boolean;
  isHighlighted?: boolean;
  operation?: 'insert' | 'delete' | 'update' | null;
  className?: string;
}

export const ArrayElement = ({ 
  value, 
  index, 
  isActive = false, 
  isHighlighted = false,
  operation = null,
  className 
}: ArrayElementProps) => {
  const getElementStyles = () => {
    if (operation === 'insert') return "bg-gradient-success animate-array-pulse border-arrayElement-success";
    if (operation === 'delete') return "bg-destructive animate-array-pulse border-arrayElement-error";
    if (operation === 'update') return "bg-gradient-accent animate-array-pulse border-arrayElement-warning";
    if (isActive) return "bg-gradient-primary animate-array-glow border-arrayElement-active";
    if (isHighlighted) return "bg-gradient-secondary border-arrayElement-active";
    return "bg-gradient-array border-arrayElement";
  };

  return (
    <div className="flex flex-col items-center gap-2 animate-array-in">
      <div
        className={cn(
          "relative flex items-center justify-center",
          "w-16 h-16 rounded-lg border-2",
          "text-lg font-bold text-foreground",
          "transition-all duration-300",
          "shadow-element hover:scale-105",
          "glass-morphism",
          getElementStyles(),
          className
        )}
      >
        {value}
        {isActive && (
          <div className="absolute -inset-0.5 bg-gradient-primary rounded-lg opacity-75 blur-sm -z-10" />
        )}
      </div>
      <div className="text-xs text-muted-foreground font-mono">
        [{index}]
      </div>
    </div>
  );
};