import 'primereact/resources/themes/tailwind-light/theme.css'
import { MultiSelect } from 'primereact/multiselect'
import { useState } from 'react'
import 'primereact/resources/primereact.css'
import './filter.css'
import { FILTROS } from 'src/constants'
import { ClearFiltersButton } from '@components/Buttons/ClearFiltersButton'
export default function AllFilters() {
  const [curas, setCuras] = useState([])
  const [areas, setAreas] = useState([])
  return (
    <div className="w-full mt-10">
      <div className="flex flex-1 justify-center">
        <ClearFiltersButton
          onClick={() => {
            setAreas([])
          }}
        />
      </div>
      <div className="flex flex-1 justify-center mb-2">
        <MultiSelect
          id={FILTROS.TIPO_CURA.id}
          value={curas}
          onChange={(e) => {
            setCuras(e.value)
          }}
          options={FILTROS.TIPO_CURA.options}
          optionLabel="name"
          placeholder={FILTROS.TIPO_CURA.placeholder}
          maxSelectedLabels={3}
          display="chip"
          className="border-2 rounded-md w-full md:w-20rem"
        />
      </div>
      <div className="flex flex-1 justify-center mb-2">
        <MultiSelect
          id={FILTROS.AREA_AFECTADA.id}
          value={areas}
          onChange={(e) => {
            setAreas(e.value)
          }}
          options={FILTROS.AREA_AFECTADA.options}
          optionLabel="name"
          placeholder={FILTROS.AREA_AFECTADA.placeholder}
          maxSelectedLabels={3}
          display="chip"
          className="border-2 rounded-md w-60 md:w-20rem"
        />
      </div>
    </div>
  )
}
