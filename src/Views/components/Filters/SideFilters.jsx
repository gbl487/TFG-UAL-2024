import { useState } from 'react'
import { Sidebar } from 'primereact/sidebar'
import AllFilters from './AllFilters'
import { FilterIcon } from '@Icons/Icons'
export default function SideFilters() {
  const [visible, setVisible] = useState(false)
  return (
    <div className="card flex justify-content-center">
      <Sidebar
        className="w-full flex justify-center"
        visible={visible}
        onHide={() => setVisible(false)}
      >
        <AllFilters />
      </Sidebar>
      <button className="min-w-10 mx-4" onClick={() => setVisible(true)}>
        <FilterIcon />
      </button>
    </div>
  )
}
