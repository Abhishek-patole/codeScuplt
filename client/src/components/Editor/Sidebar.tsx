import React from "react";
import { type CodeFile } from "../../lib/api";

interface SidebarProps {
  files: CodeFile[];
  activeId: string | null;
  editingId: string | null;
  error: string;
  createNew: () => void;
  saveCurrent: () => void;
  remove: (id: string) => void;
  setActiveId: (id: string) => void;
  setEditingId: (id: string | null) => void;
  setActivePatch: (patch: Partial<CodeFile>) => void;
  saving: boolean;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  files,
  activeId,
  editingId,
  error,
  createNew,
  saveCurrent,
  remove,
  setActiveId,
  setEditingId,
  setActivePatch,
  saving,
  sidebarOpen,
  setSidebarOpen,
}) => {
  return (
    <aside style={{ padding: 12, borderRight: "1px solid #1F2937", background: "#0B1428" }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 12, justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={createNew}>➕ New</button>
          <button onClick={saveCurrent} disabled={!activeId || saving}>
            {saving ? "Saving…" : "💾 Save"}
          </button>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? "⏪" : "⏩"}
          </button>
        </div>
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div style={{ display: "grid", gap: 6 }}>
        {files.map((f) => (
          <div
            key={f._id}
            onClick={() => editingId !== f._id && setActiveId(f._id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "6px",
              background: f._id === activeId ? "#111827" : "transparent",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            {editingId === f._id ? (
              <input
                value={f.title}
                autoFocus
                onChange={(e) => setActivePatch({ title: e.target.value })}
                onBlur={() => setEditingId(null)}
              />
            ) : (
              <span style={{ flex: 1 }}>{f.title}</span>
            )}
            <button onClick={() => setEditingId(f._id)}>✏️</button>
            <button onClick={() => remove(f._id)}>🗑️</button>
          </div>
        ))}
        {files.length === 0 && <div>No files yet. Create one!</div>}
      </div>
    </aside>
  );
};

export default Sidebar;
