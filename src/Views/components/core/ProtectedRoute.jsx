import { useEffect, useState } from 'react'
import { useAuth } from 'src/Controllers/context/userContext'
import AsisegLoader from '../Buttons/AsisegLoader'
import { Outlet, useNavigate } from 'react-router'

const ProtectedRoute = () => {
  const { usuario } = useAuth()
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (usuario === null) navigate('/')
    if (typeof usuario === 'undefined') {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [usuario, navigate])

  return (
    <>
      {loading ? (
        <>
          <div className="flex w-full flex-col h-screen justify-center content-center">
            <AsisegLoader showLogo={true} />
          </div>
        </>
      ) : (
        <Outlet />
      )}
    </>
  )
}
export default ProtectedRoute
