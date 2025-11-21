import React from 'react';
import { BSTNode } from '@/utils/bst';

interface TreeNodeProps {
  node: BSTNode;
  state?: 'default' | 'current' | 'found' | 'path' | 'visited' | 'insert' | 'delete';
  onNodeClick?: (nodeId: string) => void;
}

export const TreeNode: React.FC<TreeNodeProps> = ({ 
  node, 
  state = 'default',
  onNodeClick 
}) => {
  const getNodeClasses = () => {
    const baseClasses = 'bst-node cursor-pointer select-none';
    
    switch (state) {
      case 'current':
        return `${baseClasses} bst-node--current`;
      case 'found':
        return `${baseClasses} bst-node--found`;
      case 'path':
        return `${baseClasses} bst-node--path`;
      case 'visited':
        return `${baseClasses} bst-node--visited`;
      case 'insert':
        return `${baseClasses} bst-node--insert`;
      case 'delete':
        return `${baseClasses} bst-node--delete`;
      default:
        return baseClasses;
    }
  };

  return (
    <g 
      style={{ transform: `translate(${node.x}px, ${node.y}px)` }}
      onClick={() => onNodeClick?.(node.id)}
      className="transition-transform duration-300 hover:scale-110"
    >
      {/* Node shadow */}
      <circle
        cx="0"
        cy="2"
        r="26"
        fill="rgba(0, 0, 0, 0.2)"
        className="blur-sm"
      />
      
      {/* Main node circle */}
      <foreignObject x="-24" y="-24" width="48" height="48">
        <div className={getNodeClasses()}>
          <span className="font-bold text-sm">
            {node.value}
          </span>
        </div>
      </foreignObject>
      
      {/* Hover effect ring */}
      <circle
        cx="0"
        cy="0"
        r="26"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        className="opacity-0 hover:opacity-30 transition-opacity duration-200"
      />
    </g>
  );
};