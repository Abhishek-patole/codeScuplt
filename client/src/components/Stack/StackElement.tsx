import React from 'react';

interface StackElementProps {
  value: string | number;
  isTop: boolean;
  isAnimating: boolean;
  animationType?: 'push' | 'pop';
  position: number;
}

export const StackElement: React.FC<StackElementProps> = ({
  value,
  isTop,
  isAnimating,
  animationType,
  position,
}) => {
  const getElementClasses = () => {
    let classes = 'relative w-full h-12 rounded-lg border-2 flex items-center justify-center font-bold text-lg transition-all duration-300 ';
    
    if (isTop) {
      classes += 'bg-gradient-top border-stack-top shadow-glow-top ';
    } else {
      classes += 'bg-gradient-stack border-stack-element shadow-glow-stack ';
    }

    if (isAnimating) {
      if (animationType === 'push') {
        classes += 'animate-element-push ';
      } else if (animationType === 'pop') {
        classes += 'animate-element-pop ';
      }
    } else {
      classes += 'hover:scale-105 hover:shadow-glow-top ';
    }

    return classes;
  };

  const getTextColor = () => {
    return 'text-white drop-shadow-lg';
  };

  return (
    <div 
      className={getElementClasses()}
      style={{
        zIndex: 100 + position,
        animationDelay: `${position * 0.05}s`,
      }}
    >
      {/* Main Content */}
      <span className={getTextColor()}>
        {value}
      </span>

      {/* Glow Effect */}
      <div 
        className={`absolute inset-0 rounded-lg pointer-events-none ${
          isTop ? 'bg-stack-top/10' : 'bg-stack-element/10'
        } ${!isAnimating ? 'animate-glow-pulse' : ''}`}
      />

      {/* Top Indicator */}
      {isTop && (
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
          <div className="bg-stack-top/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full border border-stack-top/30 animate-float">
            TOP
          </div>
        </div>
      )}

      {/* Shimmer Effect */}
      {!isAnimating && (
        <div 
          className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"
          style={{
            backgroundSize: '200% 100%',
          }}
        />
      )}

      {/* Position Indicator */}
      <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground/50">
        {position}
      </div>
    </div>
  );
};