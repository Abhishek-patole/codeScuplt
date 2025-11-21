import React from 'react';

interface PointerProps {
  x: number;
  y: number;
  label: string;
  isActive?: boolean;
  color?: 'primary' | 'secondary' | 'warning';
}

export const Pointer: React.FC<PointerProps> = ({
  x,
  y,
  label,
  isActive = false,
  color = 'primary'
}) => {
  const getPointerColor = () => {
    switch (color) {
      case 'secondary':
        return isActive ? 'hsl(var(--secondary-hover))' : 'hsl(var(--secondary))';
      case 'warning':
        return isActive ? 'hsl(var(--warning))' : 'hsl(var(--pointer))';
      default:
        return isActive ? 'hsl(var(--pointer-active))' : 'hsl(var(--pointer))';
    }
  };

  const getBgColor = () => {
    switch (color) {
      case 'secondary':
        return 'hsl(var(--secondary) / 0.1)';
      case 'warning':
        return 'hsl(var(--warning) / 0.1)';
      default:
        return 'hsl(var(--primary) / 0.1)';
    }
  };

  return (
    <g 
      className={`
        ${isActive ? 'animate-node-bounce' : ''}
        transition-all duration-normal
      `}
    >
      {/* Pointer box */}
      <rect
        x={x + 20}
        y={y}
        width={label.length * 8 + 16}
        height="24"
        rx="6"
        fill={getBgColor()}
        stroke={getPointerColor()}
        strokeWidth={isActive ? 3 : 2}
        className={isActive ? 'animate-pulse' : ''}
      />
      
      {/* Pointer text */}
      <text
        x={x + 28 + (label.length * 4)}
        y={y + 16}
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={getPointerColor()}
      >
        {label}
      </text>
      
      {/* Arrow pointing down to node */}
      <line
        x1={x + 28 + (label.length * 4)}
        y1={y + 24}
        x2={x + 40}
        y2={y + 40}
        stroke={getPointerColor()}
        strokeWidth={isActive ? 3 : 2}
        markerEnd="url(#arrowhead)"
      />
      
      {/* Arrow head definition */}
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill={getPointerColor()}
          />
        </marker>
      </defs>
      
      {/* Active glow effect */}
      {isActive && (
        <rect
          x={x + 15}
          y={y - 5}
          width={label.length * 8 + 26}
          height="34"
          rx="10"
          fill="none"
          stroke={getPointerColor()}
          strokeWidth="1"
          opacity="0.5"
          className="animate-pulse"
        />
      )}
    </g>
  );
};