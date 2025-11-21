import { useState, useEffect } from "react";

interface QueueDisplayProps {
  queue: string[];
  activeElement: string | null;
  frontIndex: number;
  rearIndex: number;
}

export const QueueDisplay = ({ queue, activeElement, frontIndex, rearIndex }: QueueDisplayProps) => {
  const [animatingElements, setAnimatingElements] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (activeElement) {
      setAnimatingElements(prev => new Set([...prev, activeElement]));
      
      // Remove from animating set after animation completes
      const timer = setTimeout(() => {
        setAnimatingElements(prev => {
          const newSet = new Set(prev);
          newSet.delete(activeElement);
          return newSet;
        });
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [activeElement]);

  const getElementPosition = (index: number) => {
    const spacing = 80; // Space between elements
    return index * spacing + 40; // Starting offset
  };

  return (
    <div className="w-full">
      {/* Queue Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-green-500 animate-pulse"></div>
            <span className="text-sm font-bold text-green-400">FRONT</span>
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Realistic Queue System
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-orange-400">REAR</span>
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Main Queue Container - Like a tube/pipe */}
      <div className="relative min-h-[150px] flex items-center justify-center mb-8">
        {queue.length === 0 ? (
          <div className="text-center">
            <div className="queue-tube w-96 h-20 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
              <span className="text-muted-foreground font-medium">Empty Queue - Add elements to see the magic!</span>
            </div>
            <p className="text-sm text-muted-foreground mt-4">Use the controls below to add elements to the queue</p>
          </div>
        ) : (
          <div className="relative">
            {/* Queue Tube/Pipe Background */}
            <div className="queue-tube h-20 flex items-center justify-center relative overflow-hidden"
                 style={{ width: Math.max(400, queue.length * 80 + 120) + 'px' }}>
              
              {/* Entry Point (Rear) */}
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-12 bg-gradient-to-l from-orange-500/30 to-transparent rounded-l-lg">
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 text-orange-400 text-xs font-bold -rotate-90">
                  ENTER
                </div>
              </div>
              
              {/* Exit Point (Front) */}
              <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-6 h-12 bg-gradient-to-r from-green-500/30 to-transparent rounded-r-lg">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 text-green-400 text-xs font-bold rotate-90">
                  EXIT
                </div>
              </div>

              {/* Queue Elements */}
              {queue.map((element, index) => {
                const isActive = activeElement === element;
                const isFront = index === frontIndex;
                const isRear = index === rearIndex;
                
                return (
                  <div
                    key={`${element}-${index}`}
                    className={`queue-element-realistic w-12 h-12 ${
                      animatingElements.has(element) ? 'entering' : ''
                    } ${isActive ? 'active' : ''}`}
                    style={{
                      left: `${getElementPosition(index)}px`,
                      top: '16px',
                      zIndex: queue.length - index
                    }}
                  >
                    {element}
                    
                    {/* Front Indicator */}
                    {isFront && (
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gradient-to-r from-green-400 to-green-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                          FRONT
                        </div>
                      </div>
                    )}
                    
                    {/* Rear Indicator */}
                    {isRear && (
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                          REAR
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Flow Direction Indicator */}
            <div className="flex justify-between items-center mt-4 px-4">
              <div className="text-xs text-green-400 font-medium">← Elements exit here (FIFO)</div>
              <div className="text-xs text-orange-400 font-medium">Elements enter here →</div>
            </div>
          </div>
        )}
      </div>

      {/* Queue Stats */}
      <div className="mt-8 grid grid-cols-3 gap-4 max-w-md mx-auto">
        <div className="text-center p-3 rounded-xl bg-card/30 border border-border/30">
          <div className="text-2xl font-bold text-primary">{queue.length}</div>
          <div className="text-xs text-muted-foreground">Size</div>
        </div>
        <div className="text-center p-3 rounded-xl bg-card/30 border border-border/30">
          <div className="text-2xl font-bold text-green-400">
            {frontIndex >= 0 ? queue[frontIndex] : "—"}
          </div>
          <div className="text-xs text-muted-foreground">Front</div>
        </div>
        <div className="text-center p-3 rounded-xl bg-card/30 border border-border/30">
          <div className="text-2xl font-bold text-orange-400">
            {rearIndex >= 0 ? queue[rearIndex] : "—"}
          </div>
          <div className="text-xs text-muted-foreground">Rear</div>
        </div>
      </div>
    </div>
  );
};