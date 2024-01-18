import { useState } from 'react'
import { Sidebar } from 'primereact/sidebar'
import AllFilters from './AllFilters'
import { FilterIcon } from '../../../assets/svg/FilterIcon'
export default function SideFilters() {
  const [visible, setVisible] = useState(false)
  return (
    <div className="card flex justify-content-center">
      <Sidebar
        className="w-full flex flex-1 justify-center"
        visible={visible}
        onHide={() => setVisible(false)}
      >
        <AllFilters />
      </Sidebar>
      <button className="ml-4" onClick={() => setVisible(true)}>
        <FilterIcon />
      </button>
    </div>
  )
}
