export function ClearFiltersButton({ filtros }) {
  const clearFiltros = (e) => {
    e.preventDefault()
    filtros.set({
      curas: [],
      areas: [],
    })
  }
  return (
    <button
      className=" text-white bg-asiseg-blue opacity-65 hover:opacity-100 transition-opacity p-2 rounded-md mb-4"
      onClick={(e) => clearFiltros(e)}
    >
      Borrar filtros
    </button>
  )
}
