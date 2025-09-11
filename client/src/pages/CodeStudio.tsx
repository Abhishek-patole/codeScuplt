import React, { useEffect, useMemo, useState } from 'react'

import { useApi, type CodeFile } from '../lib/api'
import { Editor } from '@monaco-editor/react'


const CodeStudio: React.FC = () => {
const api = useApi()
const [files, setFiles] = useState<CodeFile[]>([])
const [activeId, setActiveId] = useState<string | null>(null)
const active = useMemo(() => files.find(f => f._id === activeId) || null, [files, activeId])
const [saving, setSaving] = useState(false)
const [error, setError] = useState('')
const [editingId, setEditingId] = useState<string | null>(null);


useEffect(() => {
(async () => {
try {
const data = await api.listFiles()
setFiles(data)
if (data[0]) setActiveId(data[0]._id)
} catch (e: any) {
setError(String(e.message || e))
}
})()
}, [])


async function createNew() {
try {
const doc = await api.createFile({ title: 'Untitled', language: 'javascript', content: '' })
setFiles(prev => [doc, ...prev])
setActiveId(doc._id)
} catch (e: any) { setError(String(e.message || e)) }
}


async function saveCurrent() {
if (!active) return
setSaving(true)
try {
const doc = await api.updateFile(active._id, { title: active.title, language: active.language, content: active.content })
setFiles(prev => prev.map(f => f._id === doc._id ? doc : f))
} catch (e: any) { setError(String(e.message || e)) } finally { setSaving(false) }
}


async function remove(id: string) {
if (!confirm('Delete this file?')) return
try {
await api.deleteFile(id)
setFiles(prev => prev.filter(f => f._id !== id))
if (activeId === id) setActiveId(files.find(f => f._id !== id)?._id ?? null)
} catch (e: any) { setError(String(e.message || e)) }
}

function setActivePatch(patch: Partial<CodeFile>) {
    setFiles(prev => prev.map(f => f._id === activeId ? { ...f, ...patch } : f))
}


return (
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', height: 'calc(100vh - 60px)' }}>
        <aside style={{ borderRight: '1px solid #eee', padding: 12, overflow: 'auto' }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                <button onClick={createNew}>➕ New file</button>
                <button onClick={saveCurrent} disabled={!active || saving}>{saving ? 'Saving…' : '💾 Save'}</button>
            </div>
            {error && <div style={{ color: 'crimson', marginBottom: 8 }}>{error}</div>}
           <div>
  {files.map(f => (
    <div
      key={f._id}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 4px",
        background: f._id === activeId ? "#f5f5f5" : "transparent",
        borderRadius: 6,
        cursor: "pointer",
      }}
      onClick={() => {
        if (editingId !== f._id) {
          setActiveId(f._id); // only open in editor if not renaming
        }
      }}
    >
      {editingId === f._id ? (
        <input
          value={f.title}
          autoFocus
          onChange={(e) => {
            setActivePatch({ title: e.target.value });
          }}
          onBlur={() => {
            setEditingId(null); // stop editing when blurred
          }}
          style={{
            flex: 1,
            border: "1px solid #ddd",
            borderRadius: 6,
            padding: "4px 6px",
          }}
        />
      ) : (
        <span style={{ flex: 1 }}>{f.title}</span> // just show text
      )}
      <button onClick={() => setEditingId(f._id)}>✏️</button>
      <button onClick={() => remove(f._id)}>🗑️</button>
    </div>
  ))}
  {files.length === 0 && <div>No files yet. Create one!</div>}
</div>
        </aside>


        <main style={{ display: 'grid', gridTemplateRows: '48px 1fr' }}>
            <header style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px', borderBottom: '1px solid #eee' }}>
                <strong style={{ fontSize: 18 }}>{active?.title || 'No file selected'}</strong>
                {active && (
                    <select value={active.language} onChange={e => setActivePatch({ language: e.target.value })}>
                        <option value="javascript">JavaScript</option>
                       
                        <option value="python">Python</option>
                       
                    </select>
                )}
            </header>
            <section>
                {active ? (
                    <Editor
                        height="100%"
                        language={active.language}
                        value={active.content}
                        onChange={(val) => setActivePatch({ content: val ?? '' })}
                        options={{ fontSize: 14, minimap: { enabled: false } }}
                    />
                ) : (
                    <div style={{ padding: 24 }}>Select or create a file to start coding.</div>
                )}
            </section>
        </main>
    </div>
)
}


export default CodeStudio