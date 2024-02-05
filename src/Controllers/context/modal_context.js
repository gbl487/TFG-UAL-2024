import { atom } from 'nanostores'

export const modal = atom(false)

export const setModal = ({ value }) => {
  modal.set(value)
}
