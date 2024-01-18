import useMediaQuery from '../../Controllers/hooks/useMediaQuery'
import SideFilters from '@components/Filters/SideFilters'
import SearchInput from './SearchInput'
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
