import { QueueVisualizer } from "@/components/Queue/QueueVisualizer";
import "@/styles/queue.css"

const Queue = () => {
  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            Queue Visualizer
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Interactive queue data structure visualization with smooth animations. 
            Learn how FIFO (First In, First Out) operations work step by step.
          </p>
        </header>
        
        <QueueVisualizer />
      </div>
    </div>
  );
};

export default Queue;