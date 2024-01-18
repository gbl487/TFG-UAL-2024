import useMediaQuery from '../hooks/useMediaQuery'
import SearchInput from './SearchInput'
import SideFilters from './SideFIlters'
export default function SearchBar() {
  const isDesktop = useMediaQuery('1280')
  return (
    <>
      {isDesktop ? (
        <SearchInput />
      ) : (
        <div className="flex flex-row justify-center items-center">
          {' '}
          <SideFilters />
          <SearchInput />
        </div>
      )}
    </>
  )
}
