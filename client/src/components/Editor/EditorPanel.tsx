import React from "react";
import { Editor } from "@monaco-editor/react";
import { type CodeFile } from "../../lib/api";

interface EditorPanelProps {
  active: CodeFile | null;
  setActivePatch: (patch: Partial<CodeFile>) => void;
}

const EditorPanel: React.FC<EditorPanelProps> = ({ active, setActivePatch }) => {
  return (
    <section style={{ border: "1px solid #1F2937", borderRadius: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px" }}>
        <span>Editor</span>
        <span>{active?.language?.toUpperCase() || ""}</span>
      </div>
      <div>
        {active ? (
          <Editor
            height="400px"
            theme="vs-dark"
            language={active.language}
            value={active.content}
            onChange={(val) => setActivePatch({ content: val ?? "" })}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
            }}
          />
        ) : (
          <div>Select or create a file to start coding.</div>
        )}
      </div>
    </section>
  );
};

export default EditorPanel;
