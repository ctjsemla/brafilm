import { Navigate, Route, Routes } from 'react-router-dom'
import { useAdmin } from '../context/AdminContext.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import './AdminApp.css'

function RequireAdmin({ children }) {
  const { isAdmin } = useAdmin()
  if (!isAdmin) return <Navigate to="/admin/login" replace />
  return children
}

export default function AdminApp() {
  return (
    <div className="admin-app">
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route
          index
          element={
            <RequireAdmin>
              <AdminDashboard />
            </RequireAdmin>
          }
        />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </div>
  )
}
