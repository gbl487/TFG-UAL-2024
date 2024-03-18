import { InfoIcon, SearchIcon } from '@icons/Icons'

export default function SearchInput() {
  return (
    <form className="flex justify-center items-center ">
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <InfoIcon />
        </div>
        <input
          type="text"
          id="barra_busqueda"
          className="asiseg_input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-asiseg-blue focus:border-asiseg-blue ps-10 p-2.5 focus-visible:ring-asiseg-blue focus-visible:border-asiseg-blue"
          placeholder="Cura etc."
        />
      </div>
      <button
        type="submit"
        className="p-2.5 ms-2 text-sm font-medium text-white bg-asiseg-blue opacity-65 hover:opacity-100 transition-opacity rounded-lg border border-asiseg-blue  focus:outline-none focus:ring-asiseg-blue"
      >
        <SearchIcon />
      </button>
    </form>
  )
}