import useMediaQuery from '@hooks/useMediaQuery'
import { useAuth } from 'src/Controllers/context/userContext'
import { PanelContent } from './PanelContent'
import SideUserPanel from './SideUserPanel'
import 'primereact/resources/themes/tailwind-light/theme.css'
import Logo from '../core/Logo'

export default function UserPanel() {
  const isDesktop = useMediaQuery('768')
  const { usuario } = useAuth()
  return (
    <>
      {usuario && (
        <>
          {isDesktop ? (
            <>
              <aside
                className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-gray-50"
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
