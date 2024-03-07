import { getCategoryName } from 'src/Controllers/utils/categorias'
import Chip from './Tag'

export default function TagArray({ tags }) {
  return (
    <>
      {tags.map((tag) => {
        const name = getCategoryName(tag)
        return <Chip key={tag} tag={name} />
      })}
    </>
  )
}
