// Core types for linked list visualization

export interface ListNode {
  id: string;
  value: number;
  next?: ListNode | null;
  prev?: ListNode | null; // For doubly linked lists
  x?: number; // Position for animation
  y?: number;
  isActive?: boolean;
  isNew?: boolean;
  isBeingDeleted?: boolean;
}

export type LinkedListType = 'singly' | 'doubly' | 'circular' | 'doubly-circular';

export type OperationType = 
  | 'insert-beginning' 
  | 'insert-end' 
  | 'insert-middle' 
  | 'delete-beginning' 
  | 'delete-end' 
  | 'delete-middle' 
  | 'delete-value'
  | 'traverse'
  | 'search';

export interface AnimationStep {
  id: string;
  description: string;
  nodeId?: string;
  action: 'highlight' | 'move' | 'create' | 'delete' | 'connect' | 'disconnect' | 'traverse';
  duration: number;
  data?: any;
}

export interface LinkedListState {
  head: ListNode | null;
  tail?: ListNode | null; // For circular and doubly linked lists
  type: LinkedListType;
  nodes: ListNode[];
  currentOperation: OperationType | null;
  animationSteps: AnimationStep[];
  currentStep: number;
  isPlaying: boolean;
  isPaused: boolean;
  speed: number; // Animation speed multiplier
}

export interface PointerInfo {
  id: string;
  label: string;
  nodeId: string | null;
  x: number;
  y: number;
  isActive: boolean;
  color?: string;
}