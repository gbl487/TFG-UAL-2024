import { atom } from 'nanostores'

export const search = atom('')

export const setSearch = ({ value }) => {
  search.set(value)
}
