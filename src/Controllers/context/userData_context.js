import { atom } from 'nanostores'

export const userData = atom(false)

export const setUserData = ({ value }) => {
  userData.set(value)
}
