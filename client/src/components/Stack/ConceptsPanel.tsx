import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Clock, Zap, AlertCircle, CheckCircle } from 'lucide-react';

interface ConceptsPanelProps {
  currentOperation: string;
}

export const ConceptsPanel: React.FC<ConceptsPanelProps> = ({
  currentOperation,
}) => {
  const operations = [
    {
      name: 'PUSH',
      description: 'Adds element to top',
      complexity: 'O(1)',
      icon: '⬆️',
      color: 'bg-gradient-success'
    },
    {
      name: 'POP',
      description: 'Removes top element',
      complexity: 'O(1)',
      icon: '⬇️',
      color: 'bg-gradient-stack'
    },
    {
      name: 'PEEK',
      description: 'Views top element',
      complexity: 'O(1)',
      icon: '👁️',
      color: 'bg-gradient-text'
    },
  ];

  const principles = [
    'Last In, First Out (LIFO)',
    'Access only from top',
    'Constant time operations',
    'Memory efficient',
  ];

  return (
    <div className="space-y-4">
      {/* Current Operation */}
      <Card className="bg-card/50 backdrop-blur-sm border-border shadow-glow-stack">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg bg-gradient-text bg-clip-text text-transparent flex items-center gap-2">
            <Zap className="h-5 w-5 text-stack-top" />
            Current Operation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-secondary/30 rounded-lg p-3 min-h-[60px] flex items-center justify-center">
            <div className="text-center">
              {currentOperation ? (
                <div className="bg-gradient-text bg-clip-text text-transparent font-mono text-sm font-medium">
                  {currentOperation}
                </div>
              ) : (
                <div className="text-muted-foreground text-sm">
                  Perform an operation to see details
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Operations Guide */}
      <Card className="bg-card/50 backdrop-blur-sm border-border shadow-glow-stack">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg bg-gradient-text bg-clip-text text-transparent flex items-center gap-2">
            <Clock className="h-5 w-5 text-stack-top" />
            Time Complexity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {operations.map((op, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-secondary/20 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-lg">{op.icon}</span>
                <div>
                  <div className="font-medium text-sm">{op.name}</div>
                  <div className="text-xs text-muted-foreground">{op.description}</div>
                </div>
              </div>
              <Badge variant="secondary" className="bg-stack-element/20 text-stack-element border-stack-element/30">
                {op.complexity}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Stack Principles */}
      <Card className="bg-card/50 backdrop-blur-sm border-border shadow-glow-stack">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg bg-gradient-text bg-clip-text text-transparent flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-stack-top" />
            Stack Principles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {principles.map((principle, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-gradient-stack"></div>
                <span className="text-muted-foreground">{principle}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <Card className="bg-card/50 backdrop-blur-sm border-border shadow-glow-stack">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg bg-gradient-text bg-clip-text text-transparent flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-stack-top" />
            Game Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex gap-2">
              <span className="text-success">✓</span>
              <span>Use numbers or text as values</span>
            </div>
            <div className="flex gap-2">
              <span className="text-success">✓</span>
              <span>Watch the smooth animations</span>
            </div>
            <div className="flex gap-2">
              <span className="text-warning">⚠</span>
              <span>Avoid stack overflow</span>
            </div>
            <div className="flex gap-2">
              <span className="text-stack-top">🎮</span>
              <span>Listen to voice feedback</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};