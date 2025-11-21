import React from "react";
import { type CodeFile } from "../../lib/api";

interface HeaderBarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  active: CodeFile | null;
  setActivePatch: (patch: Partial<CodeFile>) => void;
  runCode: () => void;
}

const HeaderBar: React.FC<HeaderBarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  active,
  setActivePatch,
  runCode,
}) => {
  return (
    <header style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px" }}>
      {!sidebarOpen && (
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? "⏪" : "⏩"}
        </button>
      )}

      {active && (
        <select
          value={active.language}
          onChange={(e) => setActivePatch({ language: e.target.value })}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
        </select>
      )}

      <strong style={{ flex: 1 }}>{active?.title || "No file selected"}</strong>

      {active?.language === "python" && (
        <button onClick={runCode}>🚀 Run & Visualize</button>
      )}
    </header>
  );
};

export default HeaderBar;
