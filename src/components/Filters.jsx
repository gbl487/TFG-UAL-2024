import useMediaQuery from '../hooks/useMediaQuery'
import AllFilters from './AllFilters'
export default function Filters() {
  const isDesktop = useMediaQuery('1280')

  return <div>{isDesktop ? <AllFilters /> : null}</div>
}
