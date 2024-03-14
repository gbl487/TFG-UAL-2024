import { Sidebar } from 'primereact/sidebar'
import { PanelIcon } from '@icons/Icons'
import { PanelContent } from './PanelContent'
import Logo from '../Logo'
import { useStore } from '@nanostores/react'
import { setSidebar, sidebar } from 'src/Controllers/context/sidebar_context'
export default function SideUserPanel() {
  const $sidebar = useStore(sidebar)
  return (
    <div className="flex justify-content-center min-w-md">
      <Sidebar
        className="w-2/3 flex justify-center bg-gray-50"
        visible={$sidebar}
        onHide={() => {
          setSidebar({ value: false })
        }}
        header={Logo}
      >
        <PanelContent />
      </Sidebar>
      <button
        className="mt-5 mx-5"
        onClick={() => {
          setSidebar({ value: true })
        }}
      >
        <PanelIcon />
      </button>
    </div>
  )
}
