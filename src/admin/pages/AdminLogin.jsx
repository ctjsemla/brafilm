import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext.jsx'
import './AdminLogin.css'

export default function AdminLogin() {
  const { isAdmin, login } = useAdmin()
  const navigate = useNavigate()
  const [email, setEmail] = useState('admin@brafilm.com')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (isAdmin) return <Navigate to="/admin" replace />

  const handleSubmit = (e) => {
    e.preventDefault()
    const result = login(email, password)
    if (result.ok) {
      navigate('/admin', { replace: true })
    } else {
      setError(result.error)
    }
  }

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <div className="admin-login__brand">
          <span className="admin-login__logo">Brafilm</span>
          <span className="admin-login__badge">Admin</span>
        </div>
        <h1 className="admin-login__title">Sign in to dashboard</h1>
        <p className="admin-login__sub">Analytics &amp; traffic overview</p>

        <form className="admin-login__form" onSubmit={handleSubmit}>
          {error && <p className="admin-login__error">{error}</p>}
          <label className="admin-login__field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
            />
          </label>
          <label className="admin-login__field">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </label>
          <button type="submit" className="admin-login__btn">
            Sign in
          </button>
        </form>

        <p className="admin-login__hint">
          Demo: <code>admin@brafilm.com</code> / <code>brafilm2026</code>
        </p>
        <a href="/" className="admin-login__back">
          ← Back to site
        </a>
      </div>
    </div>
  )
}
