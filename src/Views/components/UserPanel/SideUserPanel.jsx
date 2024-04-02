import { Sidebar } from 'primereact/sidebar'
import { PanelIcon } from '@icons/Icons'
import { PanelContent } from './PanelContent'
import Logo from '../core/Logo'
import { useStore } from '@nanostores/react'
import { setSidebar, sidebar } from 'src/Controllers/context/sidebar_context'
export default function SideUserPanel() {
  const $sidebar = useStore(sidebar)
  return (
    <div className="bg-asiseg-blue">
      <button
        className="mt-5 ml-5 "
        onClick={() => {
          setSidebar({ value: true })
        }}
      >
        <PanelIcon />
      </button>
      <Sidebar
        className="w-80 flex justify-center bg-gray-50"
        visible={$sidebar}
        onHide={() => {
          setSidebar({ value: false })
        }}
        header={Logo}
      >
        <PanelContent />
      </Sidebar>
    </div>
  )
}
