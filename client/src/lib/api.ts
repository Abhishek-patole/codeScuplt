import { useAuth } from '@clerk/clerk-react'


const API_BASE = import.meta.env.VITE_API_BASE_URL


export interface CodeFile {
_id: string
title: string
language: string
content: string
createdAt: string
updatedAt: string
}


export function useApi() {
const { getToken } = useAuth()


async function request<T>(path: string, { method = 'GET', body }: { method?: string; body?: any } = {}): Promise<T> {
const token = await getToken()
const res = await fetch(`${API_BASE}${path}`, {
method,
headers: {
'Content-Type': 'application/json',
Authorization: `Bearer ${token}`,
},
body: body ? JSON.stringify(body) : undefined,
})
if (!res.ok) {
const text = await res.text()
throw new Error(text || `Request failed: ${res.status}`)
}
return res.status === 204 ? (null as any) : res.json()
}


return {
me: () => request('/users/me'),
listFiles: (): Promise<CodeFile[]> => request('/files'),
createFile: (payload: Partial<CodeFile>): Promise<CodeFile> => request('/files', { method: 'POST', body: payload }),
getFile: (id: string): Promise<CodeFile> => request(`/files/${id}`),
updateFile: (id: string, payload: Partial<CodeFile>): Promise<CodeFile> => request(`/files/${id}`, { method: 'PUT', body: payload }),
deleteFile: (id: string): Promise<void> => request(`/files/${id}`, { method: 'DELETE' }),
}
}