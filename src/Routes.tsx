import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { ClientDashboard, AdminDashboard, AdminSignin } from '@/screens'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* =============================================================== */}

        {/* <Route path="/" element={<Navigate to="/" />} /> */}
        <Route path="*" element={<Navigate to="/" />} />

        {/* =============================================================== */}

        <Route path="/" element={<ClientDashboard />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/entrar" element={<AdminSignin />} />

        {/* =============================================================== */}
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes

// =========================================== ROUTES

// interface RouteProps {
//   isAuthenticated: boolean
//   children: React.ReactNode
// }

// const PrivateRoute = ({ isAuthenticated, children }: RouteProps) => {
//   if (!isAuthenticated) {
//     return <Navigate to="/" replace />
//   }

//   return children
// }

// const PublicRoute = ({ isAuthenticated, children }: RouteProps) => {
//   if (isAuthenticated) {
//     return <Navigate to="/" />
//   }

//   return children
// }
