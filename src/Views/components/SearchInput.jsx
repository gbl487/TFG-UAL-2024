import { InfoIcon, SearchIcon } from '@Icons/Icons'

export default function SearchInput() {
  return (
    <form className="flex justify-center items-center ">
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <InfoIcon />
        </div>
        <input
          type="text"
          id="simple-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
          placeholder="Cura etc."
          required
        />
      </div>
      <button
        type="submit"
        className="p-2.5 ms-2 text-sm font-medium text-white bg-asiseg-blue opacity-65 hover:opacity-100 transition-opacity rounded-lg border border-asiseg-blue focus:ring-4 focus:outline-none focus:ring-blue-300 "
      >
        <SearchIcon />
      </button>
    </form>
  )
}
