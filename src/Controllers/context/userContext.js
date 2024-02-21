import { atom } from 'nanostores'

export const user = atom(null)

export const setUser = ({ value }) => {
  user.set(value)
}
