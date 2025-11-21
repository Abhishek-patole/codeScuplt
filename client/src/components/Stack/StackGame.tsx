import React, { useState, useCallback, useRef, useEffect } from 'react';
import { StackElement } from './StackElement';
import { OperationPanel } from './OperationPanel';
import { ConceptsPanel } from './ConceptsPanel';
import { toast } from 'sonner';
import "@/styles/stack.css"

interface StackItem {
  id: string;
  value: string | number;
  isAnimating: boolean;
  animationType?: 'push' | 'pop';
}

export const StackGame: React.FC = () => {
  const [stack, setStack] = useState<StackItem[]>([]);
  const [maxSize, setMaxSize] = useState(5);
  const [currentOperation, setCurrentOperation] = useState<string>('');
  const [isOperating, setIsOperating] = useState(false);
  const stackContainerRef = useRef<HTMLDivElement>(null);

  // Speech synthesis
  const speak = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      speechSynthesis.speak(utterance);
    }
  }, []);

  // Push operation
  const handlePush = useCallback(async (value: string | number) => {
    if (isOperating) return false;
    
    if (stack.length >= maxSize) {
      const message = `Stack Overflow! Maximum size is ${maxSize}`;
      toast.error(message);
      speak(message);
      return false;
    }

    setIsOperating(true);
    
    const newItem: StackItem = {
      id: `stack_${Date.now()}`,
      value,
      isAnimating: true,
      animationType: 'push',
    };

    setStack(prev => [...prev, newItem]);
    setCurrentOperation(`PUSH(${value}) - O(1)`);
    
    const message = `Pushed ${value} onto the stack`;
    toast.success(message);
    speak(message);

    // Complete animation
    setTimeout(() => {
      setStack(prev => 
        prev.map(item => 
          item.id === newItem.id 
            ? { ...item, isAnimating: false, animationType: undefined }
            : item
        )
      );
      setIsOperating(false);
    }, 800);

    return true;
  }, [stack.length, maxSize, isOperating, speak]);

  // Pop operation
  const handlePop = useCallback(async () => {
    if (isOperating) return null;
    
    if (stack.length === 0) {
      const message = 'Stack Underflow! Cannot pop from empty stack';
      toast.error(message);
      speak(message);
      return null;
    }

    setIsOperating(true);
    const topItem = stack[stack.length - 1];
    const poppedValue = topItem.value;

    // Start pop animation
    setStack(prev => 
      prev.map((item, index) =>
        index === prev.length - 1
          ? { ...item, isAnimating: true, animationType: 'pop' }
          : item
      )
    );

    setCurrentOperation(`POP() = ${poppedValue} - O(1)`);
    
    const message = `Popped ${poppedValue} from the stack`;
    toast.success(message);
    speak(message);

    // Remove element after animation
    setTimeout(() => {
      setStack(prev => prev.slice(0, -1));
      setIsOperating(false);
    }, 600);

    return poppedValue;
  }, [stack, isOperating, speak]);

  // Peek operation
  const handlePeek = useCallback(() => {
    if (stack.length === 0) {
      const message = 'Stack is empty! Nothing to peek';
      toast.warning(message);
      speak(message);
      return null;
    }

    const topValue = stack[stack.length - 1].value;
    setCurrentOperation(`PEEK() = ${topValue} - O(1)`);
    
    const message = `Top element is ${topValue}`;
    toast.info(message);
    speak(message);

    return topValue;
  }, [stack, speak]);

  // Clear operation
  const handleClear = useCallback(() => {
    setStack([]);
    setCurrentOperation('CLEAR - Stack emptied');
    setIsOperating(false);
    
    const message = 'Stack cleared';
    toast.info(message);
    speak(message);
  }, [speak]);

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <h1 className="text-6xl font-bold bg-gradient-text bg-clip-text text-transparent mb-2">
            Stack Master
          </h1>
          <p className="text-lg text-muted-foreground">
            Master the Stack Data Structure Through Interactive Gaming
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Concepts Panel */}
          <div className="lg:col-span-3">
            <ConceptsPanel currentOperation={currentOperation} />
          </div>

          {/* Stack Visualization */}
          <div className="lg:col-span-6">
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-glow-stack">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold bg-gradient-text bg-clip-text text-transparent mb-2">
                  Stack Structure
                </h2>
                <div className="text-sm text-muted-foreground">
                  Size: {stack.length}/{maxSize} • Top: {stack.length > 0 ? stack[stack.length - 1].value : 'Empty'}
                </div>
              </div>

              {/* Stack Container */}
              <div 
                ref={stackContainerRef}
                className="relative h-[500px] mx-auto w-48 bg-gradient-to-t from-border/20 to-transparent rounded-xl border border-border/30 overflow-hidden"
              >
                {/* Stack Base */}
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-stack rounded-b-xl shadow-glow-stack"></div>
                
                {/* Stack Elements */}
                <div className="absolute bottom-2 left-2 right-2 flex flex-col-reverse gap-1 overflow-hidden max-h-[490px]">
                  {stack.map((item, index) => (
                    <StackElement
                      key={item.id}
                      value={item.value}
                      isTop={index === stack.length - 1}
                      isAnimating={item.isAnimating}
                      animationType={item.animationType}
                      position={index}
                    />
                  ))}
                </div>

                {/* Empty State */}
                {stack.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center animate-float">
                      <div className="text-6xl mb-4 opacity-50">📚</div>
                      <p className="text-muted-foreground">Stack is Empty</p>
                      <p className="text-sm text-muted-foreground/70">Push elements to get started</p>
                    </div>
                  </div>
                )}

                {/* Overflow Indicator */}
                {stack.length >= maxSize && (
                  <div className="absolute top-2 left-2 right-2 text-center">
                    <div className="bg-error/20 text-error text-xs px-2 py-1 rounded-full border border-error/30 animate-glow-pulse">
                      Stack Full!
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Operation Panel */}
          <div className="lg:col-span-3">
            <OperationPanel
              onPush={handlePush}
              onPop={handlePop}
              onPeek={handlePeek}
              onClear={handleClear}
              maxSize={maxSize}
              onMaxSizeChange={setMaxSize}
              isOperating={isOperating}
              currentSize={stack.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
};