import { useState } from 'react'
import { Sidebar } from 'primereact/sidebar'
import { PanelIcon } from '@Icons/Icons'
import { PanelContent } from './PanelContent'
import Logo from './Logo'
export default function SideUserPanel() {
  const [visible, setVisible] = useState(false)
  //   const customHeader = (
  //     <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
  //       <img
  //         src="/favicon_asiseg.svg"
  //         className="h-14 ml-5 my-2"
  //         alt="Asiseg Logo"
  //       />
  //       <span className="self-center text-2xl font-semibold whitespace-nowrap text-asiseg-blue">
  //         ASISEG
  //       </span>
  //     </a>
  //   )
  return (
    <div className="flex justify-content-center min-w-md bg-white">
      <Sidebar
        className="w-2/3 flex justify-center bg-white"
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
