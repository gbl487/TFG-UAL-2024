import AllFilters from './AllFilters'
import useMediaQuery from '../hooks/useMediaQuery'
export default function Filters() {
  const isDesktop = useMediaQuery('1280')

  return <div>{isDesktop ? <AllFilters /> : null}</div>
}
