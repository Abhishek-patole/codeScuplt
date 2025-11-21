import React from "react";
import VisualizerWithAnimatedBlocks from "../../pages/VisualizerWithAnimatedBlocks";

interface VisualizerPanelProps {
  logs: string[];
  visualSteps: any[];
  currentStep: number;
}

const VisualizerPanel: React.FC<VisualizerPanelProps> = ({
  logs,
  visualSteps,
  currentStep,
}) => {
  const step = visualSteps[currentStep];

  const renderFeedback = (step: any) => {
    if (!step) return null;
    if (step.found) {
      return (
        <span style={{ color: "green" }}>
          🎉 Found {step.found.value} at index {step.found.index}
        </span>
      );
    }
    if (step.visit) {
      return (
        <span>
          🔎 Checking {step.visit.from_array}[{step.visit.index}] ={" "}
          {step.visit.value}
        </span>
      );
    }
    if (step.operation) return <span>ℹ️ {step.operation}</span>;
    return null;
  };

  return (
    <section>
      {logs.length > 0 && <div>{logs.join("\n")}</div>}
      {visualSteps.length > 0 ? (
        <>
          <VisualizerWithAnimatedBlocks step={step} />
          <div>{renderFeedback(step)}</div>
        </>
      ) : (
        <div>No Visualization Yet</div>
      )}
    </section>
  );
};

export default VisualizerPanel;
