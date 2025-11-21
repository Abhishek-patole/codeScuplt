import React from 'react';
import { LinkedListState } from '@/types/linkedList';
import { Node } from './Node';
import { Arrow } from './Arrow';
import { Pointer } from './Pointer';

interface AnimationCanvasProps {
  state: LinkedListState;
  className?: string;
}

export const AnimationCanvas: React.FC<AnimationCanvasProps> = ({ state, className }) => {
  const { nodes, head, type, currentStep, animationSteps } = state;

  // Calculate node positions for layout
  const getNodePositions = () => {
    const positions: Array<{ id: string; x: number; y: number }> = [];
    const baseY = 200;
    const nodeSpacing = 150;
    const startX = 100;

    nodes.forEach((node, index) => {
      positions.push({
        id: node.id,
        x: startX + (index * nodeSpacing),
        y: baseY
      });
    });

    return positions;
  };

  const nodePositions = getNodePositions();
  const currentStepData = currentStep >= 0 ? animationSteps[currentStep] : null;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="min-h-[400px] relative">
        {/* Empty State */}
        {nodes.length === 0 ? (
          <div className="flex items-center justify-center h-full min-h-[300px]">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto bg-gradient-node rounded-xl flex items-center justify-center shadow-node">
                <div className="w-8 h-8 border-2 border-dashed border-muted-foreground rounded"></div>
              </div>
              <h3 className="text-lg font-semibold text-muted-foreground">No nodes to display</h3>
              <p className="text-sm text-muted-foreground/80">
                Load sample data or perform an operation to see the visualization
              </p>
            </div>
          </div>
        ) : (
          <svg className="w-full h-full min-h-[400px]" viewBox="0 0 1000 400">
            {/* Background grid for better visualization */}
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path 
                  d="M 50 0 L 0 0 0 50" 
                  fill="none" 
                  stroke="hsl(var(--border))" 
                  strokeWidth="1" 
                  opacity="0.1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Arrows between nodes */}
            {nodePositions.map((pos, index) => {
              if (index < nodePositions.length - 1) {
                const nextPos = nodePositions[index + 1];
                const isActive = currentStepData?.action === 'connect' || 
                               currentStepData?.action === 'traverse';
                
                return (
                  <Arrow
                    key={`arrow-${pos.id}`}
                    fromX={pos.x + 80}
                    fromY={pos.y + 25}
                    toX={nextPos.x}
                    toY={nextPos.y + 25}
                    isActive={isActive}
                    label="next"
                  />
                );
              }
              return null;
            })}

            {/* Circular connection for circular lists */}
            {(type === 'circular' || type === 'doubly-circular') && nodePositions.length > 1 && (
              <Arrow
                fromX={nodePositions[nodePositions.length - 1].x + 80}
                fromY={nodePositions[nodePositions.length - 1].y + 25}
                toX={nodePositions[0].x}
                toY={nodePositions[0].y + 25}
                isActive={false}
                label="next"
                isCircular
              />
            )}

            {/* Doubly linked list backward arrows */}
            {(type === 'doubly' || type === 'doubly-circular') && 
              nodePositions.map((pos, index) => {
                if (index > 0) {
                  const prevPos = nodePositions[index - 1];
                  return (
                    <Arrow
                      key={`back-arrow-${pos.id}`}
                      fromX={pos.x}
                      fromY={pos.y + 45}
                      toX={prevPos.x + 80}
                      toY={prevPos.y + 45}
                      isActive={false}
                      label="prev"
                      color="secondary"
                    />
                  );
                }
                return null;
              })
            }

            {/* Nodes */}
            {nodePositions.map((pos) => {
              const node = nodes.find(n => n.id === pos.id);
              if (!node) return null;

              const isActive = currentStepData?.nodeId === node.id ||
                             node.isActive;
              const isNew = node.isNew || 
                          (currentStepData?.action === 'create' && currentStepData?.nodeId === node.id);
              const isBeingDeleted = node.isBeingDeleted;

              return (
                <Node
                  key={node.id}
                  x={pos.x}
                  y={pos.y}
                  value={node.value}
                  isActive={isActive}
                  isNew={isNew}
                  isBeingDeleted={isBeingDeleted}
                  showPointers={type === 'doubly' || type === 'doubly-circular'}
                  animate={currentStep >= 0}
                />
              );
            })}

            {/* Pointers (HEAD, TAIL, etc.) */}
            {head && nodePositions.length > 0 && (
              <Pointer
                x={nodePositions[0].x}
                y={nodePositions[0].y - 60}
                label="HEAD"
                isActive={currentStepData?.action === 'highlight'}
                color="primary"
              />
            )}

            {(type === 'doubly' || type === 'doubly-circular') && nodePositions.length > 0 && (
              <Pointer
                x={nodePositions[nodePositions.length - 1].x}
                y={nodePositions[nodePositions.length - 1].y - 60}
                label="TAIL"
                isActive={false}
                color="secondary"
              />
            )}

            {/* NULL pointer at the end (for non-circular lists) */}
            {(type === 'singly' || type === 'doubly') && nodePositions.length > 0 && (
              <g>
                <rect
                  x={nodePositions[nodePositions.length - 1].x + 120}
                  y={nodePositions[nodePositions.length - 1].y + 15}
                  width={40}
                  height={20}
                  rx="4"
                  fill="hsl(var(--muted))"
                  stroke="hsl(var(--border))"
                  strokeWidth="2"
                />
                <text
                  x={nodePositions[nodePositions.length - 1].x + 140}
                  y={nodePositions[nodePositions.length - 1].y + 28}
                  textAnchor="middle"
                  fontSize="12"
                  fill="hsl(var(--muted-foreground))"
                  fontWeight="600"
                >
                  NULL
                </text>
              </g>
            )}
          </svg>
        )}

        {/* Current Step Overlay */}
        {currentStepData && (
          <div className="absolute top-4 left-4 right-4">
            <div className="bg-card border border-border rounded-lg p-4 shadow-medium">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                <p className="text-sm font-medium text-foreground">
                  Step {currentStep + 1}: {currentStepData.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};