import useMediaQuery from '@hooks/useMediaQuery'
import { useStore } from '@nanostores/react'
import { useEffect } from 'react'
import { setUser, user } from 'src/Controllers/context/userContext'
import { auth } from 'src/Model/Firebase'
import { PanelContent } from './PanelContent'
import SideUserPanel from './SideUserPanel'
import 'primereact/resources/themes/tailwind-light/theme.css'
import Logo from './Logo'

export default function UserPanel() {
  const isDesktop = useMediaQuery('640')
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

  return (
    <>
      {$user && (
        <>
          {isDesktop ? (
            <>
              <aside
                className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                aria-label="Sidebar"
              >
                <div className="mb-5">
                  <Logo />
                </div>

                <PanelContent />
              </aside>
            </>
          ) : (
            <>
              <SideUserPanel />
            </>
          )}
        </>
      )}
    </>
  )
}
