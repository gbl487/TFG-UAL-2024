import 'primereact/resources/themes/tailwind-light/theme.css'
import { MultiSelect } from 'primereact/multiselect'
import { useState } from 'react'
import 'primereact/resources/primereact.css'
import './filter.css'
export default function AllFilters() {
  const [curas, setCuras] = useState([])
  const [areas, setAreas] = useState([])
  const area_afectada = [
    { name: 'Corazón', code: 'COR' },
    { name: 'Pulmón', code: 'PUL' },
    { name: 'Hígado', code: 'HIG' },
    { name: 'Estómago', code: 'EST' },
  ]
  const tipo_cura = [
    { name: 'Preoperatorio', code: 'PREOP' },
    { name: 'Postoperatorio', code: 'POSTOP' },
  ]

  return (
    <div className="w-full mx-5 mt-10">
      <div className="flex flex-1 justify-center">
        <button
          className=" text-white bg-asiseg-blue hover:bg-sky-500 p-2 rounded-md mb-4"
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
            e.preventDefault
            setCuras(e.value)
          }}
          options={tipo_cura}
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
            e.preventDefault
            setAreas(e.value)
          }}
          options={area_afectada}
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
