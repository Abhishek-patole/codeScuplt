import React, { useEffect, useMemo, useRef, useState } from "react";
import { useApi, type CodeFile } from "../lib/api";
import { Editor } from "@monaco-editor/react";
import VisualizerWithAnimatedBlocks from "./VisualizerWithAnimatedBlocks.tsx";

declare global {
  interface Window {
    loadPyodide: (options?: { indexURL?: string }) => Promise<any>;
  }
}

const CodeStudioA: React.FC = () => {
  const api = useApi();
  const [files, setFiles] = useState<CodeFile[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = useMemo(
    () => files.find((f) => f._id === activeId) || null,
    [files, activeId]
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // --- Sidebar toggle ---
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // --- Pyodide + Visualizer states ---
  const [pyodide, setPyodide] = useState<any>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [visualSteps, setVisualSteps] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const intervalRef = useRef<any>(null);

  // --- Load Files ---
  useEffect(() => {
    (async () => {
      try {
        const data = await api.listFiles();
        setFiles(data);
        if (data[0]) setActiveId(data[0]._id);
      } catch (e: any) {
        setError(String(e.message || e));
      }
    })();
  }, []);

  async function createNew() {
    try {
      const doc = await api.createFile({
        title: "Untitled",
        language: "javascript",
        content: "",
      });
      setFiles((prev) => [doc, ...prev]);
      setActiveId(doc._id);
    } catch (e: any) {
      setError(String(e.message || e));
    }
  }

  async function saveCurrent() {
    if (!active) return;
    setSaving(true);
    try {
      const doc = await api.updateFile(active._id, {
        title: active.title,
        language: active.language,
        content: active.content,
      });
      setFiles((prev) => prev.map((f) => (f._id === doc._id ? doc : f)));
    } catch (e: any) {
      setError(String(e.message || e));
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this file?")) return;
    try {
      await api.deleteFile(id);
      setFiles((prev) => prev.filter((f) => f._id !== id));
      if (activeId === id)
        setActiveId(files.find((f) => f._id !== id)?._id ?? null);
    } catch (e: any) {
      setError(String(e.message || e));
    }
  }

  function setActivePatch(patch: Partial<CodeFile>) {
    setFiles((prev) =>
      prev.map((f) => (f._id === activeId ? { ...f, ...patch } : f))
    );
  }

  // --- Pyodide Setup ---
  useEffect(() => {
    async function init() {
      if (window.loadPyodide) {
        setPyodide(await window.loadPyodide());
      } else {
        const script = document.createElement("script");
        script.src =
          "https://cdn.jsdelivr.net/pyodide/v0.28.0/full/pyodide.js";
        script.async = true;
        script.onload = async () => setPyodide(await window.loadPyodide());
        document.body.appendChild(script);
      }
    }
    init();
  }, []);

  // --- Tracker setup ---
  useEffect(() => {
    if (!pyodide) return;

    const trackerCode = `
import sys, json
SKIP_NAMES = {"sys","json","copy","UniversalTracker","tracker","auto_visualize"}
def safe(v):
    try:
        if isinstance(v, (int, float, str, bool)) or v is None:
            return v
        if isinstance(v, (list, tuple)):
            return [safe(x) for x in v]
        if isinstance(v, dict):
            return {str(k): safe(x) for k,x in v.items()}
        return str(v)
    except:
        return str(v)
def is_user_var(name, val):
    if name.startswith("__"): return False
    if name in SKIP_NAMES: return False
    if callable(val): return False
    return True
class UniversalTracker:
    def __init__(self):
        self.steps = []
        self.last = {}
    def emit_step(self, title, variables, changed, operation="", visit=None, found=None, compare=None):
        step = {
            "title": title,
            "variables": variables,
            "changed": list(changed),
            "operation": operation,
            "visit": visit,
            "found": found,
            "compareOperation": compare
        }
        self.steps.append(step)
    def track(self, frame, event, arg):
        if event != "line": return self.track
        cur = {k: safe(v) for k,v in frame.f_locals.items() if is_user_var(k,v)}
        changed = {k for k,v in cur.items() if k not in self.last or self.last[k]!=v}
        visit_info = None
        found_info = None
        compare_op = None
        for name, val in cur.items():
            if isinstance(val, list):
                for idx_var in ["i","j","mid","low","high"]:
                    if idx_var in cur:
                        try:
                            idx = int(cur[idx_var])
                            if 0 <= idx < len(val):
                                visit_info = {"from_array":name,"index":idx,"value":val[idx]}
                                if "target" in cur:
                                    compare_op = "=="
                                    if val[idx] == cur["target"]:
                                        found_info = {"array":name,"index":idx,"value":val[idx]}
                        except: pass
        operation_str = " | ".join([f"assign {k}" for k in changed]) if changed else ""
        if changed or visit_info or found_info:
            self.emit_step(f"Line {frame.f_lineno}", cur, changed, operation_str, visit_info, found_info, compare_op)
        self.last = dict(cur)
        return self.track
def auto_visualize(code):
    tracker = UniversalTracker()
    _orig = sys.gettrace()
    sys.settrace(tracker.track)
    try:
        exec(code, {})
    finally:
        sys.settrace(_orig)
    for s in tracker.steps:
        sys.stdout.write("__VIS__"+json.dumps(s)+"\\n")
`;
    pyodide.runPython(trackerCode);
  }, [pyodide]);

  // --- Run Code ---
  const runCode = async () => {
    if (!pyodide || !active) return;
    setLogs([]);
    setVisualSteps([]);
    setCurrentStep(0);
    setIsPlaying(false);

    const rawLogs: string[] = [];
    pyodide.setStdout({
      batched: (s: string) =>
        s.split(/\r?\n/).forEach((l) => l && rawLogs.push(l)),
    });
    pyodide.setStderr({
      batched: (s: string) =>
        s.split(/\r?\n/).forEach((l) => l && rawLogs.push("ERR: " + l)),
    });

    try {
      await pyodide.runPythonAsync(
        `auto_visualize(${JSON.stringify(active.content)})`
      );
      const steps = rawLogs
        .filter((l) => l.startsWith("__VIS__"))
        .map((l) => JSON.parse(l.replace("__VIS__", "")));
      setVisualSteps(steps);
      setLogs(rawLogs.filter((l) => !l.startsWith("__VIS__")));
      setCurrentStep(0);
    } catch (err: any) {
      setLogs((prev) => [...prev, "Runtime error: " + err]);
    }
  };

  // --- Auto play ---
  useEffect(() => {
    if (isPlaying && visualSteps.length) {
      intervalRef.current = setInterval(() => {
        setCurrentStep((s) => {
          if (s < visualSteps.length - 1) return s + 1;
          setIsPlaying(false);
          return s;
        });
      }, Math.max(50, speed));
    } else clearInterval(intervalRef.current);
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, visualSteps, speed]);

  // --- Keyboard navigation ---
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!visualSteps.length) return;
      if (e.key === "ArrowRight")
        setCurrentStep((s) => Math.min(s + 1, visualSteps.length - 1));
      else if (e.key === "ArrowLeft")
        setCurrentStep((s) => Math.max(s - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visualSteps]);

  const renderFeedback = (step: any) => {
    if (!step) return null;
    if (step.found)
      return (
        <span style={{ color: "#34D399" }}>
          🎉 Found {step.found.value} at index {step.found.index}
        </span>
      );
    if (step.visit)
      return (
        <span style={{ color: "#E5E7EB" }}>
          🔎 Checking {step.visit.from_array}[{step.visit.index}] ={" "}
          {step.visit.value} {step.compareOperation || ""}
        </span>
      );
    if (step.operation) return <span style={{ color: "#93C5FD" }}>ℹ️ {step.operation}</span>;
    return null;
  };

  // ---------- Styles ----------
  const styles = {
    app: {
      height: "100vh",
      display: "grid",
      gridTemplateColumns: sidebarOpen ? "280px 1fr" : "1fr",
      background: "#0B1020",
      color: "#E5E7EB",
      overflow: "hidden" ,
      transition: "grid-template-columns 0.3s ease",
    },
    sidebar: {
      borderRight: "1px solid #1F2937",
      background: "linear-gradient(180deg, #0B1428 0%, #0B1020 100%)",
      padding: 12,
      overflowY: "auto" as const,
    },
    toggleBtn: {
      position: "absolute" as const,
      left: sidebarOpen ? 250 : 10,
      top: 10,
      zIndex: 10,
      background: "#1F2937",
      border: "1px solid #374151",
      borderRadius: "50%",
      width: 34,
      height: 34,
       padding: "8px 10px",
      color: "#E5E7EB",
      cursor: "pointer",
      transition: "left 0.3s ease",
    },
    main: {
      display: "grid",
      gridTemplateRows: "56px 1fr",
       overflowY: "auto" as const,   // ✅ change from hidden → auto
  overflowX: "hidden" as const,
    },
    mainSplit: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12,
      overflowY: "auto" as const,
    },
    header: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "10px 14px",
      borderBottom: "1px solid #1F2937",
      background: "#0D1224",
      position: "sticky" as const,
      top: 0,
      zIndex: 1,
    },
    panel: {
      background: "#0D1426",
      border: "1px solid #1F2937",
      borderRadius: 12,
      overflow: "hidden" as const,
    },
    editorWrap: {
      height: "100%",
      display: "grid",
      gridTemplateRows: "40px minmax(0, 1fr)",
    },
    editorHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "8px 12px",
      borderBottom: "1px solid #1F2937",
      background: "#0F172A",
      color: "#CBD5E1",
      fontSize: 13,
    },
    editor: {
      minHeight: 0,
    },
    vizPanel: {
      background: "#0B1324",
      border: "1px solid #1F2937",
      borderRadius: 12,
      padding: 12,
      overflow: "auto" as const,
    },
    controlsPanel: {
      background: "#0B1324",
      border: "1px solid #1F2937",
      borderRadius: 12,
      padding: 12,
      marginTop: 12,
    },
    button: {
      background: "linear-gradient(180deg, #1F2937 0%, #111827 100%)",
      border: "1px solid #374151",
      color: "#E5E7EB",
      padding: "8px 10px",
      borderRadius: 8,
      cursor: "pointer",
    },
    buttonGhost: {
      background: "transparent",
      border: "1px solid #374151",
      color: "#E5E7EB",
      padding: "6px 8px",
      borderRadius: 8,
      cursor: "pointer",
    },
    input: {
      flex: 1,
      background: "#0F172A",
      border: "1px solid #1F2937",
      color: "#E5E7EB",
      borderRadius: 8,
      padding: "6px 8px",
      outline: "none",
    },
    select: {
      background: "#0F172A",
      color: "#E5E7EB",
      border: "1px solid #1F2937",
      borderRadius: 8,
      padding: "6px 8px",
    },
    range: {
      width: 260,
      accentColor: "#60A5FA",
    },
    label: { color: "#CBD5E1", fontSize: 13 },
    logs: {
      background: "#0B1020",
      color: "#D1FAE5",
      padding: 12,
      borderRadius: 8,
      border: "1px solid #1F2937",
      marginTop: 12,
      whiteSpace: "pre-wrap" as const,
    },
  };

  return (
    <div style={styles.app}>
      {/* Sidebar */}
      {sidebarOpen && (
        <aside style={styles.sidebar}>
          <div style={{ display: "flex", gap: 8, marginBottom: 12, justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={styles.button} onClick={createNew}>➕ New</button>
              <button style={styles.button} onClick={saveCurrent} disabled={!active || saving}>
                {saving ? "Saving…" : "💾 Save"}
              </button>
              {/* Toggle button (when sidebar is open, show here at right of save) */}
            <button style={styles.button} onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? "⏪" : "⏩"}
            </button>
            </div>
            {/* Toggle button (when sidebar is open, show here at right of save) */}
            {/* <button style={styles.toggleBtn} onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? "⏪" : "⏩"}
            </button> */}
          </div>
          {error && (
            <div style={{ color: "#FCA5A5", marginBottom: 8, fontSize: 13 }}>
              {error}
            </div>
          )}
          <div style={{ display: "grid", gap: 6 }}>
            {files.map((f) => (
              <div
                key={f._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px",
                  background: f._id === activeId ? "#111827" : "transparent",
                  borderRadius: 8,
                  cursor: "pointer",
                  border: f._id === activeId ? "1px solid #1F2937" : "1px solid transparent",
                }}
                onClick={() => {
                  if (editingId !== f._id) setActiveId(f._id);
                }}
              >
                {editingId === f._id ? (
                  <input
                    value={f.title}
                    autoFocus
                    onChange={(e) => setActivePatch({ title: e.target.value })}
                    onBlur={() => setEditingId(null)}
                    style={styles.input}
                  />
                ) : (
                  <span style={{ flex: 1 }}>{f.title}</span>
                )}
                <button style={styles.buttonGhost} onClick={() => setEditingId(f._id)}>✏️</button>
                <button style={styles.buttonGhost} onClick={() => remove(f._id)}>🗑️</button>
              </div>
            ))}
            {files.length === 0 && <div style={{ color: "#9CA3AF" }}>No files yet. Create one!</div>}
          </div>
        </aside>
      )}

      {/* Main */}
      <main style={styles.main}>
        {/* Header */}
       <header
  style={{
    ...styles.header,
    display: "flex",
    alignItems: "center",
    gap: 12,
  }}
>
  {/* Toggle button (when sidebar is closed, show here before dropdown) */}
  {!sidebarOpen && (
    <button style={styles.toggleBtn} onClick={() => setSidebarOpen(!sidebarOpen)}>
      {sidebarOpen ? "⏪" : "⏩"}
    </button>
  )}

  {/* Language selector */}
  {active && (
    <select
      value={active.language}
      onChange={(e) => setActivePatch({ language: e.target.value })}
      style={styles.select}
    >
      <option value="javascript">JavaScript</option>
      <option value="python">Python</option>
    </select>
  )}

  {/* File title */}
  <strong
    style={{
      fontSize: 18,
      color: "#F3F4F6",
      flex: 1, // pushes run button to the right
    }}
  >
    {active?.title || "No file selected"}
  </strong>

  {/* Run button */}
  {active?.language === "python" && (
    <button style={styles.button} onClick={runCode}>
      🚀 Run & Visualize
    </button>
  )}
</header>


        {/* Body */}
        <div style={sidebarOpen ? { padding: 12 } : styles.mainSplit}>
          {/* Editor */}
          <section style={{ ...styles.panel, ...styles.editorWrap }}>
            <div style={styles.editorHeader}>
              <span>Editor</span>
              <span style={{ opacity: 0.7, fontSize: 12 }}>
                {active?.language?.toUpperCase() || ""}
              </span>
            </div>
            <div style={styles.editor}>
              {active ? (
                <Editor
                  height="100%"
                  theme="vs-dark"
                  language={active.language}
                  value={active.content}
                  onChange={(val) => setActivePatch({ content: val ?? "" })}
                  options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    fontLigatures: true,
                    smoothScrolling: true,
                    scrollbar: { verticalScrollbarSize: 10, horizontalScrollbarSize: 10 },
                  }}
                />
              ) : (
                <div style={{ padding: 24, color: "#9CA3AF" }}>
                  Select or create a file to start coding.
                </div>
              )}
            </div>
          </section>


          {/* Visualization + Controls */}
         {active?.language === "python" && (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <section style={styles.vizPanel}>
      {logs.length > 0 && <div style={styles.logs}>{logs.join("\n")}</div>}

      {visualSteps.length > 0 ? (
        <>
          <VisualizerWithAnimatedBlocks step={visualSteps[currentStep]} />
          <div style={{ marginTop: 12 }}>{renderFeedback(visualSteps[currentStep])}</div>
        </>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: 24,
            background: "#121A30",
            borderRadius: 12,
            border: "1px dashed #334155",
            color: "#CBD5E1",
          }}
        >
          <h3 style={{ margin: 0 }}>No Visualization Yet</h3>
          <p style={{ marginTop: 6 }}>Write Python code and click “Run & Visualize”.</p>
        </div>
      )}
    </section>

    {visualSteps.length > 0 && (
      <section style={styles.controlsPanel}>
        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            overflowX: "auto",       // ✅ makes slider/buttons scrollable
            paddingBottom: 6,        // space for scrollbar
          }}
        >
          <button
            style={styles.button}
            onClick={() => setCurrentStep((s) => Math.max(s - 1, 0))}
          >
            ◀️ Prev
          </button>
          <button
            style={styles.button}
            onClick={() =>
              setCurrentStep((s) => Math.min(s + 1, visualSteps.length - 1))
            }
          >
            Next ▶️
          </button>
          <button style={styles.button} onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? "⏸️ Pause" : "▶️ Play"}
          </button>
          <button
            style={styles.buttonGhost}
            onClick={() => {
              setIsPlaying(false);
              setCurrentStep(0);
            }}
          >
            ⏹️ Reset
          </button>

          <label style={{ ...styles.label, marginLeft: 6, whiteSpace: "nowrap" }}>
            Speed (ms):
            <input
              type="number"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              style={{ ...styles.input, width: 90, marginLeft: 8 }}
            />
          </label>

          <input
            type="range"
            min={0}
            max={visualSteps.length - 1}
            value={currentStep}
            onChange={(e) => setCurrentStep(Number(e.target.value))}
            style={{ ...styles.range, flex: 1 }}
          />
          <span style={{ color: "#9CA3AF", whiteSpace: "nowrap" }}>
            Step {currentStep + 1} / {visualSteps.length}
          </span>
        </div>
      </section>
    )}
  </div>
)}

        </div>
      </main>
    </div>
  );
};

export default CodeStudioA;
