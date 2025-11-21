import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LinkedListType } from '@/types/linkedList';
import { ArrowRight, ArrowLeftRight, RotateCcw, RefreshCw } from 'lucide-react';

interface TypeSelectorProps {
  currentType: LinkedListType;
  onTypeChange: (type: LinkedListType) => void;
  onLoadSample: (type: LinkedListType) => void;
}

const typeConfig = {
  singly: {
    name: 'Singly Linked List',
    description: 'Each node points to the next node',
    icon: ArrowRight,
    gradient: 'bg-gradient-primary'
  },
  doubly: {
    name: 'Doubly Linked List',
    description: 'Each node has pointers to both next and previous nodes',
    icon: ArrowLeftRight,
    gradient: 'bg-gradient-secondary'
  },
  circular: {
    name: 'Circular Linked List',
    description: 'Last node points back to the first node',
    icon: RotateCcw,
    gradient: 'bg-gradient-accent'
  },
  'doubly-circular': {
    name: 'Doubly Circular Linked List',
    description: 'Doubly linked with circular connections',
    icon: RefreshCw,
    gradient: 'bg-gradient-node'
  }
};

export const TypeSelector: React.FC<TypeSelectorProps> = ({
  currentType,
  onTypeChange,
  onLoadSample
}) => {
  const handleTypeSelect = (type: LinkedListType) => {
    onTypeChange(type);
    onLoadSample(type);
  };

  return (
    <Card className="p-6 bg-card border-border shadow-medium">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(typeConfig).map(([type, config]) => {
          const Icon = config.icon;
          const isSelected = currentType === type;
          
          return (
            <Button
              key={type}
              onClick={() => handleTypeSelect(type as LinkedListType)}
              variant={isSelected ? "default" : "outline"}
              className={`
                h-auto p-4 flex-col items-start text-left space-y-2 transition-all duration-normal
                ${isSelected 
                  ? `${config.gradient} text-white shadow-large border-none` 
                  : 'bg-card-accent hover:bg-muted border-border hover:border-primary/30'
                }
              `}
            >
              <div className="flex items-center gap-3 w-full">
                <Icon className={`h-5 w-5 ${isSelected ? 'text-white' : 'text-primary'}`} />
                <span className="font-semibold text-base">
                  {config.name}
                </span>
              </div>
              <p className={`text-sm leading-relaxed ${
                isSelected ? 'text-white/90' : 'text-muted-foreground'
              }`}>
                {config.description}
              </p>
            </Button>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-border/50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Current Selection:</p>
            <p className="font-medium text-foreground">
              {typeConfig[currentType].name}
            </p>
          </div>
          <Button
            onClick={() => onLoadSample(currentType)}
            variant="outline"
            className="bg-gradient-accent text-white border-none hover:opacity-90"
          >
            Load Sample Data
          </Button>
        </div>
      </div>
    </Card>
  );
};