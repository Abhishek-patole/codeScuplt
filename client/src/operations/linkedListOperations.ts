import { ListNode, LinkedListType, AnimationStep } from '@/types/linkedList';

export const performInsertion = (
  nodes: ListNode[],
  newNode: ListNode,
  position: 'beginning' | 'end' | 'middle',
  index: number = 0,
  type: LinkedListType
): ListNode[] => {
  const newNodes = [...nodes];
  
  if (position === 'beginning') {
    if (newNodes.length === 0) {
      return [newNode];
    }
    
    newNode.next = newNodes[0];
    if (type === 'doubly' || type === 'doubly-circular') {
      newNodes[0].prev = newNode;
    }
    newNodes.unshift(newNode);
    
    // Handle circular connections
    if (type === 'circular' || type === 'doubly-circular') {
      const tail = newNodes[newNodes.length - 1];
      tail.next = newNode;
      if (type === 'doubly-circular') {
        newNode.prev = tail;
      }
    }
  } else if (position === 'end') {
    if (newNodes.length === 0) {
      return [newNode];
    }
    
    const tail = newNodes[newNodes.length - 1];
    tail.next = newNode;
    if (type === 'doubly' || type === 'doubly-circular') {
      newNode.prev = tail;
    }
    newNodes.push(newNode);
    
    // Handle circular connections
    if (type === 'circular' || type === 'doubly-circular') {
      newNode.next = newNodes[0];
      if (type === 'doubly-circular') {
        newNodes[0].prev = newNode;
      }
    }
  } else if (position === 'middle' && index >= 0 && index < newNodes.length) {
    const prevNode = index > 0 ? newNodes[index - 1] : null;
    const nextNode = newNodes[index];
    
    newNode.next = nextNode;
    if (prevNode) prevNode.next = newNode;
    
    if (type === 'doubly' || type === 'doubly-circular') {
      newNode.prev = prevNode;
      if (nextNode) nextNode.prev = newNode;
    }
    
    newNodes.splice(index, 0, newNode);
  }
  
  return newNodes;
};

export const generateDeletionSteps = (
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
};

export const generateTraversalSteps = (targetIndex: number): AnimationStep[] => {
  const steps: AnimationStep[] = [];
  
  for (let i = 0; i <= targetIndex; i++) {
    steps.push({
      id: `traverse-step-${i}`,
      description: `Visiting node at position ${i}${i === targetIndex ? ' (target found)' : ''}`,
      action: 'traverse',
      duration: 600
    });
  }
  
  return steps;
};