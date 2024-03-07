import { MultiSelect } from 'primereact/multiselect'
import { FILTROS } from 'src/constants'
import { ClearFiltersButton } from '@components/Buttons/ClearFiltersButton'
import { useStore } from '@nanostores/react'
import {
  filtros,
  setAreas,
  setCuras,
} from 'src/Controllers/context/filterContext'
import 'primereact/resources/themes/tailwind-light/theme.css'
import './filter.css'

export default function AllFilters() {
  const $filtros = useStore(filtros)
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-1 justify-center">
        <ClearFiltersButton filtros={filtros} />
      </div>
      <div className="flex flex-1 justify-center mb-2">
        <MultiSelect
          id={FILTROS[1].id}
          value={$filtros.curas}
          onChange={(e) => {
            setCuras(e)
          }}
          options={FILTROS[1].options}
          optionLabel="name"
          placeholder={FILTROS[1].placeholder}
          maxSelectedLabels={3}
          display="chip"
          className="border-2 rounded-md w-full"
        />
      </div>
      <div className="flex flex-1 justify-center mb-2">
        <MultiSelect
          id={FILTROS[0].id}
          value={$filtros.areas}
          onChange={(e) => {
            setAreas(e)
          }}
          options={FILTROS[0].id.options}
          optionLabel="name"
          placeholder={FILTROS[0].placeholder}
          // maxSelectedLabels={3}
          display="chip"
          className="border-2 rounded-md w-full h-auto"
        />
      </div>
    </div>
  )
}
