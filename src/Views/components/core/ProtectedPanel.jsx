import UserPanel from '../UserPanel/UserPanel'
import ProtectedRoute from '@components/core/ProtectedRoute'

export default function ProtectedPanel({ children }) {
  return (
    <>
      <ProtectedRoute>
        <UserPanel />
        {children}
      </ProtectedRoute>
    </>
  )
}
