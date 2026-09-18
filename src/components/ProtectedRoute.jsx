import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {

  const usuarioLogado = JSON.parse(
    localStorage.getItem('usuarioLogado')
  )

  if (!usuarioLogado) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute