import { useState, useEffect, useRef } from "react";
import { Editor } from "@monaco-editor/react";
import styles from "../../styles/CodeEditor.module.css";

const CodeEditor = ({ onRun, highlightLine }) => {
  // ✅ Initialize code state properly to avoid uncontrolled-to-controlled warnings
  const [code, setCode] = useState("// Write your JavaScript code here");
  const editorRef = useRef(null);
  const decorationsRef = useRef([]);

  // ✅ Highlight line effect
  useEffect(() => {
    const editorObj = editorRef.current;
    if (!editorObj) return;

    const { editor, monaco } = editorObj;

    if (editor && monaco && highlightLine !== null) {
      decorationsRef.current = editor.deltaDecorations(
        decorationsRef.current,
        [
          {
            range: new monaco.Range(highlightLine, 1, highlightLine, 1),
            options: {
              isWholeLine: true,
              className: styles.lineHighlight || "lineHighlight", // safer handling
            },
          },
        ]
      );
      editor.revealLineInCenter(highlightLine);
    } else if (editor) {
      decorationsRef.current = editor.deltaDecorations(decorationsRef.current, []);
    }
  }, [highlightLine]);

  // ✅ Keep a safe ref to editor + monaco
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = { editor, monaco };
  };

  return (
    <div className={styles.editorContainer}>
      <div className={styles.editorHeader}>
        <h2 className={styles.editorTitle}>Code Editor</h2>
        <button className={styles.runButton} onClick={() => onRun(code)}>
          ▶️ Run Code
        </button>
      </div>

      <div className={styles.editorWrapper}>
        <Editor
          height="400px"
          language="javascript"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || "")}
          onMount={handleEditorDidMount}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: "off",
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
