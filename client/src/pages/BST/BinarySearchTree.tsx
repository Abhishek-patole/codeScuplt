import React, { useState, useEffect, useCallback } from 'react';
import { BST, TreeStep } from '@/utils/bst';
import { TreeVisualization } from '@/components/BST/TreeVisualization';
import { ControlPanel } from '@/components/BST/ControlPanel';
import { toast } from 'sonner';
import "@/styles/bst.css"

const BinarySearchTree = () => {
  const [bst] = useState(() => new BST());
  const [operationSteps, setOperationSteps] = useState<TreeStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(2);
  const [visitedNodes, setVisitedNodes] = useState<Set<string>>(new Set());
  const [currentNodeId, setCurrentNodeId] = useState<string>('');
  const [foundNodeId, setFoundNodeId] = useState<string>('');
  const [insertNodeId, setInsertNodeId] = useState<string>('');
  const [deleteNodeId, setDeleteNodeId] = useState<string>('');
  const [activeEdges, setActiveEdges] = useState<Set<string>>(new Set());
  const [forceUpdate, setForceUpdate] = useState(0);
  const [operationType, setOperationType] = useState<'insert' | 'delete' | 'search' | null>(null);

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && currentStepIndex < operationSteps.length - 1) {
      interval = setInterval(() => {
        setCurrentStepIndex(prev => {
          const nextIndex = prev + 1;
          if (nextIndex >= operationSteps.length - 1) {
            setIsPlaying(false);
            // If it was insert/delete, update the actual tree at the end
            if (operationType === 'insert' || operationType === 'delete') {
              setForceUpdate(p => p + 1);
            }
          }
          return nextIndex;
        });
      }, 1000 / speed);
    } else if (!isPlaying && currentStepIndex >= operationSteps.length - 1 && operationType) {
      // Animation finished
      setForceUpdate(p => p + 1);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentStepIndex, operationSteps.length, speed, operationType]);

  // Update visualization state based on current step
  useEffect(() => {
    if (currentStepIndex >= 0 && currentStepIndex < operationSteps.length) {
      const step = operationSteps[currentStepIndex];
      const newVisited = new Set<string>();
      const newActiveEdges = new Set<string>();

      // Mark all previous steps as visited
      for (let i = 0; i <= currentStepIndex; i++) {
        const prevStep = operationSteps[i];
        if (prevStep.nodeId && prevStep.action !== 'notFound') {
          newVisited.add(prevStep.nodeId);
        }
      }

      setVisitedNodes(newVisited);
      setCurrentNodeId(step.action === 'visit' || step.action === 'compare' ? step.nodeId : '');
      setFoundNodeId(step.action === 'found' ? step.nodeId : '');
      setInsertNodeId(step.action === 'insert' ? step.nodeId : '');
      setDeleteNodeId(step.action === 'delete' ? step.nodeId : '');
      setActiveEdges(newActiveEdges);
      
      // Update tree if there's a snapshot
      if (step.tree && (operationType === 'insert' || operationType === 'delete')) {
        bst.root = step.tree;
        bst.calculatePositions();
      }
    } else {
      // Reset states
      setVisitedNodes(new Set());
      setCurrentNodeId('');
      setFoundNodeId('');
      setInsertNodeId('');
      setDeleteNodeId('');
      setActiveEdges(new Set());
    }
  }, [currentStepIndex, operationSteps, bst, operationType]);

  const handleInsert = useCallback((value: number) => {
    try {
      const existingNode = bst.search(value);
      if (existingNode.some(step => step.action === 'found')) {
        toast.error(`Value ${value} already exists in the tree`);
        return;
      }
      
      const steps = bst.insertWithSteps(value);
      setOperationSteps(steps);
      setOperationType('insert');
      setCurrentStepIndex(-1);
      resetSearchState();
      toast.success(`Starting insertion of ${value}...`);
    } catch (error) {
      toast.error('Failed to insert value');
    }
  }, [bst]);

  const handleDelete = useCallback((value: number) => {
    try {
      const searchResult = bst.search(value);
      if (!searchResult.some(step => step.action === 'found')) {
        toast.error(`Value ${value} not found in the tree`);
        return;
      }
      
      const steps = bst.deleteWithSteps(value);
      setOperationSteps(steps);
      setOperationType('delete');
      setCurrentStepIndex(-1);
      resetSearchState();
      toast.success(`Starting deletion of ${value}...`);
    } catch (error) {
      toast.error('Failed to delete value');
    }
  }, [bst]);

  const handleSearch = useCallback((value: number) => {
    try {
      const steps = bst.search(value);
      setOperationSteps(steps);
      setOperationType('search');
      setCurrentStepIndex(-1);
      resetSearchState();
      
      if (steps.length > 0) {
        toast.success(`Starting search for ${value}...`);
      } else {
        toast.error('Tree is empty');
      }
    } catch (error) {
      toast.error('Failed to search value');
    }
  }, [bst]);

  const handleClear = useCallback(() => {
    bst.clear();
    setForceUpdate(prev => prev + 1);
    resetSearchState();
    setOperationSteps([]);
    setOperationType(null);
    toast.success('Tree cleared');
  }, [bst]);

  const handleLoadSample = useCallback((sample: number[]) => {
    bst.clear();
    sample.forEach(value => bst.insert(value));
    setForceUpdate(prev => prev + 1);
    resetSearchState();
    setOperationSteps([]);
    setOperationType(null);
    toast.success(`Loaded sample tree with ${sample.length} nodes`);
  }, [bst]);

  const resetSearchState = () => {
    setVisitedNodes(new Set());
    setCurrentNodeId('');
    setFoundNodeId('');
    setInsertNodeId('');
    setDeleteNodeId('');
    setActiveEdges(new Set());
    setIsPlaying(false);
  };

  const handlePlay = () => {
    if (operationSteps.length === 0) {
      toast.error('No operation to play. Perform an insert, delete, or search first.');
      return;
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handlePrevious = () => {
    setCurrentStepIndex(prev => Math.max(-1, prev - 1));
    setIsPlaying(false);
  };

  const handleNext = () => {
    const nextIndex = Math.min(operationSteps.length - 1, currentStepIndex + 1);
    setCurrentStepIndex(nextIndex);
    if (nextIndex >= operationSteps.length - 1 && (operationType === 'insert' || operationType === 'delete')) {
      setForceUpdate(p => p + 1);
    }
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
  };

  const handleNodeClick = (nodeId: string) => {
    const node = bst.toArray().find(n => n.id === nodeId);
    if (node) {
      handleSearch(node.value);
    }
  };

  const getCurrentMessage = () => {
    if (currentStepIndex >= 0 && currentStepIndex < operationSteps.length) {
      return operationSteps[currentStepIndex].message;
    }
    return undefined;
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[hsl(var(--node-visited))] to-[hsl(var(--node-current))] bg-clip-text text-transparent">
            Binary Search Tree Visualizer
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch the binary search algorithm in action! Insert nodes, search values, and see how the tree maintains its sorted structure.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Control Panel */}
          <div className="lg:col-span-1 space-y-6">
            <ControlPanel
              onInsert={handleInsert}
              onDelete={handleDelete}
              onSearch={handleSearch}
              onClear={handleClear}
              onLoadSample={handleLoadSample}
              onPlay={handlePlay}
              onPause={handlePause}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onSpeedChange={handleSpeedChange}
              isPlaying={isPlaying}
              canGoBack={currentStepIndex > -1}
              canGoForward={currentStepIndex < operationSteps.length - 1}
              speed={speed}
              currentMessage={getCurrentMessage()}
            />
          </div>

          {/* Tree Visualization */}
          <div className="lg:col-span-2">
            <div className="h-[500px] lg:h-[600px]">
              <TreeVisualization
                bst={bst}
                currentNodeId={currentNodeId}
                visitedNodeIds={visitedNodes}
                foundNodeId={foundNodeId}
                insertNodeId={insertNodeId}
                deleteNodeId={deleteNodeId}
                activeEdges={activeEdges}
                onNodeClick={handleNodeClick}
                key={forceUpdate}
              />
            </div>
          </div>
        </div>

        {/* Algorithm Info */}
        {getCurrentMessage() && (
          <div className="glass-card p-6">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold">Current Step</h3>
              <p className="text-lg text-[hsl(var(--node-current))] font-medium">{getCurrentMessage()}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 bg-gradient-to-br from-[hsl(var(--node-current))] to-[hsl(var(--node-current)/0.8)] rounded-full shadow-lg"></div>
                  <span>Currently Visiting</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 bg-gradient-to-br from-[hsl(var(--node-visited))] to-[hsl(var(--node-visited)/0.8)] rounded-full shadow-lg"></div>
                  <span>Already Visited</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 bg-gradient-to-br from-[hsl(var(--node-found))] to-[hsl(var(--node-found)/0.8)] rounded-full shadow-lg"></div>
                  <span>Found Target</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Algorithm Explanation */}
        <div className="glass-card p-6">
          <h3 className="text-xl font-semibold mb-4">How Binary Search Tree Works</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2 text-[hsl(var(--node-visited))]">Tree Structure Rules:</h4>
              <ol className="space-y-2 text-muted-foreground">
                <li>• Left child values are always smaller than parent</li>
                <li>• Right child values are always greater than parent</li>
                <li>• Each node can have at most two children</li>
                <li>• In-order traversal gives sorted sequence</li>
                <li>• Maintains logarithmic height when balanced</li>
              </ol>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-[hsl(var(--node-current))]">Search Algorithm:</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><strong>Average Case:</strong> O(log n) - balanced tree</li>
                <li><strong>Worst Case:</strong> O(n) - skewed tree</li>
                <li><strong>Best Case:</strong> O(1) - target is root</li>
                <li><strong>Space:</strong> O(1) - iterative search</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="glass-card p-4">
          <div className="text-center text-sm text-muted-foreground">
            <p className="font-medium mb-2">💡 Quick Tips:</p>
            <p>
              Click any node to search for it • Use sample trees to explore different structures • 
              Watch the step-by-step animation to understand the algorithm
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinarySearchTree;