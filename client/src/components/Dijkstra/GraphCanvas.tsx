import React, { useRef, useEffect } from 'react';
import { Graph, Node, Edge } from '../../types/graph';

interface GraphCanvasProps {
  graph: Graph;
  onNodeClick: (nodeId: string) => void;
  onEdgeClick?: (edge: Edge) => void;
  className?: string;
}

export const GraphCanvas: React.FC<GraphCanvasProps> = ({
  graph,
  onNodeClick,
  onEdgeClick,
  className = ""
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const getNodeClass = (node: Node) => {
    if (node.isStart) return 'city-node start';
    if (node.isEnd) return 'city-node end';
    if (node.isCurrent) return 'city-node current';
    if (node.isPath) return 'city-node path';
    if (node.visited) return 'city-node visited';
    return 'city-node unvisited';
  };

  const getEdgeClass = (edge: Edge) => {
    if (edge.isPath) return 'connection-line path';
    if (edge.isActive) return 'connection-line active';
    return 'connection-line';
  };

  return (
    <div 
      ref={canvasRef}
      className={`relative w-full h-full min-h-[600px] bg-gradient-to-br from-background to-muted rounded-xl border border-border/30 overflow-hidden ${className}`}
    >
      {/* Futuristic City Background Effect */}
      <div className="absolute inset-0 opacity-15">
        {/* Neon Buildings */}
        <div className="absolute top-10 left-10 w-20 h-32 bg-gradient-to-t from-primary/30 to-primary/10 rounded transform rotate-12 shadow-[0_0_20px_hsl(var(--primary)/0.3)]"></div>
        <div className="absolute top-20 right-20 w-16 h-28 bg-gradient-to-t from-secondary/30 to-secondary/10 rounded transform -rotate-6 shadow-[0_0_20px_hsl(var(--secondary)/0.3)]"></div>
        <div className="absolute bottom-20 left-20 w-24 h-36 bg-gradient-to-t from-accent/30 to-accent/10 rounded transform rotate-3 shadow-[0_0_20px_hsl(var(--accent)/0.3)]"></div>
        <div className="absolute bottom-10 right-10 w-18 h-30 bg-gradient-to-t from-primary/30 to-primary/10 rounded transform -rotate-12 shadow-[0_0_20px_hsl(var(--primary)/0.3)]"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--border) / 0.1) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--border) / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
        
        {/* Floating Particles */}
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-primary rounded-full animate-ping"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-secondary rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-accent rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* SVG for connections */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      >
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
              fill="hsl(var(--border))"
            />
          </marker>
        </defs>
        
        {graph.edges.map((edge, index) => {
          const fromNode = graph.nodes.find(n => n.id === edge.from);
          const toNode = graph.nodes.find(n => n.id === edge.to);
          
          if (!fromNode || !toNode) return null;
          
          return (
            <g key={`${edge.from}-${edge.to}-${index}`}>
              <line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                className={getEdgeClass(edge)}
                markerEnd="url(#arrowhead)"
                onClick={() => onEdgeClick?.(edge)}
                style={{ cursor: onEdgeClick ? 'pointer' : 'default' }}
              />
              {/* Weight label */}
              <text
                x={(fromNode.x + toNode.x) / 2}
                y={(fromNode.y + toNode.y) / 2 - 10}
                fill="hsl(var(--foreground))"
                fontSize="12"
                textAnchor="middle"
                className="font-mono bg-background/80 px-1 py-0.5 rounded"
              >
                {edge.weight}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Nodes */}
      {graph.nodes.map((node) => (
        <div
          key={node.id}
          className={`absolute ${getNodeClass(node)} cursor-pointer select-none`}
          style={{
            left: node.x - 30,
            top: node.y - 30,
            width: 60,
            height: 60,
            zIndex: 2
          }}
          onClick={() => onNodeClick(node.id)}
        >
          <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-xs font-bold text-foreground truncate px-1">
                  {node.label}
                </div>
                {node.isStart && <div className="text-xs text-green-400 font-bold">START</div>}
                {node.isEnd && <div className="text-xs text-red-400 font-bold">END</div>}
                {node.distance !== Infinity && !node.isStart && !node.isEnd && (
                  <div className="text-xs text-primary font-mono font-bold">
                    {node.distance}
                  </div>
                )}
              </div>
          </div>
          
          {/* Enhanced Glow effect for special states */}
          {(node.isCurrent || node.isPath || node.isStart || node.isEnd) && (
            <div className="absolute inset-0 rounded-full animate-glow-pulse -z-10"
                 style={{
                   background: node.isCurrent 
                     ? 'radial-gradient(circle, hsl(var(--city-current) / 0.4), transparent 70%)'
                     : node.isPath
                     ? 'radial-gradient(circle, hsl(var(--city-path) / 0.4), transparent 70%)'
                     : node.isStart
                     ? 'radial-gradient(circle, hsl(120 100% 40% / 0.4), transparent 70%)'
                     : 'radial-gradient(circle, hsl(0 100% 50% / 0.4), transparent 70%)'
                 }}>
            </div>
          )}
          
          {/* Node Status Icons */}
          {node.isStart && (
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-xs text-white font-bold animate-bounce">
              🚀
            </div>
          )}
          {node.isEnd && (
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold animate-bounce">
              🎯
            </div>
          )}
          {node.isCurrent && (
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center text-xs text-white font-bold animate-spin">
              ⚡
            </div>
          )}
        </div>
      ))}
    </div>
  );
};