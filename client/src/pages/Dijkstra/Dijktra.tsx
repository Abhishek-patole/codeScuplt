import React, { useState, useEffect, useCallback } from 'react';
import { GraphCanvas } from '../../components/Dijkstra/GraphCanvas';
import { ControlPanel } from '../../components/Dijkstra/ControlPanel';
import { AlgorithmInfo } from '../../components/Dijkstra/AlgorithmInfo';
import { GraphBuilder } from '../../components/Dijkstra/GraphBuilder';
import { Graph, Node, AlgorithmState, DijkstraStep } from '../../types/graph';
import { DijkstraVisualizer, sampleGraphs } from '../../utils/dijkstra';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { MapPin, Cpu, Settings } from 'lucide-react';
import "@/styles/dijkstra.css"

const Dijkstra = () => {
  const [graph, setGraph] = useState<Graph>(sampleGraphs.cityDistricts);
  const [algorithmState, setAlgorithmState] = useState<AlgorithmState>({
    isRunning: false,
    isPaused: false,
    currentStep: 0,
    steps: [],
    startNode: null,
    endNode: null
  });
  const [speed, setSpeed] = useState(1);

  // Update graph nodes with algorithm state
  const updateGraphWithState = useCallback((step: DijkstraStep | null, currentGraph: Graph) => {
    const updatedNodes = currentGraph.nodes.map(node => {
      const isStart = algorithmState.startNode === node.id;
      const isEnd = algorithmState.endNode === node.id;
      const isCurrent = step?.currentNode === node.id;
      const isVisited = step?.visited.has(node.id) || false;
      const isInPath = step?.path.includes(node.id) || false;

      return {
        ...node,
        distance: step ? (step.distances[node.id] ?? Infinity) : Infinity,
        visited: isVisited,
        isCurrent: isCurrent,
        isPath: isInPath,
        isStart,
        isEnd
      };
    });

    const updatedEdges = currentGraph.edges.map(edge => {
      const isActive = step?.currentNode === edge.from || step?.currentNode === edge.to;
      const isPathEdge = step?.path.length > 1 && 
        step.path.includes(edge.from) && 
        step.path.includes(edge.to) &&
        Math.abs(step.path.indexOf(edge.from) - step.path.indexOf(edge.to)) === 1;

      return {
        ...edge,
        isActive: isActive || false,
        isPath: isPathEdge || false
      };
    });

    return { nodes: updatedNodes, edges: updatedEdges };
  }, [algorithmState.startNode, algorithmState.endNode]);

  // Auto-play functionality
  useEffect(() => {
    if (!algorithmState.isRunning || algorithmState.isPaused) return;

    const interval = setInterval(() => {
      setAlgorithmState(prev => {
        if (prev.currentStep >= prev.steps.length - 1) {
          return { ...prev, isRunning: false };
        }
        
        const nextStep = prev.currentStep + 1;
        const updatedGraph = updateGraphWithState(prev.steps[nextStep], graph);
        setGraph(updatedGraph);
        return { ...prev, currentStep: nextStep };
      });
    }, 1000 / speed);

    return () => clearInterval(interval);
  }, [algorithmState.isRunning, algorithmState.isPaused, speed, graph, updateGraphWithState]);

  const startAlgorithm = () => {
    if (!algorithmState.startNode || !algorithmState.endNode) return;

    const visualizer = new DijkstraVisualizer(graph);
    const steps = visualizer.findShortestPath(algorithmState.startNode, algorithmState.endNode);
    
    setAlgorithmState(prev => ({
      ...prev,
      steps,
      currentStep: 0,
      isRunning: true,
      isPaused: false
    }));

    const updatedGraph = updateGraphWithState(steps[0], graph);
    setGraph(updatedGraph);
  };

  const pauseAlgorithm = () => {
    setAlgorithmState(prev => ({ ...prev, isPaused: true }));
  };

  const resumeAlgorithm = () => {
    setAlgorithmState(prev => ({ ...prev, isPaused: false }));
  };

  const stopAlgorithm = () => {
    setAlgorithmState(prev => ({
      ...prev,
      isRunning: false,
      isPaused: false,
      currentStep: 0
    }));
    
    // Reset graph to initial state
    const resetNodes = graph.nodes.map(node => ({
      ...node,
      distance: Infinity,
      visited: false,
      isCurrent: false,
      isPath: false
    }));
    
    const resetEdges = graph.edges.map(edge => ({
      ...edge,
      isActive: false,
      isPath: false
    }));

    setGraph(prev => ({ nodes: resetNodes, edges: resetEdges }));
  };

  const nextStep = () => {
    if (algorithmState.currentStep < algorithmState.steps.length - 1) {
      const nextStepIndex = algorithmState.currentStep + 1;
      setAlgorithmState(prev => ({ ...prev, currentStep: nextStepIndex }));
      const updatedGraph = updateGraphWithState(algorithmState.steps[nextStepIndex], graph);
      setGraph(updatedGraph);
    }
  };

  const previousStep = () => {
    if (algorithmState.currentStep > 0) {
      const prevStepIndex = algorithmState.currentStep - 1;
      setAlgorithmState(prev => ({ ...prev, currentStep: prevStepIndex }));
      const updatedGraph = updateGraphWithState(algorithmState.steps[prevStepIndex], graph);
      setGraph(updatedGraph);
    }
  };

  const handleNodeClick = (nodeId: string) => {
    if (algorithmState.isRunning) return;
    
    if (!algorithmState.startNode) {
      setAlgorithmState(prev => ({ ...prev, startNode: nodeId }));
    } else if (!algorithmState.endNode && nodeId !== algorithmState.startNode) {
      setAlgorithmState(prev => ({ ...prev, endNode: nodeId }));
    } else {
      // Reset selection
      setAlgorithmState(prev => ({ ...prev, startNode: nodeId, endNode: null }));
    }
  };

  const loadSampleGraph = (sampleKey: string) => {
    const sample = sampleGraphs[sampleKey as keyof typeof sampleGraphs];
    if (sample) {
      setGraph(sample);
      setAlgorithmState(prev => ({
        ...prev,
        startNode: null,
        endNode: null,
        steps: [],
        currentStep: 0,
        isRunning: false,
        isPaused: false
      }));
    }
  };

  const nodeOptions = graph.nodes.map(node => ({
    id: node.id,
    label: node.label
  }));

  return (
    <div className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Cyberpunk Pathfinder
          </h1>
          <p className="text-muted-foreground text-lg">
            Dijkstra's Algorithm Visualizer - Navigate the Future City
          </p>
        </div>
        
        <div className="flex justify-center gap-4">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
            <MapPin className="w-3 h-3 mr-1" />
            Interactive Graph
          </Badge>
          <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/30">
            <Cpu className="w-3 h-3 mr-1" />
            Real-time Algorithm
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Graph Visualization - Takes up most space */}
        <div className="xl:col-span-3 space-y-4">
          <Card className="glass-panel border-border/30">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                City Network Visualization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <GraphCanvas
                graph={graph}
                onNodeClick={handleNodeClick}
                className="min-h-[600px]"
              />
            </CardContent>
          </Card>

          {/* Control Panel */}
          <ControlPanel
            algorithmState={algorithmState}
            onPlay={algorithmState.isRunning ? resumeAlgorithm : startAlgorithm}
            onPause={pauseAlgorithm}
            onStop={stopAlgorithm}
            onNext={nextStep}
            onPrevious={previousStep}
            onStartNodeChange={(nodeId) => 
              setAlgorithmState(prev => ({ ...prev, startNode: nodeId }))
            }
            onEndNodeChange={(nodeId) => 
              setAlgorithmState(prev => ({ ...prev, endNode: nodeId }))
            }
            onSpeedChange={setSpeed}
            nodeOptions={nodeOptions}
            speed={speed}
          />
        </div>

        {/* Sidebar */}
        <div className="xl:col-span-1 space-y-4">
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-muted/50">
              <TabsTrigger value="info" className="text-xs">
                <Cpu className="w-3 h-3 mr-1" />
                Info
              </TabsTrigger>
              <TabsTrigger value="builder" className="text-xs">
                <Settings className="w-3 h-3 mr-1" />
                Builder
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="info" className="mt-4">
              <AlgorithmInfo />
            </TabsContent>
            
            <TabsContent value="builder" className="mt-4">
              <GraphBuilder
                graph={graph}
                onGraphChange={setGraph}
                onLoadSample={loadSampleGraph}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dijkstra;