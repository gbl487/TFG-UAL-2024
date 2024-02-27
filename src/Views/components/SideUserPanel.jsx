import { useState } from 'react'
import { Sidebar } from 'primereact/sidebar'
import { PanelIcon } from '@Icons/Icons'
import { PanelContent } from './PanelContent'
import Logo from './Logo'
export default function SideUserPanel() {
  const [visible, setVisible] = useState(false)

  return (
    <div className="flex justify-content-center min-w-md">
      <Sidebar
        className="w-2/3 flex justify-center bg-gray-50"
        visible={visible}
        onHide={() => setVisible(false)}
        header={Logo}
      >
        <PanelContent />
      </Sidebar>
      <button className="mt-5 mx-5" onClick={() => setVisible(true)}>
        <PanelIcon />
      </button>
    </div>
  )
}
