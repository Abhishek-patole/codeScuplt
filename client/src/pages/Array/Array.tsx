import { useState, useEffect, useCallback } from "react";
import { ArrayContainer } from "@/components/Array/ArrayContainer";
import { ControlPanel } from "@/components/Array/ControlPanel";
import { InputSection } from "@/components/Array/InputSectiion";
import { TheorySection } from "@/components/Array/TheorySection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Grid3X3 } from "lucide-react";
import { toast } from "sonner";
import "@/styles/array.css"

interface ArrayStep {
  array: number[];
  operation: 'create' | 'insert' | 'delete' | 'update' | 'highlight';
  operationIndex?: number;
  activeIndex?: number;
  highlightedIndices?: number[];
  description: string;
}
const Array = () => {
  const [currentArray, setCurrentArray] = useState<number[]>([1, 2, 3, 4, 5]);
  const [steps, setSteps] = useState<ArrayStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTheory, setShowTheory] = useState(false);
  const [activeOperation, setActiveOperation] = useState<{
    type: 'insert' | 'delete' | 'update' | null;
    index: number;
  }>({
    type: null,
    index: -1
  });

  // Initialize with first step
  useEffect(() => {
    const initialStep: ArrayStep = {
      array: [...currentArray],
      operation: 'create',
      description: 'Initial array created'
    };
    setSteps([initialStep]);
    setCurrentStepIndex(0);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setTimeout(() => {
      if (currentStepIndex < steps.length - 1) {
        setCurrentStepIndex(prev => prev + 1);
      } else {
        setIsPlaying(false);
        toast.success("Animation completed!");
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIndex, steps.length]);
  const addStep = useCallback((step: ArrayStep) => {
    setSteps(prev => [...prev.slice(0, currentStepIndex + 1), step]);
    setCurrentStepIndex(prev => prev + 1);
  }, [currentStepIndex]);
  const handleArrayChange = (newArray: number[]) => {
    setCurrentArray(newArray);
    const step: ArrayStep = {
      array: [...newArray],
      operation: 'create',
      description: `Array updated to [${newArray.join(', ')}]`
    };
    setSteps([step]);
    setCurrentStepIndex(0);
    setActiveOperation({
      type: null,
      index: -1
    });
    toast.success("New array created!");
  };
  const handleInsert = (index: number, value: number) => {
    if (index < 0 || index > currentArray.length) {
      toast.error("Invalid index for insertion!");
      return;
    }
    const newArray = [...currentArray];
    newArray.splice(index, 0, value);

    // Create animation steps
    const highlightStep: ArrayStep = {
      array: [...currentArray],
      operation: 'highlight',
      activeIndex: index,
      highlightedIndices: [index],
      description: `Preparing to insert ${value} at index ${index}`
    };
    const insertStep: ArrayStep = {
      array: [...newArray],
      operation: 'insert',
      operationIndex: index,
      description: `Inserted ${value} at index ${index}. Elements shifted right.`
    };
    addStep(highlightStep);
    setTimeout(() => {
      addStep(insertStep);
      setCurrentArray(newArray);
      setActiveOperation({
        type: 'insert',
        index
      });
      setTimeout(() => setActiveOperation({
        type: null,
        index: -1
      }), 1000);
      toast.success(`Inserted ${value} at index ${index}`);
    }, 100);
  };
  const handleDelete = (index: number) => {
    if (index < 0 || index >= currentArray.length) {
      toast.error("Invalid index for deletion!");
      return;
    }
    const value = currentArray[index];
    const newArray = [...currentArray];
    newArray.splice(index, 1);

    // Create animation steps
    const highlightStep: ArrayStep = {
      array: [...currentArray],
      operation: 'highlight',
      activeIndex: index,
      highlightedIndices: [index],
      description: `Preparing to delete element ${value} at index ${index}`
    };
    const deleteStep: ArrayStep = {
      array: [...newArray],
      operation: 'delete',
      operationIndex: index,
      description: `Deleted element ${value} from index ${index}. Elements shifted left.`
    };
    addStep(highlightStep);
    setTimeout(() => {
      addStep(deleteStep);
      setCurrentArray(newArray);
      setActiveOperation({
        type: 'delete',
        index
      });
      setTimeout(() => setActiveOperation({
        type: null,
        index: -1
      }), 1000);
      toast.success(`Deleted element ${value} from index ${index}`);
    }, 100);
  };
  const handleUpdate = (index: number, value: number) => {
    if (index < 0 || index >= currentArray.length) {
      toast.error("Invalid index for update!");
      return;
    }
    const oldValue = currentArray[index];
    const newArray = [...currentArray];
    newArray[index] = value;

    // Create animation steps
    const highlightStep: ArrayStep = {
      array: [...currentArray],
      operation: 'highlight',
      activeIndex: index,
      highlightedIndices: [index],
      description: `Preparing to update element at index ${index} from ${oldValue} to ${value}`
    };
    const updateStep: ArrayStep = {
      array: [...newArray],
      operation: 'update',
      operationIndex: index,
      description: `Updated element at index ${index} from ${oldValue} to ${value}`
    };
    addStep(highlightStep);
    setTimeout(() => {
      addStep(updateStep);
      setCurrentArray(newArray);
      setActiveOperation({
        type: 'update',
        index
      });
      setTimeout(() => setActiveOperation({
        type: null,
        index: -1
      }), 1000);
      toast.success(`Updated index ${index} to ${value}`);
    }, 100);
  };
  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
      setIsPlaying(false);
    }
  };
  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      setIsPlaying(false);
    }
  };
  const handleReset = () => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
    setActiveOperation({
      type: null,
      index: -1
    });
    toast.info("Animation reset to beginning");
  };
  const handleShuffle = () => {
    const shuffled = [...currentArray].sort(() => Math.random() - 0.5);
    handleArrayChange(shuffled);
    toast.success("Array shuffled!");
  };
  const currentStep = steps[currentStepIndex];
  const displayArray = currentStep ? currentStep.array : currentArray;
  return <div className="min-h-screen p-6 space-y-8 bg-black">
      {/* Header */}
      <header className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 rounded-full bg-gradient-primary shadow-glow">
            <Grid3X3 className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Array Visualizer
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Interactive array operations with beautiful animations. Learn, visualize, and understand 
          how arrays work under the hood.
        </p>
        
        <div className="flex items-center justify-center gap-4">
          <Badge variant="secondary" className="animate-gradient">
            Real-time Visualization
          </Badge>
          <Badge variant="secondary" className="animate-gradient">
            Step-by-step Animations
          </Badge>
          <Badge variant="secondary" className="animate-gradient">
            Educational Theory
          </Badge>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Array Visualization */}
        <ArrayContainer array={displayArray} activeIndex={currentStep?.activeIndex} highlightedIndices={currentStep?.highlightedIndices || []} operation={currentStep?.operation === 'insert' ? 'insert' : currentStep?.operation === 'delete' ? 'delete' : currentStep?.operation === 'update' ? 'update' : activeOperation.type} operationIndex={currentStep?.operationIndex ?? activeOperation.index} title="Live Array Visualization" />

        {/* Current Step Info */}
        {currentStep && <div className="glass-morphism rounded-lg p-4 text-center">
            <div className="text-sm text-muted-foreground mb-1">
              Step {currentStepIndex + 1} of {steps.length}
            </div>
            <div className="text-lg font-medium">{currentStep.description}</div>
          </div>}

        {/* Controls and Input */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <InputSection onArrayChange={handleArrayChange} onInsert={handleInsert} onDelete={handleDelete} onUpdate={handleUpdate} currentArray={currentArray} />
          </div>
          <div>
            <ControlPanel isPlaying={isPlaying} onPlay={handlePlay} onPause={handlePause} onPrevious={handlePrevious} onNext={handleNext} onReset={handleReset} onShuffle={handleShuffle} canGoBack={currentStepIndex > 0} canGoForward={currentStepIndex < steps.length - 1} />
          </div>
        </div>

        {/* Theory Toggle */}
        <div className="text-center">
          <Button onClick={() => setShowTheory(!showTheory)} variant="outline" size="lg" className="glass-morphism border-accent hover:bg-accent/10">
            <BookOpen className="h-5 w-5 mr-2" />
            {showTheory ? 'Hide Theory' : 'Learn Array Theory'}
          </Button>
        </div>

        {/* Theory Section */}
        {showTheory && <div className="animate-array-in">
            <TheorySection />
          </div>}
      </div>
    </div>;
};
export default Array;