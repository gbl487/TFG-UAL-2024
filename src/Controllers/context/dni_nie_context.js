import { atom } from 'nanostores'

export const validNIF = atom(false)

export const setValidNIF = ({ value }) => {
  validNIF.set(value)
}
