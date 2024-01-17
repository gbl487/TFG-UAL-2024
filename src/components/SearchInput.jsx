import useMediaQuery from '../hooks/useMediaQuery'
export default function SearchInput() {
  const isDesktop = useMediaQuery('1280')

  return (
    <form id="MainSearch" class="flex flex-1 justify-center w-full">
      <div class="relative w-96">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            class="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          class="antialiased block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Preoperatorio, postoperatorio,..."
          required
        />
        <button
          type="submit"
          class="antialiased text-white absolute end-2.5 bottom-2.5 bg-asiseg-blue hover:bg-sky-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
        >
          Buscar
        </button>
      </div>
    </form>
  )
}
