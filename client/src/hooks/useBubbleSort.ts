import { useState, useCallback, useRef, useEffect } from 'react';

export interface SortStep {
  array: number[];
  comparingIndices: number[];
  swappingIndices: number[];
  sortedIndices: number[];
  iterationNumber: number;
  isSwap: boolean;
  description: string;
}

export const useBubbleSort = (initialArray: number[]) => {
  const [steps, setSteps] = useState<SortStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Generate all sorting steps
  const generateSteps = useCallback((array: number[]) => {
    const steps: SortStep[] = [];
    const arr = [...array];
    const n = arr.length;
    let sortedCount = 0;

    // Initial state
    steps.push({
      array: [...arr],
      comparingIndices: [],
      swappingIndices: [],
      sortedIndices: [],
      iterationNumber: 0,
      isSwap: false,
      description: 'Starting bubble sort algorithm'
    });

    for (let i = 0; i < n - 1; i++) {
      let swapped = false;
      
      for (let j = 0; j < n - i - 1; j++) {
        // Comparing step
        steps.push({
          array: [...arr],
          comparingIndices: [j, j + 1],
          swappingIndices: [],
          sortedIndices: Array.from({ length: sortedCount }, (_, idx) => n - 1 - idx),
          iterationNumber: i + 1,
          isSwap: false,
          description: `Comparing ${arr[j]} and ${arr[j + 1]}`
        });

        if (arr[j] > arr[j + 1]) {
          // Swap the elements
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swapped = true;

          // Swapping step
          steps.push({
            array: [...arr],
            comparingIndices: [],
            swappingIndices: [j, j + 1],
            sortedIndices: Array.from({ length: sortedCount }, (_, idx) => n - 1 - idx),
            iterationNumber: i + 1,
            isSwap: true,
            description: `Swapped ${arr[j + 1]} and ${arr[j]}`
          });
        }
      }

      sortedCount++;
      
      // Mark the newly sorted element
      steps.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: Array.from({ length: sortedCount }, (_, idx) => n - 1 - idx),
        iterationNumber: i + 1,
        isSwap: false,
        description: `Iteration ${i + 1} complete. Element ${arr[n - 1 - i]} is now in its correct position.`
      });

      if (!swapped) break; // Array is already sorted
    }

    // Final step - all elements sorted
    steps.push({
      array: [...arr],
      comparingIndices: [],
      swappingIndices: [],
      sortedIndices: Array.from({ length: n }, (_, idx) => idx),
      iterationNumber: steps.length > 0 ? steps[steps.length - 1].iterationNumber : 1,
      isSwap: false,
      description: 'Sorting completed! All elements are in their correct positions.'
    });

    return steps;
  }, []);

  // Reset with new array
  const reset = useCallback((newArray: number[]) => {
    setIsPlaying(false);
    setIsCompleted(false);
    setCurrentStepIndex(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    const newSteps = generateSteps(newArray);
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
      }, 1000); // 1 second per step
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

  // Initialize with the initial array
  useEffect(() => {
    reset(initialArray);
  }, [initialArray, reset]);

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