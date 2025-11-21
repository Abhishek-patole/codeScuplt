// Binary Search Tree implementation with visualization support

export interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
  x?: number; // For visualization positioning
  y?: number;
  id: string;
}

export interface TreeStep {
  nodeId: string;
  action: 'visit' | 'found' | 'notFound' | 'compare' | 'insert' | 'delete' | 'highlight';
  direction?: 'left' | 'right';
  message: string;
  tree?: BSTNode | null; // Snapshot of tree at this step
}

export interface SearchStep extends TreeStep {}

export interface OperationStep {
  type: 'insert' | 'delete' | 'search';
  steps: TreeStep[];
  value: number;
}

export class BST {
  root: BSTNode | null = null;
  private nodeIdCounter = 0;

  private createNode(value: number): BSTNode {
    return {
      value,
      left: null,
      right: null,
      id: `node-${this.nodeIdCounter++}`
    };
  }

  insert(value: number): BSTNode {
    const newNode = this.createNode(value);
    
    if (!this.root) {
      this.root = newNode;
      return newNode;
    }

    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          break;
        }
        current = current.left;
      } else if (value > current.value) {
        if (!current.right) {
          current.right = newNode;
          break;
        }
        current = current.right;
      } else {
        // Value already exists
        return current;
      }
    }
    
    return newNode;
  }

  insertWithSteps(value: number): TreeStep[] {
    const steps: TreeStep[] = [];
    
    if (!this.root) {
      const newNode = this.createNode(value);
      this.root = newNode;
      steps.push({
        nodeId: newNode.id,
        action: 'insert',
        message: `Inserted ${value} as root node`,
        tree: this.cloneTree(this.root)
      });
      return steps;
    }

    let current = this.root;
    
    while (true) {
      steps.push({
        nodeId: current.id,
        action: 'visit',
        message: `Visiting node ${current.value}`,
        tree: this.cloneTree(this.root)
      });

      if (value === current.value) {
        steps.push({
          nodeId: current.id,
          action: 'found',
          message: `Value ${value} already exists!`,
          tree: this.cloneTree(this.root)
        });
        return steps;
      } else if (value < current.value) {
        steps.push({
          nodeId: current.id,
          action: 'compare',
          direction: 'left',
          message: `${value} < ${current.value}, go left`,
          tree: this.cloneTree(this.root)
        });
        
        if (!current.left) {
          const newNode = this.createNode(value);
          current.left = newNode;
          steps.push({
            nodeId: newNode.id,
            action: 'insert',
            message: `Inserted ${value} as left child of ${current.value}`,
            tree: this.cloneTree(this.root)
          });
          break;
        }
        current = current.left;
      } else {
        steps.push({
          nodeId: current.id,
          action: 'compare',
          direction: 'right',
          message: `${value} > ${current.value}, go right`,
          tree: this.cloneTree(this.root)
        });
        
        if (!current.right) {
          const newNode = this.createNode(value);
          current.right = newNode;
          steps.push({
            nodeId: newNode.id,
            action: 'insert',
            message: `Inserted ${value} as right child of ${current.value}`,
            tree: this.cloneTree(this.root)
          });
          break;
        }
        current = current.right;
      }
    }

    return steps;
  }

  deleteWithSteps(value: number): TreeStep[] {
    const steps: TreeStep[] = [];
    
    if (!this.root) {
      steps.push({
        nodeId: '',
        action: 'notFound',
        message: 'Tree is empty',
        tree: null
      });
      return steps;
    }

    // First, search for the node
    let current = this.root;
    let parent: BSTNode | null = null;
    
    while (current) {
      steps.push({
        nodeId: current.id,
        action: 'visit',
        message: `Visiting node ${current.value}`,
        tree: this.cloneTree(this.root)
      });

      if (value === current.value) {
        steps.push({
          nodeId: current.id,
          action: 'found',
          message: `Found ${value}! Preparing to delete...`,
          tree: this.cloneTree(this.root)
        });
        break;
      } else if (value < current.value) {
        steps.push({
          nodeId: current.id,
          action: 'compare',
          direction: 'left',
          message: `${value} < ${current.value}, go left`,
          tree: this.cloneTree(this.root)
        });
        parent = current;
        current = current.left;
      } else {
        steps.push({
          nodeId: current.id,
          action: 'compare',
          direction: 'right',
          message: `${value} > ${current.value}, go right`,
          tree: this.cloneTree(this.root)
        });
        parent = current;
        current = current.right;
      }
    }

    if (!current) {
      steps.push({
        nodeId: '',
        action: 'notFound',
        message: `${value} not found in tree`,
        tree: this.cloneTree(this.root)
      });
      return steps;
    }

    // Perform deletion
    this.root = this.deleteNode(this.root, value);
    steps.push({
      nodeId: '',
      action: 'delete',
      message: `Deleted ${value} from tree`,
      tree: this.cloneTree(this.root)
    });

    return steps;
  }

  private cloneTree(node: BSTNode | null): BSTNode | null {
    if (!node) return null;
    return {
      value: node.value,
      left: this.cloneTree(node.left),
      right: this.cloneTree(node.right),
      x: node.x,
      y: node.y,
      id: node.id
    };
  }

  search(value: number): SearchStep[] {
    const steps: SearchStep[] = [];
    
    if (!this.root) {
      return steps;
    }

    let current = this.root;
    
    while (current) {
      steps.push({
        nodeId: current.id,
        action: 'visit',
        message: `Visiting node ${current.value}`
      });

      if (value === current.value) {
        steps.push({
          nodeId: current.id,
          action: 'found',
          message: `Found ${value}!`
        });
        return steps;
      } else if (value < current.value) {
        steps.push({
          nodeId: current.id,
          action: 'compare',
          direction: 'left',
          message: `${value} < ${current.value}, go left`
        });
        current = current.left;
      } else {
        steps.push({
          nodeId: current.id,
          action: 'compare',
          direction: 'right',
          message: `${value} > ${current.value}, go right`
        });
        current = current.right;
      }
    }

    steps.push({
      nodeId: '',
      action: 'notFound',
      message: `${value} not found in tree`
    });

    return steps;
  }

  delete(value: number): boolean {
    this.root = this.deleteNode(this.root, value);
    return true;
  }

  private deleteNode(node: BSTNode | null, value: number): BSTNode | null {
    if (!node) return null;

    if (value < node.value) {
      node.left = this.deleteNode(node.left, value);
    } else if (value > node.value) {
      node.right = this.deleteNode(node.right, value);
    } else {
      // Node to delete found
      if (!node.left && !node.right) {
        return null;
      }
      if (!node.left) {
        return node.right;
      }
      if (!node.right) {
        return node.left;
      }

      // Node has two children
      const minRight = this.findMin(node.right);
      node.value = minRight.value;
      node.right = this.deleteNode(node.right, minRight.value);
    }

    return node;
  }

  private findMin(node: BSTNode): BSTNode {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  clear(): void {
    this.root = null;
    this.nodeIdCounter = 0;
  }

  // Calculate positions for visualization with improved layout
  calculatePositions(): void {
    if (!this.root) return;
    
    const depth = this.getMaxDepth();
    const nodeCount = this.toArray().length;
    
    // Better spacing calculation based on tree size
    const minSpacing = 60;
    const baseWidth = Math.max(400, nodeCount * 40);
    const width = Math.max(baseWidth, Math.pow(2, Math.min(depth, 4)) * minSpacing);
    
    // Dynamic level height based on depth
    const levelHeight = Math.min(100, Math.max(70, 500 / depth));
    
    this.positionNodes(this.root, 0, width / 2, levelHeight, width / 4);
  }

  private positionNodes(
    node: BSTNode | null, 
    level: number, 
    x: number, 
    levelHeight: number, 
    horizontalSpacing: number
  ): void {
    if (!node) return;

    node.x = x;
    node.y = level * levelHeight + 80;

    const nextSpacing = Math.max(30, horizontalSpacing / 1.8);

    if (node.left) {
      this.positionNodes(node.left, level + 1, x - horizontalSpacing, levelHeight, nextSpacing);
    }
    if (node.right) {
      this.positionNodes(node.right, level + 1, x + horizontalSpacing, levelHeight, nextSpacing);
    }
  }

  private getMaxDepth(): number {
    return this.calculateDepth(this.root);
  }

  private calculateDepth(node: BSTNode | null): number {
    if (!node) return 0;
    return 1 + Math.max(this.calculateDepth(node.left), this.calculateDepth(node.right));
  }

  // Convert tree to array for easier processing
  toArray(): BSTNode[] {
    const nodes: BSTNode[] = [];
    this.inorderTraversal(this.root, nodes);
    return nodes;
  }

  private inorderTraversal(node: BSTNode | null, nodes: BSTNode[]): void {
    if (!node) return;
    this.inorderTraversal(node.left, nodes);
    nodes.push(node);
    this.inorderTraversal(node.right, nodes);
  }
}

// Sample tree data
export const sampleTrees = {
  balanced: [50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45],
  simple: [8, 3, 10, 1, 6, 14, 4, 7, 13],
  rightSkewed: [1, 2, 3, 4, 5, 6, 7],
  leftSkewed: [7, 6, 5, 4, 3, 2, 1],
  complex: [50, 25, 75, 12, 37, 62, 87, 6, 18, 31, 43, 56, 68, 81, 93]
};