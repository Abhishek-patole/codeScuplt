import { useState, useCallback, useRef, useEffect } from 'react';

export interface SearchStep {
  array: number[];
  target: number;
  left: number;
  right: number;
  middle: number | null;
  searchingIndex: number | null;
  eliminatedIndices: number[];
  foundIndex: number | null;
  isCompleted: boolean;
  description: string;
  stepNumber: number;
  isFound: boolean;
}

export const useBinarySearch = (initialArray: number[], initialTarget: number) => {
  const [steps, setSteps] = useState<SearchStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Generate all search steps
  const generateSteps = useCallback((array: number[], target: number) => {
    const steps: SearchStep[] = [];
    const sortedArray = [...array].sort((a, b) => a - b);
    let left = 0;
    let right = sortedArray.length - 1;
    let stepCounter = 0;
    let eliminatedIndices: number[] = [];
    
    // Initial state
    steps.push({
      array: sortedArray,
      target,
      left,
      right,
      middle: null,
      searchingIndex: null,
      eliminatedIndices: [],
      foundIndex: null,
      isCompleted: false,
      description: `Starting binary search for ${target} in sorted array`,
      stepNumber: stepCounter++,
      isFound: false
    });

    while (left <= right) {
      const middle = Math.floor((left + right) / 2);
      
      // Show middle selection
      steps.push({
        array: sortedArray,
        target,
        left,
        right,
        middle,
        searchingIndex: middle,
        eliminatedIndices: [...eliminatedIndices],
        foundIndex: null,
        isCompleted: false,
        description: `Checking middle element at index ${middle}: ${sortedArray[middle]}`,
        stepNumber: stepCounter++,
        isFound: false
      });

      if (sortedArray[middle] === target) {
        // Found the target
        steps.push({
          array: sortedArray,
          target,
          left,
          right,
          middle,
          searchingIndex: null,
          eliminatedIndices: [...eliminatedIndices],
          foundIndex: middle,
          isCompleted: true,
          description: `🎉 Found ${target} at index ${middle}!`,
          stepNumber: stepCounter++,
          isFound: true
        });
        break;
      } else if (sortedArray[middle] < target) {
        // Eliminate left half
        const newEliminated = [];
        for (let i = left; i <= middle; i++) {
          newEliminated.push(i);
        }
        eliminatedIndices = [...eliminatedIndices, ...newEliminated];
        
        steps.push({
          array: sortedArray,
          target,
          left,
          right,
          middle,
          searchingIndex: null,
          eliminatedIndices: [...eliminatedIndices],
          foundIndex: null,
          isCompleted: false,
          description: `${sortedArray[middle]} < ${target}, eliminating left half (indices ${left}-${middle})`,
          stepNumber: stepCounter++,
          isFound: false
        });
        
        left = middle + 1;
      } else {
        // Eliminate right half
        const newEliminated = [];
        for (let i = middle; i <= right; i++) {
          newEliminated.push(i);
        }
        eliminatedIndices = [...eliminatedIndices, ...newEliminated];
        
        steps.push({
          array: sortedArray,
          target,
          left,
          right,
          middle,
          searchingIndex: null,
          eliminatedIndices: [...eliminatedIndices],
          foundIndex: null,
          isCompleted: false,
          description: `${sortedArray[middle]} > ${target}, eliminating right half (indices ${middle}-${right})`,
          stepNumber: stepCounter++,
          isFound: false
        });
        
        right = middle - 1;
      }
    }

    // If not found
    if (left > right && steps[steps.length - 1]?.foundIndex === null) {
      steps.push({
        array: sortedArray,
        target,
        left,
        right,
        middle: null,
        searchingIndex: null,
        eliminatedIndices: [...eliminatedIndices],
        foundIndex: null,
        isCompleted: true,
        description: `❌ ${target} not found in the array`,
        stepNumber: stepCounter++,
        isFound: false
      });
    }

    return steps;
  }, []);

  // Reset with new array and target
  const reset = useCallback((newArray: number[], newTarget: number) => {
    setIsPlaying(false);
    setIsCompleted(false);
    setCurrentStepIndex(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    const newSteps = generateSteps(newArray, newTarget);
    setSteps(newSteps);
  }, [generateSteps]);

  // Control functions
  const play = useCallback(() => {
    if (currentStepIndex >= steps.length - 1) return;
    setIsPlaying(true);
  }, [currentStepIndex, steps.length]);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const next = useCallback(() => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  }, [currentStepIndex, steps.length]);

  const previous = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  }, [currentStepIndex]);

  // Auto-play effect
  useEffect(() => {
    if (isPlaying && currentStepIndex < steps.length - 1) {
      intervalRef.current = setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            setIsCompleted(true);
            return prev;
          }
          return prev + 1;
        });
      }, 1500); // 1.5 seconds per step for binary search
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (currentStepIndex >= steps.length - 1) {
        setIsCompleted(true);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, currentStepIndex, steps.length]);

  // Initialize with the initial array and target
  useEffect(() => {
    reset(initialArray, initialTarget);
  }, [initialArray, initialTarget, reset]);

  const currentStep = steps[currentStepIndex];
  
  return {
    currentStep,
    isPlaying,
    isCompleted,
    currentStepIndex,
    totalSteps: steps.length,
    canGoNext: currentStepIndex < steps.length - 1,
    canGoPrevious: currentStepIndex > 0,
    play,
    pause,
    next,
    previous,
    reset
  };
};