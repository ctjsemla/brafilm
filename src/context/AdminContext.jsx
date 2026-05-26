import { createContext, useContext, useState, useCallback } from 'react'

const AdminContext = createContext(null)
const STORAGE_KEY = 'brafilm_admin_session'

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'admin@brafilm.com'
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'brafilm2026'

function loadSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    if (data?.email === ADMIN_EMAIL) return data
    return null
  } catch {
    return null
  }
}

export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(loadSession)

  const login = useCallback((email, password) => {
    const normalized = email?.trim().toLowerCase()
    if (normalized === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD) {
      const session = { email: ADMIN_EMAIL, name: 'Admin', loggedInAt: Date.now() }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
      setAdmin(session)
      return { ok: true }
    }
    return { ok: false, error: 'Invalid email or password.' }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setAdmin(null)
  }, [])

  return (
    <AdminContext.Provider value={{ admin, isAdmin: !!admin, login, logout }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider')
  return ctx
}
