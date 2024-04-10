import { SearchIcon } from '@icons/Icons'

import { setSearch } from 'src/Controllers/context/search_context'

export default function SearchInput() {
  return (
    <form className="flex justify-center items-center ">
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <SearchIcon />
        </div>
        <input
          id="buscador"
          type="text"
          onChange={(e) => {
            e.preventDefault()
            setSearch({ value: e.target.value })
          }}
          className="asiseg_input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-asiseg-blue focus:border-asiseg-blue ps-10 p-2.5 focus-visible:ring-asiseg-blue focus-visible:border-asiseg-blue"
          placeholder="Cura etc."
        />
      </div>
    </form>
  )
}
