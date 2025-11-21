import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Map, Shuffle } from 'lucide-react';
import { Graph, Node, Edge } from '../../types/graph';
import { sampleGraphs } from '../../utils/dijkstra';

interface GraphBuilderProps {
  graph: Graph;
  onGraphChange: (graph: Graph) => void;
  onLoadSample: (sampleKey: string) => void;
}

export const GraphBuilder: React.FC<GraphBuilderProps> = ({
  graph,
  onGraphChange,
  onLoadSample
}) => {
  const [newNodeLabel, setNewNodeLabel] = useState('');
  const [edgeFrom, setEdgeFrom] = useState('');
  const [edgeTo, setEdgeTo] = useState('');
  const [edgeWeight, setEdgeWeight] = useState('');

  const addNode = () => {
    if (!newNodeLabel.trim()) return;

    const newNode: Node = {
      id: `node-${Date.now()}`,
      x: Math.random() * 400 + 200,
      y: Math.random() * 300 + 150,
      label: newNodeLabel.trim(),
      distance: Infinity,
      previous: null,
      visited: false,
      isCurrent: false,
      isPath: false
    };

    onGraphChange({
      ...graph,
      nodes: [...graph.nodes, newNode]
    });

    setNewNodeLabel('');
  };

  const removeNode = (nodeId: string) => {
    onGraphChange({
      nodes: graph.nodes.filter(n => n.id !== nodeId),
      edges: graph.edges.filter(e => e.from !== nodeId && e.to !== nodeId)
    });
  };

  const addEdge = () => {
    if (!edgeFrom || !edgeTo || !edgeWeight || edgeFrom === edgeTo) return;

    const weight = parseInt(edgeWeight);
    if (isNaN(weight) || weight <= 0) return;

    // Check if edge already exists
    const existingEdge = graph.edges.find(
      e => (e.from === edgeFrom && e.to === edgeTo) || (e.from === edgeTo && e.to === edgeFrom)
    );
    
    if (existingEdge) return;

    const newEdge: Edge = {
      from: edgeFrom,
      to: edgeTo,
      weight,
      isActive: false,
      isPath: false
    };

    onGraphChange({
      ...graph,
      edges: [...graph.edges, newEdge]
    });

    setEdgeFrom('');
    setEdgeTo('');
    setEdgeWeight('');
  };

  const removeEdge = (from: string, to: string) => {
    onGraphChange({
      ...graph,
      edges: graph.edges.filter(e => !(e.from === from && e.to === to))
    });
  };

  const generateRandomGraph = () => {
    const nodeCount = 6;
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // Generate nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        id: `city-${i}`,
        x: Math.random() * 500 + 100,
        y: Math.random() * 400 + 100,
        label: `City ${String.fromCharCode(65 + i)}`,
        distance: Infinity,
        previous: null,
        visited: false,
        isCurrent: false,
        isPath: false
      });
    }

    // Generate random edges
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (Math.random() > 0.6) { // 40% chance of connection
          edges.push({
            from: nodes[i].id,
            to: nodes[j].id,
            weight: Math.floor(Math.random() * 9) + 1,
            isActive: false,
            isPath: false
          });
        }
      }
    }

    onGraphChange({ nodes, edges });
  };

  return (
    <div className="space-y-4">
      {/* Sample Graphs */}
      <Card className="glass-panel border-border/30">
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-2">
            <Map className="w-5 h-5" />
            Quick Start
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 gap-2">
            <Button
              variant="outline"
              onClick={() => onLoadSample('cityDistricts')}
              className="btn-neon justify-start"
            >
              Load City Districts Sample
            </Button>
            <Button
              variant="outline"
              onClick={generateRandomGraph}
              className="btn-neon justify-start"
            >
              <Shuffle className="w-4 h-4 mr-2" />
              Generate Random City Network
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Add Node */}
      <Card className="glass-panel border-border/30">
        <CardHeader>
          <CardTitle className="text-secondary text-sm">Add New City</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Input
              value={newNodeLabel}
              onChange={(e) => setNewNodeLabel(e.target.value)}
              placeholder="City name"
              className="bg-input/50 border-border/50"
              onKeyPress={(e) => e.key === 'Enter' && addNode()}
            />
            <Button onClick={addNode} size="sm" className="btn-neon">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Add Edge */}
      <Card className="glass-panel border-border/30">
        <CardHeader>
          <CardTitle className="text-secondary text-sm">Add Road Connection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            <Select value={edgeFrom} onValueChange={setEdgeFrom}>
              <SelectTrigger className="bg-input/50 border-border/50">
                <SelectValue placeholder="From" />
              </SelectTrigger>
              <SelectContent>
                {graph.nodes.map((node) => (
                  <SelectItem key={node.id} value={node.id}>
                    {node.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={edgeTo} onValueChange={setEdgeTo}>
              <SelectTrigger className="bg-input/50 border-border/50">
                <SelectValue placeholder="To" />
              </SelectTrigger>
              <SelectContent>
                {graph.nodes.map((node) => (
                  <SelectItem key={node.id} value={node.id}>
                    {node.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Input
              value={edgeWeight}
              onChange={(e) => setEdgeWeight(e.target.value)}
              placeholder="Distance"
              type="number"
              min="1"
              className="bg-input/50 border-border/50"
            />
          </div>
          
          <Button onClick={addEdge} size="sm" className="btn-neon w-full">
            Add Road
          </Button>
        </CardContent>
      </Card>

      {/* Current Graph Info */}
      <Card className="glass-panel border-border/30">
        <CardHeader>
          <CardTitle className="text-accent text-sm">Current Network</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-4 text-xs text-muted-foreground">
            <div>
              <Badge variant="outline">{graph.nodes.length}</Badge> Cities
            </div>
            <div>
              <Badge variant="outline">{graph.edges.length}</Badge> Roads
            </div>
          </div>
          
          {graph.nodes.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-medium text-foreground">Cities:</div>
              <div className="space-y-1">
                {graph.nodes.map((node) => (
                  <div key={node.id} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{node.label}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeNode(node.id)}
                      className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {graph.edges.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-medium text-foreground">Roads:</div>
              <div className="space-y-1">
                {graph.edges.map((edge, index) => {
                  const fromNode = graph.nodes.find(n => n.id === edge.from);
                  const toNode = graph.nodes.find(n => n.id === edge.to);
                  return (
                    <div key={index} className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        {fromNode?.label} → {toNode?.label} ({edge.weight})
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeEdge(edge.from, edge.to)}
                        className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};