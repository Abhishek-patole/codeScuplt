import React, { useEffect, useRef } from 'react';
import { BST, BSTNode } from '@/utils/bst';
import { TreeNode } from './TreeNode';
import { TreeEdge } from './TreeEdge';

interface TreeVisualizationProps {
  bst: BST;
  currentNodeId?: string;
  visitedNodeIds?: Set<string>;
  foundNodeId?: string;
  insertNodeId?: string;
  deleteNodeId?: string;
  activeEdges?: Set<string>;
  onNodeClick?: (nodeId: string) => void;
}

export const TreeVisualization: React.FC<TreeVisualizationProps> = ({
  bst,
  currentNodeId,
  visitedNodeIds = new Set(),
  foundNodeId,
  insertNodeId,
  deleteNodeId,
  activeEdges = new Set(),
  onNodeClick
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    bst.calculatePositions();
  }, [bst.root]);

  const getNodeState = (node: BSTNode): 'default' | 'current' | 'found' | 'path' | 'visited' | 'insert' | 'delete' => {
    if (insertNodeId === node.id) return 'insert';
    if (deleteNodeId === node.id) return 'delete';
    if (foundNodeId === node.id) return 'found';
    if (currentNodeId === node.id) return 'current';
    if (visitedNodeIds.has(node.id)) return 'visited';
    return 'default';
  };

  const renderTree = (node: BSTNode | null): JSX.Element[] => {
    if (!node) return [];

    const elements: JSX.Element[] = [];

    // Render edges first (so they appear behind nodes)
    if (node.left) {
      const edgeId = `${node.id}-${node.left.id}`;
      elements.push(
        <TreeEdge
          key={edgeId}
          from={node}
          to={node.left}
          isActive={activeEdges.has(edgeId)}
        />
      );
      elements.push(...renderTree(node.left));
    }

    if (node.right) {
      const edgeId = `${node.id}-${node.right.id}`;
      elements.push(
        <TreeEdge
          key={edgeId}
          from={node}
          to={node.right}
          isActive={activeEdges.has(edgeId)}
        />
      );
      elements.push(...renderTree(node.right));
    }

    // Render the node
    elements.push(
      <TreeNode
        key={node.id}
        node={node}
        state={getNodeState(node)}
        onNodeClick={onNodeClick}
      />
    );

    return elements;
  };

  if (!bst.root) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <div className="text-6xl mb-4">🌳</div>
          <h3 className="text-xl font-semibold mb-2">No Tree Yet</h3>
          <p>Add some numbers to create your binary search tree!</p>
        </div>
      </div>
    );
  }

  // Calculate SVG dimensions based on tree size
  const nodes = bst.toArray();
  const minX = Math.min(...nodes.map(n => n.x || 0)) - 50;
  const maxX = Math.max(...nodes.map(n => n.x || 0)) + 50;
  const minY = Math.min(...nodes.map(n => n.y || 0)) - 50;
  const maxY = Math.max(...nodes.map(n => n.y || 0)) + 50;
  
  const viewBoxWidth = maxX - minX;
  const viewBoxHeight = maxY - minY;

  return (
    <div className="glass-card h-full overflow-hidden">
      <svg
        ref={svgRef}
        className="w-full h-full"
        viewBox={`${minX} ${minY} ${viewBoxWidth} ${viewBoxHeight}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Enhanced Background */}
        <defs>
          <radialGradient id="backgroundGradient" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="hsl(var(--muted))" stopOpacity="0.1"/>
            <stop offset="100%" stopColor="hsl(var(--background))" stopOpacity="0.3"/>
          </radialGradient>
          
          <pattern
            id="dotGrid"
            width="30"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="15"
              cy="15"
              r="1"
              fill="hsl(var(--border))"
              opacity="0.2"
            />
          </pattern>
        </defs>
        
        <rect
          x={minX}
          y={minY}
          width={viewBoxWidth}
          height={viewBoxHeight}
          fill="url(#backgroundGradient)"
        />
        
        <rect
          x={minX}
          y={minY}
          width={viewBoxWidth}
          height={viewBoxHeight}
          fill="url(#dotGrid)"
        />
        
        {/* Tree elements with smooth transitions */}
        <g style={{ transition: 'all 0.5s ease' }}>
          {renderTree(bst.root)}
        </g>
      </svg>
    </div>
  );
};