import useMediaQuery from '@hooks/useMediaQuery'
import SideFilters from '@components/Filters/SideFilters'
import SearchInput from './SearchInput'
export default function SearchBar() {
  const isDesktop = useMediaQuery('1280')
  return (
    <>
      {isDesktop ? (
        <SearchInput />
      ) : (
        <div className="flex flex-row items-center w-full">
          <div className="flex basis-1/3 justify-start">
            <SideFilters />
          </div>

          <div className="flex basis-1/3 w-full justify-center">
            <SearchInput />
          </div>
          <div className=" basis-1/3"></div>
        </div>
      )}
    </>
  )
}
