import { useParams } from "react-router-dom";
import { useEffect } from "react";
import BubbleSort from "./sorting algorithm/BubbleSort";
import BinarySearch from "./sorting algorithm/BinarySearch";
import Stack from "./stack animation/Stack";
import Queue from "./queue/Queue";

const AlgorithmPlayer: React.FC = () => {
  const { algorithmId } = useParams<{ algorithmId: string }>();

   useEffect(() => {
    window.scrollTo(0, 0);
  }, [algorithmId]);

  switch (algorithmId) {
    case "bubble-sort":
      return <BubbleSort />;
    case "binary-search":
      return <BinarySearch />;
    case "stack":
      return < Stack/>;
    case "queue":
      return < Queue/>;
    default:
      return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h2>🚧 Visualization not available</h2>
          <p>Algorithm "{algorithmId}" is not implemented yet.</p>
        </div>
      );
  }
};

export default AlgorithmPlayer;
