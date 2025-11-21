import { useState, useEffect, useCallback } from "react";
import { QueueDisplay } from "./QueueDisplay";
import { ControlPanel } from "./ControlPanel";
import { InputPanel } from "./InputPanel";
import { TheorySection } from "./TheorySection";
import { toast } from "sonner";

export interface QueueStep {
  id: string;
  type: "enqueue" | "dequeue" | "initialize";
  element?: string;
  queue: string[];
  description: string;
  frontIndex?: number;
  rearIndex?: number;
}

const sampleOperations = [
  "Initialize empty queue",
  "Enqueue: A",
  "Enqueue: B", 
  "Enqueue: C",
  "Dequeue",
  "Enqueue: D",
  "Dequeue",
  "Dequeue"
];

export const QueueVisualizer = () => {
  const [queue, setQueue] = useState<string[]>([]);
  const [steps, setSteps] = useState<QueueStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playSpeed, setPlaySpeed] = useState(1500);
  const [activeElement, setActiveElement] = useState<string | null>(null);

  // Initialize with empty queue
  useEffect(() => {
    const initialStep: QueueStep = {
      id: "init",
      type: "initialize", 
      queue: [],
      description: "Empty queue initialized",
      frontIndex: -1,
      rearIndex: -1
    };
    setSteps([initialStep]);
  }, []);

  const enqueue = useCallback((element: string) => {
    if (!element.trim()) return;
    
    const newQueue = [...queue, element];
    const newStep: QueueStep = {
      id: `enqueue-${Date.now()}`,
      type: "enqueue",
      element,
      queue: newQueue,
      description: `Enqueue "${element}" to rear of queue`,
      frontIndex: 0,
      rearIndex: newQueue.length - 1
    };
    
    setSteps(prev => [...prev, newStep]);
    setQueue(newQueue);
    setActiveElement(element);
    
    toast.success(`Added "${element}" to queue`);
    
    // Clear active element after animation
    setTimeout(() => setActiveElement(null), 800);
  }, [queue]);

  const dequeue = useCallback(() => {
    if (queue.length === 0) {
      toast.error("Queue is empty!");
      return;
    }
    
    const dequeuedElement = queue[0];
    const newQueue = queue.slice(1);
    const newStep: QueueStep = {
      id: `dequeue-${Date.now()}`,
      type: "dequeue",
      element: dequeuedElement,
      queue: newQueue,
      description: `Dequeue "${dequeuedElement}" from front of queue`,
      frontIndex: newQueue.length > 0 ? 0 : -1,
      rearIndex: newQueue.length > 0 ? newQueue.length - 1 : -1
    };
    
    setSteps(prev => [...prev, newStep]);
    setQueue(newQueue);
    setActiveElement(dequeuedElement);
    
    toast.success(`Removed "${dequeuedElement}" from queue`);
    
    // Clear active element after animation
    setTimeout(() => setActiveElement(null), 800);
  }, [queue]);

  const peek = useCallback(() => {
    if (queue.length === 0) {
      toast.error("Queue is empty!");
      return null;
    }
    
    const frontElement = queue[0];
    setActiveElement(frontElement);
    toast.info(`Front element: "${frontElement}"`);
    
    // Clear active element after animation
    setTimeout(() => setActiveElement(null), 1000);
    return frontElement;
  }, [queue]);

  const isEmpty = useCallback(() => {
    const empty = queue.length === 0;
    toast.info(`Queue is ${empty ? 'empty' : 'not empty'}`);
    return empty;
  }, [queue]);

  const size = useCallback(() => {
    toast.info(`Queue size: ${queue.length}`);
    return queue.length;
  }, [queue]);

  const loadSample = useCallback(() => {
    const sampleSteps: QueueStep[] = [
      { id: "init", type: "initialize", queue: [], description: "Initialize empty queue", frontIndex: -1, rearIndex: -1 },
      { id: "s1", type: "enqueue", element: "A", queue: ["A"], description: 'Enqueue "A" to rear', frontIndex: 0, rearIndex: 0 },
      { id: "s2", type: "enqueue", element: "B", queue: ["A", "B"], description: 'Enqueue "B" to rear', frontIndex: 0, rearIndex: 1 },
      { id: "s3", type: "enqueue", element: "C", queue: ["A", "B", "C"], description: 'Enqueue "C" to rear', frontIndex: 0, rearIndex: 2 },
      { id: "s4", type: "dequeue", element: "A", queue: ["B", "C"], description: 'Dequeue "A" from front', frontIndex: 0, rearIndex: 1 },
      { id: "s5", type: "enqueue", element: "D", queue: ["B", "C", "D"], description: 'Enqueue "D" to rear', frontIndex: 0, rearIndex: 2 },
      { id: "s6", type: "dequeue", element: "B", queue: ["C", "D"], description: 'Dequeue "B" from front', frontIndex: 0, rearIndex: 1 },
      { id: "s7", type: "dequeue", element: "C", queue: ["D"], description: 'Dequeue "C" from front', frontIndex: 0, rearIndex: 0 }
    ];
    
    setSteps(sampleSteps);
    setCurrentStep(0);
    setQueue([]);
    setIsPlaying(false);
    toast.success("Sample operations loaded!");
  }, []);

  const clear = useCallback(() => {
    setQueue([]);
    setSteps([{ id: "init", type: "initialize", queue: [], description: "Queue cleared", frontIndex: -1, rearIndex: -1 }]);
    setCurrentStep(0);
    setIsPlaying(false);
    toast.success("Queue cleared!");
  }, []);

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && currentStep < steps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => {
          const next = prev + 1;
          if (next >= steps.length - 1) {
            setIsPlaying(false);
          }
          return next;
        });
      }, playSpeed);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, steps.length, playSpeed]);

  // Update queue when step changes
  useEffect(() => {
    if (steps[currentStep]) {
      setQueue(steps[currentStep].queue);
      if (steps[currentStep].element) {
        setActiveElement(steps[currentStep].element);
        setTimeout(() => setActiveElement(null), 800);
      }
    }
  }, [currentStep, steps]);

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);
  const next = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    setCurrentStep(Math.max(0, Math.min(step, steps.length - 1)));
    setIsPlaying(false);
  };

  return (
    <div className="space-y-8">
      {/* Main Queue Display */}
      <div className="queue-container">
        <QueueDisplay 
          queue={queue}
          activeElement={activeElement}
          frontIndex={steps[currentStep]?.frontIndex ?? -1}
          rearIndex={steps[currentStep]?.rearIndex ?? -1}
        />
      </div>

      {/* Control Panel */}
      <ControlPanel
        isPlaying={isPlaying}
        canPlay={currentStep < steps.length - 1}
        canPrev={currentStep > 0}
        canNext={currentStep < steps.length - 1}
        currentStep={currentStep}
        totalSteps={steps.length}
        currentDescription={steps[currentStep]?.description ?? ""}
        onPlay={play}
        onPause={pause}
        onPrev={prev}
        onNext={next}
        onGoToStep={goToStep}
        playSpeed={playSpeed}
        onSpeedChange={setPlaySpeed}
      />

      {/* Input Panel */}
      <InputPanel
        onEnqueue={enqueue}
        onDequeue={dequeue}
        onPeek={peek}
        onIsEmpty={isEmpty}
        onSize={size}
        onLoadSample={loadSample}
        onClear={clear}
        queueLength={queue.length}
      />

      {/* Theory Section */}
      <TheorySection />
    </div>
  );
};