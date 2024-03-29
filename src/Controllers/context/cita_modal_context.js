import { atom } from 'nanostores'

export const citaModal = atom(false)

export const setCitaModal = ({ value }) => {
  citaModal.set(value)
}

export const citaModModal = atom(false)

export const setCitaModModal = ({ value }) => {
  citaModModal.set(value)
}
