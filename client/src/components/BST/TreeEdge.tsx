import React from 'react';
import { BSTNode } from '@/utils/bst';

interface TreeEdgeProps {
  from: BSTNode;
  to: BSTNode;
  isActive?: boolean;
}

export const TreeEdge: React.FC<TreeEdgeProps> = ({ from, to, isActive = false }) => {
  if (!from.x || !from.y || !to.x || !to.y) return null;

  // Calculate the connection points on the edge of the circles
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  // Normalize the direction vector
  const unitX = dx / distance;
  const unitY = dy / distance;
  
  // Node radius
  const radius = 24;
  
  // Calculate start and end points on circle edges
  const startX = from.x + unitX * radius;
  const startY = from.y + unitY * radius;
  const endX = to.x - unitX * radius;
  const endY = to.y - unitY * radius;

  return (
    <g>
      {/* Edge glow effect */}
      {isActive && (
        <line
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          className="bst-edge--active animate-edge-glow"
          strokeLinecap="round"
        />
      )}
      
      {/* Main edge */}
      <line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        className={isActive ? 'bst-edge--active' : 'bst-edge'}
        strokeLinecap="round"
      />
      
      {/* Arrowhead */}
      <defs>
        <marker
          id={isActive ? "arrowhead-active" : "arrowhead"}
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill={isActive ? "hsl(var(--primary))" : "hsl(var(--node-default-border))"}
            className="transition-colors duration-300"
          />
        </marker>
      </defs>
      
      <line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        className={isActive ? 'bst-edge--active' : 'bst-edge'}
        markerEnd={`url(#${isActive ? "arrowhead-active" : "arrowhead"})`}
        strokeLinecap="round"
      />
    </g>
  );
};