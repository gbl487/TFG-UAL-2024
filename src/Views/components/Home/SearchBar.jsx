// import useMediaQuery from '@hooks/useMediaQuery'
import SideFilters from '@components/Filters/SideFilters'
import SearchInput from './SearchInput.jsx'
export default function SearchBar() {
  return (
    <>
      <div className="flex flex-row items-center w-full ">
        <div className="flex basis-1/12 md:basis-1/3 justify-start w-0">
          <SideFilters />
        </div>
        <div className="flex basis-11/12 md:basis-1/3 w-full justify-center">
          <SearchInput />
        </div>
        <div className="md:basis-1/3"></div>
      </div>
    </>
  )
}
