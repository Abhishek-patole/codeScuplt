import { Graph, Node, Edge, DijkstraStep } from '../types/graph';

export class DijkstraVisualizer {
  private graph: Graph;
  private steps: DijkstraStep[] = [];

  constructor(graph: Graph) {
    this.graph = graph;
  }

  public findShortestPath(startId: string, endId: string): DijkstraStep[] {
    this.steps = [];
    const distances: Record<string, number> = {};
    const previous: Record<string, string | null> = {};
    const visited = new Set<string>();
    const unvisited = new Set<string>();

    // Initialize distances
    this.graph.nodes.forEach(node => {
      distances[node.id] = node.id === startId ? 0 : Infinity;
      previous[node.id] = null;
      unvisited.add(node.id);
    });

    this.addStep('start', startId, distances, visited, [], 
      `🚀 Starting from ${this.getNodeLabel(startId)} with distance 0`);

    while (unvisited.size > 0) {
      // Find unvisited node with minimum distance
      let currentNodeId = this.findMinDistanceNode(unvisited, distances);
      
      if (currentNodeId === null || distances[currentNodeId] === Infinity) {
        this.addStep('unreachable', currentNodeId || '', distances, visited, [],
          `❌ No path exists to ${this.getNodeLabel(endId)}`);
        break;
      }

      unvisited.delete(currentNodeId);
      visited.add(currentNodeId);

      this.addStep('visit', currentNodeId, distances, visited, [], 
        `🔍 Exploring ${this.getNodeLabel(currentNodeId)} (distance: ${distances[currentNodeId]})`);

      if (currentNodeId === endId) {
        const path = this.reconstructPath(previous, startId, endId);
        this.addStep('complete', currentNodeId, distances, visited, path,
          `🎯 Found shortest path! Total distance: ${distances[endId]} units`);
        break;
      }

      // Update distances to neighbors
      const neighbors = this.getNeighbors(currentNodeId);
      
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor.nodeId)) {
          const newDistance = distances[currentNodeId] + neighbor.weight;
          
          if (newDistance < distances[neighbor.nodeId]) {
            const oldDistance = distances[neighbor.nodeId];
            distances[neighbor.nodeId] = newDistance;
            previous[neighbor.nodeId] = currentNodeId;
            
            this.addStep('update', currentNodeId, distances, visited, [],
              `⚡ Updated ${this.getNodeLabel(neighbor.nodeId)}: ${oldDistance === Infinity ? '∞' : oldDistance} → ${newDistance}`);
          } else {
            this.addStep('skip', currentNodeId, distances, visited, [],
              `⏭️ ${this.getNodeLabel(neighbor.nodeId)} already has better path (${distances[neighbor.nodeId]} ≤ ${newDistance})`);
          }
        }
      }
    }

    return this.steps;
  }

  private findMinDistanceNode(unvisited: Set<string>, distances: Record<string, number>): string | null {
    let minDistance = Infinity;
    let minNode: string | null = null;

    for (const nodeId of unvisited) {
      if (distances[nodeId] < minDistance) {
        minDistance = distances[nodeId];
        minNode = nodeId;
      }
    }

    return minNode;
  }

  private getNeighbors(nodeId: string): Array<{ nodeId: string; weight: number }> {
    return this.graph.edges
      .filter(edge => edge.from === nodeId)
      .map(edge => ({ nodeId: edge.to, weight: edge.weight }));
  }

  private reconstructPath(previous: Record<string, string | null>, startId: string, endId: string): string[] {
    const path: string[] = [];
    let currentId: string | null = endId;

    while (currentId !== null) {
      path.unshift(currentId);
      currentId = previous[currentId];
    }

    return path[0] === startId ? path : [];
  }

  private getNodeLabel(nodeId: string): string {
    const node = this.graph.nodes.find(n => n.id === nodeId);
    return node?.label || nodeId;
  }

  private addStep(
    type: string,
    currentNode: string,
    distances: Record<string, number>,
    visited: Set<string>,
    path: string[],
    description: string
  ) {
    this.steps.push({
      currentNode,
      distances: { ...distances },
      visited: new Set(visited),
      path: [...path],
      description
    });
  }
}

export const sampleGraphs = {
  cityDistricts: {
    nodes: [
      { id: 'downtown', x: 300, y: 200, label: 'Downtown', distance: Infinity, previous: null, visited: false, isCurrent: false, isPath: false },
      { id: 'tech-hub', x: 500, y: 150, label: 'Tech Hub', distance: Infinity, previous: null, visited: false, isCurrent: false, isPath: false },
      { id: 'arts-quarter', x: 200, y: 300, label: 'Arts Quarter', distance: Infinity, previous: null, visited: false, isCurrent: false, isPath: false },
      { id: 'financial', x: 600, y: 250, label: 'Financial District', distance: Infinity, previous: null, visited: false, isCurrent: false, isPath: false },
      { id: 'residential', x: 400, y: 350, label: 'Residential Area', distance: Infinity, previous: null, visited: false, isCurrent: false, isPath: false },
      { id: 'industrial', x: 150, y: 150, label: 'Industrial Zone', distance: Infinity, previous: null, visited: false, isCurrent: false, isPath: false }
    ],
    edges: [
      { from: 'downtown', to: 'tech-hub', weight: 4, isActive: false, isPath: false },
      { from: 'downtown', to: 'arts-quarter', weight: 2, isActive: false, isPath: false },
      { from: 'downtown', to: 'financial', weight: 5, isActive: false, isPath: false },
      { from: 'tech-hub', to: 'financial', weight: 3, isActive: false, isPath: false },
      { from: 'arts-quarter', to: 'residential', weight: 4, isActive: false, isPath: false },
      { from: 'arts-quarter', to: 'industrial', weight: 1, isActive: false, isPath: false },
      { from: 'financial', to: 'residential', weight: 2, isActive: false, isPath: false },
      { from: 'residential', to: 'industrial', weight: 7, isActive: false, isPath: false }
    ]
  },
  
  complexNetwork: {
    nodes: [
      { id: 'A', x: 150, y: 100, label: 'Station A', distance: Infinity, previous: null, visited: false, isCurrent: false, isPath: false },
      { id: 'B', x: 350, y: 80, label: 'Station B', distance: Infinity, previous: null, visited: false, isCurrent: false, isPath: false },
      { id: 'C', x: 550, y: 120, label: 'Station C', distance: Infinity, previous: null, visited: false, isCurrent: false, isPath: false },
      { id: 'D', x: 100, y: 250, label: 'Station D', distance: Infinity, previous: null, visited: false, isCurrent: false, isPath: false },
      { id: 'E', x: 300, y: 220, label: 'Station E', distance: Infinity, previous: null, visited: false, isCurrent: false, isPath: false },
      { id: 'F', x: 500, y: 280, label: 'Station F', distance: Infinity, previous: null, visited: false, isCurrent: false, isPath: false },
      { id: 'G', x: 200, y: 380, label: 'Station G', distance: Infinity, previous: null, visited: false, isCurrent: false, isPath: false },
      { id: 'H', x: 450, y: 420, label: 'Station H', distance: Infinity, previous: null, visited: false, isCurrent: false, isPath: false }
    ],
    edges: [
      { from: 'A', to: 'B', weight: 7, isActive: false, isPath: false },
      { from: 'A', to: 'D', weight: 5, isActive: false, isPath: false },
      { from: 'B', to: 'C', weight: 8, isActive: false, isPath: false },
      { from: 'B', to: 'E', weight: 9, isActive: false, isPath: false },
      { from: 'C', to: 'F', weight: 5, isActive: false, isPath: false },
      { from: 'D', to: 'E', weight: 15, isActive: false, isPath: false },
      { from: 'D', to: 'G', weight: 6, isActive: false, isPath: false },
      { from: 'E', to: 'F', weight: 7, isActive: false, isPath: false },
      { from: 'E', to: 'G', weight: 8, isActive: false, isPath: false },
      { from: 'F', to: 'H', weight: 9, isActive: false, isPath: false },
      { from: 'G', to: 'H', weight: 11, isActive: false, isPath: false }
    ]
  }
};