import React from 'react';
import { useLinkedList } from '@/hooks/useLinkedList';
import { TypeSelector } from './TypeSelector';
import { OperationPanel } from './OperationPanel';
import { AnimationCanvas } from './AnimationCanvas';
import { AnimationControls } from './AnimationControls';
import { StepIndicator } from './StepIndicator';
import { TheorySection } from './TheorySection';

export const LinkedListVisualizer = () => {
  const {
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
  } = useLinkedList();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-gradient-surface border-b border-border/50 shadow-subtle">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-3">
              Linked List Visualizer
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Interactive visualization of linked list data structures with smooth animations
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Type Selection */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">List Type</h2>
          <TypeSelector
            currentType={state.type}
            onTypeChange={changeListType}
            onLoadSample={loadSample}
          />
        </section>

        {/* Operations */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Operations</h2>
          <OperationPanel
            onInsert={insertNode}
            onDelete={deleteNode}
            disabled={state.isPlaying}
            listType={state.type}
          />
        </section>

        {/* Animation Canvas */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Visualization</h2>
          <AnimationCanvas
            state={state}
            className="bg-card border border-border rounded-xl shadow-medium p-8"
          />
        </section>

        {/* Step Indicator */}
        {state.animationSteps.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Current Step</h2>
            <StepIndicator
              steps={state.animationSteps}
              currentStep={state.currentStep}
            />
          </section>
        )}

        {/* Animation Controls */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Animation Controls</h2>
          <AnimationControls
            isPlaying={state.isPlaying}
            isPaused={state.isPaused}
            canPlay={state.animationSteps.length > 0}
            canStep={state.animationSteps.length > 0}
            currentStep={state.currentStep}
            totalSteps={state.animationSteps.length}
            speed={state.speed}
            onPlay={playAnimation}
            onPause={pauseAnimation}
            onNext={nextStep}
            onPrev={prevStep}
            onSpeedChange={setSpeed}
            onReset={reset}
          />
        </section>

        {/* Theory Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Theory</h2>
          <TheorySection currentType={state.type} />
        </section>
      </div>
    </div>
  );
};