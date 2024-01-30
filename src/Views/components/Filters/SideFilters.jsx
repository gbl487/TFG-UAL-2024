import { useState } from 'react'
import { Sidebar } from 'primereact/sidebar'
import AllFilters from './AllFilters'
import { FilterIcon } from '@Icons/Icons'
export default function SideFilters() {
  const [visible, setVisible] = useState(false)
  return (
    <div className="flex justify-content-center min-w-md">
      <Sidebar
        className="w-50 flex justify-center"
        visible={visible}
        onHide={() => setVisible(false)}
      >
        <AllFilters />
      </Sidebar>
      <button className="min-w-10 mx-3 z-10" onClick={() => setVisible(true)}>
        <FilterIcon />
      </button>
    </div>
  )
}
