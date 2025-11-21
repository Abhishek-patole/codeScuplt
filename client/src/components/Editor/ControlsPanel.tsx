import React from "react";

interface ControlsPanelProps {
  visualSteps: any[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
  isPlaying: boolean;
  setIsPlaying: (play: boolean) => void;
  speed: number;
  setSpeed: (speed: number) => void;
}

const ControlsPanel: React.FC<ControlsPanelProps> = ({
  visualSteps,
  currentStep,
  setCurrentStep,
  isPlaying,
  setIsPlaying,
  speed,
  setSpeed,
}) => {
  return (
    <section style={{ marginTop: 12 }}>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={() => setCurrentStep(Math.max(currentStep - 1, 0))}>
          ◀️ Prev
        </button>
        <button
          onClick={() =>
            setCurrentStep(Math.min(currentStep + 1, visualSteps.length - 1))
          }
        >
          Next ▶️
        </button>
        <button onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? "⏸️ Pause" : "▶️ Play"}
        </button>
        <button
          onClick={() => {
            setIsPlaying(false);
            setCurrentStep(0);
          }}
        >
          ⏹️ Reset
        </button>
        <label>
          Speed (ms):
          <input
            type="number"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
        </label>
        <input
          type="range"
          min={0}
          max={visualSteps.length - 1}
          value={currentStep}
          onChange={(e) => setCurrentStep(Number(e.target.value))}
        />
        <span>
          Step {currentStep + 1} / {visualSteps.length}
        </span>
      </div>
    </section>
  );
};

export default ControlsPanel;
