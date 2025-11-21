export interface Node {
  id: string;
  x: number;
  y: number;
  label: string;
  distance: number;
  previous: string | null;
  visited: boolean;
  isCurrent: boolean;
  isPath: boolean;
  isStart?: boolean;
  isEnd?: boolean;
}

export interface Edge {
  from: string;
  to: string;
  weight: number;
  isActive: boolean;
  isPath: boolean;
}

export interface Graph {
  nodes: Node[];
  edges: Edge[];
}

export interface DijkstraStep {
  currentNode: string;
  distances: Record<string, number>;
  visited: Set<string>;
  path: string[];
  description: string;
}

export interface AlgorithmState {
  isRunning: boolean;
  isPaused: boolean;
  currentStep: number;
  steps: DijkstraStep[];
  startNode: string | null;
  endNode: string | null;
}