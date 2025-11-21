import { useState, useCallback, useRef } from 'react';
import { LinkedListState, ListNode, LinkedListType, OperationType, AnimationStep } from '@/types/linkedList';

const PREDEFINED_SAMPLES = {
  singly: [10, 20, 30, 40],
  doubly: [15, 25, 35],
  circular: [5, 15, 25, 35],
  'doubly-circular': [8, 18, 28]
};

export const useLinkedList = () => {
  const [state, setState] = useState<LinkedListState>({
    head: null,
    tail: null,
    type: 'singly',
    nodes: [],
    currentOperation: null,
    animationSteps: [],
    currentStep: -1,
    isPlaying: false,
    isPaused: false,
    speed: 1
  });

  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const createNode = useCallback((value: number, id?: string): ListNode => ({
    id: id || `node-${Date.now()}-${Math.random()}`,
    value,
    next: null,
    prev: null,
    isActive: false,
    isNew: false,
    isBeingDeleted: false
  }), []);

  const loadSample = useCallback((type: LinkedListType) => {
    const values = PREDEFINED_SAMPLES[type];
    const nodes: ListNode[] = [];
    
    // Create nodes
    values.forEach((value, index) => {
      const node = createNode(value, `sample-${index}`);
      nodes.push(node);
    });

    // Link nodes based on type
    for (let i = 0; i < nodes.length; i++) {
      if (type === 'singly' || type === 'circular') {
        if (i < nodes.length - 1) {
          nodes[i].next = nodes[i + 1];
        }
        if (type === 'circular' && i === nodes.length - 1) {
          nodes[i].next = nodes[0]; // Close the circle
        }
      } else if (type === 'doubly' || type === 'doubly-circular') {
        if (i < nodes.length - 1) {
          nodes[i].next = nodes[i + 1];
          nodes[i + 1].prev = nodes[i];
        }
        if (type === 'doubly-circular') {
          if (i === 0) {
            nodes[i].prev = nodes[nodes.length - 1];
          }
          if (i === nodes.length - 1) {
            nodes[i].next = nodes[0];
          }
        }
      }
    }

    setState(prev => ({
      ...prev,
      type,
      head: nodes[0] || null,
      tail: nodes[nodes.length - 1] || null,
      nodes,
      currentStep: -1,
      animationSteps: [],
      currentOperation: null
    }));
  }, [createNode]);

  const generateInsertionSteps = useCallback((
    position: 'beginning' | 'end' | 'middle',
    value: number,
    index?: number
  ): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const newNodeId = `insert-${Date.now()}`;

    steps.push({
      id: `step-1`,
      description: `Creating new node with value ${value}`,
      action: 'create',
      nodeId: newNodeId,
      duration: 800,
      data: { value, position }
    });

    if (position === 'beginning') {
      steps.push({
        id: `step-2`,
        description: 'New node points to current head',
        action: 'connect',
        nodeId: newNodeId,
        duration: 600
      });
      steps.push({
        id: `step-3`,
        description: 'Update head pointer to new node',
        action: 'highlight',
        nodeId: newNodeId,
        duration: 500
      });
    } else if (position === 'end') {
      steps.push({
        id: `step-2`,
        description: 'Traverse to tail node',
        action: 'traverse',
        duration: 1000
      });
      steps.push({
        id: `step-3`,
        description: 'Tail node points to new node',
        action: 'connect',
        duration: 600
      });
    } else if (position === 'middle' && index !== undefined) {
      steps.push({
        id: `step-2`,
        description: `Traverse to position ${index}`,
        action: 'traverse',
        duration: 1000 + (index * 200)
      });
      steps.push({
        id: `step-3`,
        description: 'New node points to next node',
        action: 'connect',
        duration: 600
      });
      steps.push({
        id: `step-4`,
        description: 'Previous node points to new node',
        action: 'connect',
        duration: 600
      });
    }

    return steps;
  }, []);

  const generateDeletionSteps = useCallback((
    position: 'beginning' | 'end' | 'middle',
    index?: number
  ): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    
    steps.push({
      id: `delete-step-1`,
      description: `Locating node to delete at ${position}${index !== undefined ? ` (position ${index})` : ''}`,
      action: 'traverse',
      duration: 800
    });
    
    steps.push({
      id: `delete-step-2`,
      description: 'Updating pointer connections',
      action: 'connect',
      duration: 600
    });
    
    steps.push({
      id: `delete-step-3`,
      description: 'Removing node from list',
      action: 'delete',
      duration: 500
    });
    
    return steps;
  }, []);

  const deleteNode = useCallback((
    position: 'beginning' | 'end' | 'middle',
    index?: number
  ) => {
    const steps = generateDeletionSteps(position, index);
    const operationType: OperationType = position === 'beginning' ? 'delete-beginning' :
                                       position === 'end' ? 'delete-end' : 'delete-middle';

    setState(prev => {
      const newNodes = [...prev.nodes];
      
      if (newNodes.length === 0) return prev;

      if (position === 'beginning' && newNodes.length > 0) {
        newNodes.shift();
      } else if (position === 'end' && newNodes.length > 0) {
        newNodes.pop();
      }

      return {
        ...prev,
        nodes: newNodes,
        head: newNodes[0] || null,
        tail: newNodes[newNodes.length - 1] || null,
        currentOperation: operationType,
        animationSteps: steps,
        currentStep: -1,
        isPlaying: false
      };
    });
  }, [generateDeletionSteps]);

  const insertNode = useCallback((
    position: 'beginning' | 'end' | 'middle',
    value: number,
    index?: number
  ) => {
    const steps = generateInsertionSteps(position, value, index);
    const operationType: OperationType = position === 'beginning' ? 'insert-beginning' :
                                       position === 'end' ? 'insert-end' : 'insert-middle';

    // Actually perform the insertion immediately
    const newNode = createNode(value);
    
    setState(prev => {
      const newNodes = [...prev.nodes];
      let newHead = prev.head;
      let newTail = prev.tail;

      if (position === 'beginning') {
        if (newNodes.length === 0) {
          newNodes.push(newNode);
          newHead = newNode;
          newTail = newNode;
        } else {
          newNode.next = newHead;
          if (prev.type === 'doubly' || prev.type === 'doubly-circular') {
            if (newHead) newHead.prev = newNode;
          }
          newNodes.unshift(newNode);
          newHead = newNode;
          
          // Handle circular connections
          if (prev.type === 'circular' || prev.type === 'doubly-circular') {
            newTail!.next = newHead;
            if (prev.type === 'doubly-circular') {
              newHead.prev = newTail;
            }
          }
        }
      } else if (position === 'end') {
        if (newNodes.length === 0) {
          newNodes.push(newNode);
          newHead = newNode;
          newTail = newNode;
        } else {
          if (newTail) newTail.next = newNode;
          if (prev.type === 'doubly' || prev.type === 'doubly-circular') {
            newNode.prev = newTail;
          }
          newNodes.push(newNode);
          newTail = newNode;
          
          // Handle circular connections
          if (prev.type === 'circular' || prev.type === 'doubly-circular') {
            newTail.next = newHead;
            if (prev.type === 'doubly-circular' && newHead) {
              newHead.prev = newTail;
            }
          }
        }
      } else if (position === 'middle' && index !== undefined && index >= 0 && index < newNodes.length) {
        const prevNode = index > 0 ? newNodes[index - 1] : null;
        const nextNode = newNodes[index];
        
        newNode.next = nextNode;
        if (prevNode) prevNode.next = newNode;
        
        if (prev.type === 'doubly' || prev.type === 'doubly-circular') {
          newNode.prev = prevNode;
          if (nextNode) nextNode.prev = newNode;
        }
        
        newNodes.splice(index, 0, newNode);
      }

      return {
        ...prev,
        nodes: newNodes,
        head: newHead,
        tail: newTail,
        currentOperation: operationType,
        animationSteps: steps,
        currentStep: -1,
        isPlaying: false
      };
    });
  }, [generateInsertionSteps, createNode]);

  const playAnimation = useCallback(() => {
    if (state.currentStep >= state.animationSteps.length - 1) return;

    setState(prev => ({ ...prev, isPlaying: true, isPaused: false }));

    const executeStep = (stepIndex: number) => {
      if (stepIndex >= state.animationSteps.length) {
        setState(prev => ({ ...prev, isPlaying: false, currentOperation: null }));
        return;
      }

      const step = state.animationSteps[stepIndex];
      const duration = step.duration / state.speed;

      setState(prev => ({ ...prev, currentStep: stepIndex }));

      animationTimeoutRef.current = setTimeout(() => {
        executeStep(stepIndex + 1);
      }, duration);
    };

    executeStep(state.currentStep + 1);
  }, [state.currentStep, state.animationSteps, state.speed]);

  const pauseAnimation = useCallback(() => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
      animationTimeoutRef.current = null;
    }
    setState(prev => ({ ...prev, isPlaying: false, isPaused: true }));
  }, []);

  const nextStep = useCallback(() => {
    if (state.currentStep < state.animationSteps.length - 1) {
      setState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
    }
  }, [state.currentStep, state.animationSteps.length]);

  const prevStep = useCallback(() => {
    if (state.currentStep > -1) {
      setState(prev => ({ ...prev, currentStep: prev.currentStep - 1 }));
    }
  }, [state.currentStep]);

  const setSpeed = useCallback((speed: number) => {
    setState(prev => ({ ...prev, speed }));
  }, []);

  const changeListType = useCallback((type: LinkedListType) => {
    loadSample(type);
  }, [loadSample]);

  const reset = useCallback(() => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    setState(prev => ({
      ...prev,
      currentStep: -1,
      animationSteps: [],
      currentOperation: null,
      isPlaying: false,
      isPaused: false
    }));
  }, []);

  return {
    state,
    loadSample,
    insertNode,
    deleteNode,
    playAnimation,
    pauseAnimation,
    nextStep,
    prevStep,
    setSpeed,
    changeListType,
    reset
  };
};