import { atom } from 'nanostores'

export const citaModal = atom(false)

export const setCitaModal = ({ value }) => {
  citaModal.set(value)
}
