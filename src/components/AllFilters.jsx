import 'primereact/resources/themes/tailwind-light/theme.css'
import { MultiSelect } from 'primereact/multiselect'
import { useState } from 'react'
import 'primereact/resources/primereact.css'
import './filter.css'
export default function AllFilters() {
  const [curas, setCuras] = useState([])
  const [areas, setAreas] = useState([])
  const AREA_AFECTADA = [
    { name: 'Corazón', code: 'COR' },
    { name: 'Pulmón', code: 'PUL' },
    { name: 'Hígado', code: 'HIG' },
    { name: 'Estómago', code: 'EST' },
  ]
  const TIPO_CURA = [
    { name: 'Preoperatorio', code: 'PREOP' },
    { name: 'Postoperatorio', code: 'POSTOP' },
  ]

  return (
    <div className="w-full mx-5 mt-10">
      <div className="flex flex-1 justify-center">
        <button
          className=" text-white bg-asiseg-blue opacity-65 hover:opacity-100 transition-opacity p-2 rounded-md mb-4"
          onClick={() => {
            setCuras([])
            setAreas([])
          }}
        >
          Borrar filtros
        </button>
      </div>
      <div className="flex flex-1 justify-center mb-2">
        <MultiSelect
          id="SelectCura"
          value={curas}
          onChange={(e) => {
            setCuras(e.value)
          }}
          options={TIPO_CURA}
          optionLabel="name"
          placeholder="Tipo de cura"
          maxSelectedLabels={3}
          display="chip"
          className="border-2 rounded-md w-60 md:w-20rem"
        />
      </div>
      <div className="flex flex-1 justify-center my-2 ">
        <MultiSelect
          id="SelectArea"
          value={areas}
          onChange={(e) => {
            setAreas(e.value)
          }}
          options={AREA_AFECTADA}
          optionLabel="name"
          placeholder="Área afectada"
          maxSelectedLabels={3}
          display="chip"
          className="border-2 rounded-md w-60 md:w-20rem"
        />
      </div>
    </div>
  )
}
