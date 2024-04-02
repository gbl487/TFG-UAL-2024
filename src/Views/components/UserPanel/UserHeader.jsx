import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'

export default function UserHeader() {
  const [headerName, setHeaderName] = useState()
  const location = useLocation().pathname

  useEffect(() => {
    switch (location) {
      case '/misdatos':
        setHeaderName('Mis datos')
        break
      case '/citas':
        setHeaderName('Mis citas')
        break
      case '/contenido':
        setHeaderName('Administrar contenido')
        break
      case '/chat':
        setHeaderName('Mis mensajes')
        break
      case '/claves':
        setHeaderName('Claves de registro')
        break
    }
  }, [location])

  return (
    <div className="h-20 -z-10 bg-asiseg-blue w-full flex justify-center items-center">
      <p className="text-2xl text-white">{headerName}</p>
    </div>
  )
}
