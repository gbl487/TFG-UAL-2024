import { filtros } from 'src/Controllers/context/filterContext'

export function ClearFiltersButton() {
  const clearFiltros = (e) => {
    e.preventDefault()
    filtros.set({
      curas: [],
      areas: [],
    })
  }
  return (
    <button
      className="btn btn-primary text-white opacity-65 transition-opacity p-2 rounded-md mb-4"
      onClick={(e) => clearFiltros(e)}
    >
      Borrar filtros
    </button>
  )
}
