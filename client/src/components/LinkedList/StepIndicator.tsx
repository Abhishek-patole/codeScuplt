import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AnimationStep } from '@/types/linkedList';
import { 
  CheckCircle, 
  Circle, 
  Clock,
  ArrowRight,
  Plus,
  Minus,
  Search,
  Eye,
  Zap
} from 'lucide-react';

interface StepIndicatorProps {
  steps: AnimationStep[];
  currentStep: number;
}

const getStepIcon = (action: AnimationStep['action']) => {
  switch (action) {
    case 'create':
      return Plus;
    case 'delete':
      return Minus;
    case 'connect':
      return ArrowRight;
    case 'traverse':
      return Eye;
    case 'highlight':
      return Zap;
    case 'move':
      return ArrowRight;
    default:
      return Circle;
  }
};

const getStepColor = (action: AnimationStep['action']) => {
  switch (action) {
    case 'create':
      return 'bg-success/10 text-success border-success/20';
    case 'delete':
      return 'bg-destructive/10 text-destructive border-destructive/20';
    case 'connect':
      return 'bg-primary/10 text-primary border-primary/20';
    case 'traverse':
      return 'bg-secondary/10 text-secondary border-secondary/20';
    case 'highlight':
      return 'bg-warning/10 text-warning border-warning/20';
    case 'move':
      return 'bg-primary/10 text-primary border-primary/20';
    default:
      return 'bg-muted/10 text-muted-foreground border-muted/20';
  }
};

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep
}) => {
  if (steps.length === 0) {
    return (
      <Card className="p-6 bg-card border-border shadow-medium">
        <div className="text-center text-muted-foreground">
          <Clock className="h-8 w-8 mx-auto mb-3 opacity-50" />
          <p>No animation steps to display</p>
        </div>
      </Card>
    );
  }

  const currentStepData = currentStep >= 0 ? steps[currentStep] : null;

  return (
    <Card className="p-6 bg-card border-border shadow-medium space-y-4">
      {/* Current Step Highlight */}
      {currentStepData && (
        <div className="bg-gradient-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">{currentStep + 1}</span>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Current Step</h3>
              <p className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </p>
            </div>
          </div>
          <p className="text-foreground font-medium ml-11">
            {currentStepData.description}
          </p>
        </div>
      )}

      {/* All Steps Overview */}
      <div className="space-y-3">
        <h4 className="font-semibold text-foreground flex items-center gap-2">
          <Eye className="h-4 w-4" />
          Animation Steps Overview
        </h4>
        
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {steps.map((step, index) => {
            const Icon = getStepIcon(step.action);
            const isCompleted = index <= currentStep;
            const isCurrent = index === currentStep;
            const colorClass = getStepColor(step.action);
            
            return (
              <div
                key={step.id}
                className={`
                  flex items-center gap-3 p-3 rounded-lg border transition-all duration-normal
                  ${isCurrent 
                    ? 'bg-primary/5 border-primary/30 shadow-sm' 
                    : isCompleted 
                      ? 'bg-success/5 border-success/20' 
                      : 'bg-muted/20 border-border'
                  }
                `}
              >
                {/* Step Status Icon */}
                <div className="flex-shrink-0">
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5 text-success" />
                  ) : isCurrent ? (
                    <div className="w-5 h-5 bg-primary rounded-full animate-pulse" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>

                {/* Step Number */}
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                  ${isCurrent 
                    ? 'bg-primary text-white' 
                    : isCompleted 
                      ? 'bg-success text-white' 
                      : 'bg-muted text-muted-foreground'
                  }
                `}>
                  {index + 1}
                </div>

                {/* Step Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={`text-xs ${colorClass}`}>
                      <Icon className="h-3 w-3 mr-1" />
                      {step.action.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {step.duration}ms
                    </span>
                  </div>
                  <p className={`text-sm ${
                    isCurrent ? 'text-foreground font-medium' : 
                    isCompleted ? 'text-muted-foreground' : 'text-muted-foreground/70'
                  }`}>
                    {step.description}
                  </p>
                </div>

                {/* Current Step Indicator */}
                {isCurrent && (
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Summary */}
      <div className="bg-muted/30 rounded-lg p-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Progress: {currentStep + 1} / {steps.length} steps
          </span>
          <span className="font-medium text-foreground">
            {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
          </span>
        </div>
      </div>
    </Card>
  );
};