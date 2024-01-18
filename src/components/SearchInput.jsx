import useMediaQuery from '../hooks/useMediaQuery'
export default function SearchInput() {
  const isDesktop = useMediaQuery('1280')

  return (
    <form
      id="MainSearch"
      className="sticky top-0 py-4 backdrop-blur-xl flex justify-center w-full z-50"
    >
      <div className="relative w-96">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="antialiased block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-asiseg-blue focus:border-asiseg-blue"
          placeholder="Preoperatorio, postoperatorio,..."
        />
        <button
          type="submit"
          className="antialiased text-white absolute end-2.5 bottom-2.5 bg-asiseg-blue opacity-65  hover:opacity-100 transition-opacity focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
        >
          Buscar
        </button>
      </div>
    </form>
  )
}
