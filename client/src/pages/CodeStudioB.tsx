import React, { useEffect, useMemo, useRef, useState } from "react";
import { useApi, type CodeFile } from "../lib/api";
import Sidebar from "../components/Editor/Sidebar";
import HeaderBar from "../components/Editor/HeaderBar";
import EditorPanel from "../components/Editor/EditorPanel";
import VisualizerPanel from "../components/Editor/VisualizerPanel";
import ControlsPanel from "../components/Editor/ControlsPanel";

declare global {
  interface Window {
    loadPyodide: (options?: { indexURL?: string }) => Promise<any>;
  }
}

const CodeStudioB: React.FC = () => {
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

  // Sidebar
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Pyodide + Visualizer states
  const [pyodide, setPyodide] = useState<any>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [visualSteps, setVisualSteps] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const intervalRef = useRef<any>(null);

  // --- Load Files from API ---
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

  // --- Inject Python Tracker ---
  useEffect(() => {
    if (!pyodide) return;
    const trackerCode = `...`; // same tracker code from your original
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

  // --- Auto Play ---
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

  // --- Keyboard Navigation ---
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

  return (
    <div style={{ height: "100vh", display: "grid", gridTemplateColumns: sidebarOpen ? "280px 1fr" : "1fr" }}>
      {/* Sidebar */}
      {sidebarOpen && (
        <Sidebar
          files={files}
          activeId={activeId}
          editingId={editingId}
          error={error}
          createNew={createNew}
          saveCurrent={saveCurrent}
          remove={remove}
          setActiveId={setActiveId}
          setEditingId={setEditingId}
          setActivePatch={setActivePatch}
          saving={saving}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      )}

      {/* Main */}
      <main style={{ display: "grid", gridTemplateRows: "56px 1fr" }}>
        <HeaderBar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          active={active}
          setActivePatch={setActivePatch}
          runCode={runCode}
        />

        <div style={{ display: "grid", gridTemplateColumns: sidebarOpen ? "1fr" : "1fr 1fr", gap: 12, padding: 12 }}>
          <EditorPanel active={active} setActivePatch={setActivePatch} />
          {active?.language === "python" && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <VisualizerPanel
                logs={logs}
                visualSteps={visualSteps}
                currentStep={currentStep}
              />
              {visualSteps.length > 0 && (
                <ControlsPanel
                  visualSteps={visualSteps}
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                  speed={speed}
                  setSpeed={setSpeed}
                />
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CodeStudioB;
