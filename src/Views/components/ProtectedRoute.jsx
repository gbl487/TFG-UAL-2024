import { useEffect, useState } from 'react'
import { useAuth } from 'src/Controllers/context/userContext'
import AsisegLoader from './Buttons/AsisegLoader'
const ProtectedRoute = ({ children }) => {
  const { usuario } = useAuth()
  const [loading, setLoading] = useState(true)
  console.log(usuario)

  useEffect(() => {
    if (typeof usuario === 'undefined') {
      setLoading(true)
    } else {
      setLoading(false)
      if (usuario === null && window) {
        window.location.href = '/'
      }
    }
  }, [usuario])

  return (
    <>
      {loading ? (
        <div className="flex w-full flex-col h-screen justify-center content-center">
          <AsisegLoader showLogo={true} />
        </div>
      ) : (
        children
      )}
    </>
  )
}
export default ProtectedRoute
