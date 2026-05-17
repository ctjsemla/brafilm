import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)
const STORAGE_KEY = 'brafilm_user'

function loadUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadUser)
  const [authModal, setAuthModal] = useState(null)
  const [authError, setAuthError] = useState('')

  const openLogin = useCallback(() => {
    setAuthError('')
    setAuthModal('login')
  }, [])

  const openRegister = useCallback(() => {
    setAuthError('')
    setAuthModal('register')
  }, [])

  const closeAuth = useCallback(() => {
    setAuthModal(null)
    setAuthError('')
  }, [])

  const login = useCallback((email, password) => {
    if (!email?.includes('@')) {
      setAuthError('E-mail inválido. Verifique e tente novamente.')
      return false
    }
    const account = { email, name: email.split('@')[0] }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(account))
    setUser(account)
    closeAuth()
    return true
  }, [closeAuth])

  const register = useCallback((name, email, password) => {
    if (!email?.includes('@')) {
      setAuthError('E-mail inválido. Verifique e tente novamente.')
      return false
    }
    const account = { email, name: name?.trim() || email.split('@')[0] }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(account))
    setUser(account)
    closeAuth()
    return true
  }, [closeAuth])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }, [])

  const requireAuth = useCallback((mode = 'register') => {
    if (user) return true
    setAuthError('')
    setAuthModal(mode === 'login' ? 'login' : 'register')
    return false
  }, [user])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        authModal,
        authError,
        openLogin,
        openRegister,
        closeAuth,
        login,
        register,
        logout,
        requireAuth,
        setAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
