import React from 'react';

interface NodeProps {
  x: number;
  y: number;
  value: number;
  isActive?: boolean;
  isNew?: boolean;
  isBeingDeleted?: boolean;
  showPointers?: boolean;
  animate?: boolean;
}

export const Node: React.FC<NodeProps> = ({
  x,
  y,
  value,
  isActive = false,
  isNew = false,
  isBeingDeleted = false,
  showPointers = false,
  animate = false
}) => {
  const getNodeColor = () => {
    if (isBeingDeleted) return 'hsl(var(--node-delete))';
    if (isNew) return 'hsl(var(--node-new))';
    if (isActive) return 'hsl(var(--node-active))';
    return 'hsl(var(--node-default))';
  };

  const getTextColor = () => {
    if (isBeingDeleted) return 'hsl(var(--node-delete-foreground))';
    if (isNew) return 'hsl(var(--node-new-foreground))';
    if (isActive) return 'hsl(var(--node-active-foreground))';
    return 'hsl(var(--node-default-foreground))';
  };

  const getShadow = () => {
    if (isActive) return '0 0 20px hsl(var(--node-active) / 0.5)';
    if (isNew) return '0 0 15px hsl(var(--node-new) / 0.4)';
    return 'var(--shadow-node)';
  };

  return (
    <g 
      className={`
        ${animate ? 'transition-all duration-slow' : ''}
        ${isNew ? 'animate-scale-in' : ''}
        ${isBeingDeleted ? 'animate-scale-out' : ''}
        ${isActive ? 'animate-pulse' : ''}
      `}
    >
      {/* Gradient and Shadow Definitions */}
      <defs>
        <linearGradient id={`nodeGradient-${x}-${y}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={
            isNew ? "hsl(var(--success))" : 
            isActive ? "hsl(var(--primary))" : 
            isBeingDeleted ? "hsl(var(--destructive))" : 
            "hsl(var(--card))"
          } />
          <stop offset="100%" stopColor={
            isNew ? "hsl(var(--success)/0.8)" : 
            isActive ? "hsl(var(--primary)/0.8)" : 
            isBeingDeleted ? "hsl(var(--destructive)/0.8)" : 
            "hsl(var(--muted))"
          } />
        </linearGradient>
        <filter id={`nodeShadow-${x}-${y}`}>
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor={
            isActive || isNew ? "hsl(var(--primary)/0.3)" : 
            isBeingDeleted ? "hsl(var(--destructive)/0.3)" : 
            "hsl(var(--shadow)/0.1)"
          } />
        </filter>
        <filter id={`nodeGlow-${x}-${y}`}>
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Main node body with gradient */}
      <rect
        x={x}
        y={y}
        width="80"
        height="50"
        rx="12"
        fill={`url(#nodeGradient-${x}-${y})`}
        stroke={isActive || isNew ? "hsl(var(--primary))" : 
                isBeingDeleted ? "hsl(var(--destructive))" : 
                "hsl(var(--border))"}
        strokeWidth={isActive || isNew || isBeingDeleted ? "3" : "2"}
        filter={`url(#nodeShadow-${x}-${y})`}
        className="transition-all duration-500"
      />

      {/* Glow effect for active nodes */}
      {(isActive || isNew) && (
        <rect
          x={x}
          y={y}
          width="80"
          height="50"
          rx="12"
          fill="none"
          stroke={isActive ? "hsl(var(--primary)/0.6)" : "hsl(var(--success)/0.6)"}
          strokeWidth="6"
          filter={`url(#nodeGlow-${x}-${y})`}
          className="animate-pulse"
        />
      )}
      
      {/* Node value */}
      <text
        x={x + 40}
        y={y + 30}
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={
          isNew ? "white" : 
          isActive ? "white" : 
          isBeingDeleted ? "white" : 
          "hsl(var(--foreground))"
        }
        className="transition-all duration-normal drop-shadow-sm"
      >
        {value}
      </text>

      {/* Pointer section for singly linked lists */}
      {!showPointers && (
        <>
          <line
            x1={x + 60}
            y1={y}
            x2={x + 60}
            y2={y + 50}
            stroke="hsl(var(--border))"
            strokeWidth="2"
          />
          <text
            x={x + 70}
            y={y + 15}
            textAnchor="middle"
            fontSize="10"
            fill="hsl(var(--muted-foreground))"
            fontWeight="600"
          >
            next
          </text>
        </>
      )}

      {/* Pointer sections for doubly linked lists */}
      {showPointers && (
        <>
          {/* Previous pointer section */}
          <line
            x1={x + 20}
            y1={y}
            x2={x + 20}
            y2={y + 50}
            stroke="hsl(var(--border))"
            strokeWidth="2"
          />
          <text
            x={x + 10}
            y={y + 15}
            textAnchor="middle"
            fontSize="9"
            fill="hsl(var(--muted-foreground))"
            fontWeight="600"
          >
            prev
          </text>

          {/* Next pointer section */}
          <line
            x1={x + 60}
            y1={y}
            x2={x + 60}
            y2={y + 50}
            stroke="hsl(var(--border))"
            strokeWidth="2"
          />
          <text
            x={x + 70}
            y={y + 15}
            textAnchor="middle"
            fontSize="9"
            fill="hsl(var(--muted-foreground))"
            fontWeight="600"
          >
            next
          </text>
        </>
      )}

      {/* Active indicator */}
      {isActive && (
        <circle
          cx={x + 85}
          cy={y - 5}
          r="4"
          fill="hsl(var(--primary))"
          className="animate-pulse"
        />
      )}

      {/* New node indicator */}
      {isNew && (
        <rect
          x={x - 5}
          y={y - 5}
          width="90"
          height="60"
          rx="10"
          fill="none"
          stroke="hsl(var(--node-new))"
          strokeWidth="3"
          strokeDasharray="5,5"
          className="animate-pulse"
        />
      )}
    </g>
  );
};