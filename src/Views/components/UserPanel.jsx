import { SignOutIcon, UserIcon } from '@Icons/Icons'
import { useStore } from '@nanostores/react'
import { useEffect } from 'react'
import { setUser, user } from 'src/Controllers/context/userContext'
import { auth } from 'src/Model/Firebase'

export default function UserPanel() {
  // const [menuVisible, setMenuVisible] = useState(false)

  // const toggleMenu = () => {
  //   setMenuVisible(!menuVisible)
  // }
  // const isDesktop = useMediaQuery('1280')
  const $user = useStore(user)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // El usuario está autenticado
        setUser({ value: authUser })
      } else {
        // El usuario no está autenticado
        setUser({ value: null })
        window.location.href = '/'
      }
    })

    // Cleanup function
    return () => {
      unsubscribe()
    }
  }, [])

  const handleLogout = () => {
    auth.signOut()
    setUser({ value: null })
  }

  return (
    <>
      {$user ? (
        <>
          <aside
            id="logo-sidebar"
            className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
            aria-label="Sidebar"
          >
            <div className="h-full px-3 py-4 overflow-y-auto">
              <a
                href="/"
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <img
                  src="/favicon_asiseg.svg"
                  className="h-14 ml-5 my-2"
                  alt="Asiseg Logo"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-asiseg-blue">
                  ASISEG
                </span>
              </a>
              <ul className="space-y-2 font-medium">
                <li>
                  <div className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group cursor-pointer">
                    <UserIcon />
                    <span className="ms-3">Mis datos</span>
                  </div>
                </li>
                <li onClick={handleLogout}>
                  <div className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group cursor-pointer">
                    <SignOutIcon />
                    <span className="ms-3">Cerrar sesión</span>
                  </div>
                </li>
              </ul>
            </div>
          </aside>
          <div className="p-4 sm:ml-64 w-auto h-full bg-asiseg-blue">
            Contenido
          </div>{' '}
        </>
      ) : (
        ''
      )}
    </>
  )
}
