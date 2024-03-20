import { atom } from 'nanostores'

export const correctPassword = atom(false)

export const setCorrectPassword = ({ value }) => {
  correctPassword.set(value)
}
