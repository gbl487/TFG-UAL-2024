import { atom } from 'nanostores'

export const claveRegistro = atom(false)

export const setClaveRegisto = ({ value }) => {
  claveRegistro.set(value)
}
