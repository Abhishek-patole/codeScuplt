import React from 'react';

interface ArrowProps {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  isActive?: boolean;
  label?: string;
  color?: 'primary' | 'secondary';
  isCircular?: boolean;
}

export const Arrow: React.FC<ArrowProps> = ({
  fromX,
  fromY,
  toX,
  toY,
  isActive = false,
  label,
  color = 'primary',
  isCircular = false
}) => {
  const getArrowColor = () => {
    if (isActive) {
      return color === 'secondary' ? 'hsl(var(--secondary-hover))' : 'hsl(var(--arrow-active))';
    }
    return color === 'secondary' ? 'hsl(var(--secondary))' : 'hsl(var(--arrow))';
  };

  const strokeWidth = isActive ? 3 : 2;
  const opacity = isActive ? 1 : 0.8;

  // Calculate arrow head
  const angle = Math.atan2(toY - fromY, toX - fromX);
  const arrowLength = 10;
  const arrowAngle = Math.PI / 6;

  const arrowHead1X = toX - arrowLength * Math.cos(angle - arrowAngle);
  const arrowHead1Y = toY - arrowLength * Math.sin(angle - arrowAngle);
  const arrowHead2X = toX - arrowLength * Math.cos(angle + arrowAngle);
  const arrowHead2Y = toY - arrowLength * Math.sin(angle + arrowAngle);

  return (
    <g className={`transition-all duration-500 ${isActive ? 'animate-pulse' : ''}`}>
      {/* Gradient and Filter Definitions */}
      <defs>
        <linearGradient id={`arrowGradient-${fromX}-${fromY}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={
            isActive ? "hsl(var(--primary))" : 
            color === 'secondary' ? "hsl(var(--secondary))" : 
            "hsl(var(--muted-foreground))"
          } />
          <stop offset="100%" stopColor={
            isActive ? "hsl(var(--primary)/0.7)" : 
            color === 'secondary' ? "hsl(var(--secondary)/0.7)" : 
            "hsl(var(--muted-foreground)/0.7)"
          } />
        </linearGradient>
        <filter id={`arrowGlow-${fromX}-${fromY}`}>
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <marker
          id={`arrowhead-${fromX}-${fromY}`}
          markerWidth="12"
          markerHeight="8" 
          refX="11"
          refY="4"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <polygon
            points="0,0 0,8 12,4"
            fill={`url(#arrowGradient-${fromX}-${fromY})`}
            filter={isActive ? `url(#arrowGlow-${fromX}-${fromY})` : ''}
          />
        </marker>
      </defs>

      {isCircular ? (
        // Circular arrow with gradient
        <>
          <path
            d={`M ${fromX} ${fromY} Q ${(fromX + toX) / 2} ${Math.min(fromY, toY) - 80} ${toX} ${toY}`}
            fill="none"
            stroke={`url(#arrowGradient-${fromX}-${fromY})`}
            strokeWidth={isActive ? "4" : "2"}
            markerEnd={`url(#arrowhead-${fromX}-${fromY})`}
            filter={isActive ? `url(#arrowGlow-${fromX}-${fromY})` : ''}
            className="drop-shadow-sm"
          />
          {label && (
            <g>
              <rect
                x={(fromX + toX) / 2 - 15}
                y={Math.min(fromY, toY) - 90}
                width={30}
                height={16}
                rx="8"
                fill={isActive ? "hsl(var(--primary)/0.9)" : "hsl(var(--background)/0.9)"}
                stroke={isActive ? "hsl(var(--primary))" : "hsl(var(--border))"}
                strokeWidth="1"
                className="drop-shadow-sm"
              />
              <text
                x={(fromX + toX) / 2}
                y={Math.min(fromY, toY) - 82}
                textAnchor="middle"
                fontSize="9"
                fontWeight="700"
                fill={isActive ? "white" : "hsl(var(--muted-foreground))"}
                className="pointer-events-none"
              >
                {label}
              </text>
            </g>
          )}
        </>
      ) : (
        // Regular arrow with gradient
        <>
          <line
            x1={fromX}
            y1={fromY}
            x2={toX}
            y2={toY}
            stroke={`url(#arrowGradient-${fromX}-${fromY})`}
            strokeWidth={isActive ? "4" : "2"}
            markerEnd={`url(#arrowhead-${fromX}-${fromY})`}
            filter={isActive ? `url(#arrowGlow-${fromX}-${fromY})` : ''}
            className="drop-shadow-sm"
          />

          {/* Label with Background */}
          {label && (
            <g>
              <rect
                x={(fromX + toX) / 2 - 15}
                y={(fromY + toY) / 2 - 16}
                width={30}
                height={16}
                rx="8"
                fill={isActive ? "hsl(var(--primary)/0.9)" : "hsl(var(--background)/0.9)"}
                stroke={isActive ? "hsl(var(--primary))" : "hsl(var(--border))"}
                strokeWidth="1"
                className="drop-shadow-sm"
              />
              <text
                x={(fromX + toX) / 2}
                y={(fromY + toY) / 2 - 6}
                textAnchor="middle"
                fontSize="9"
                fontWeight="700"
                fill={isActive ? "white" : "hsl(var(--muted-foreground))"}
                className="pointer-events-none"
              >
                {label}
              </text>
            </g>
          )}
        </>
      )}
    </g>
  );
};