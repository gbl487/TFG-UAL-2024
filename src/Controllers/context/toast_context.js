import { atom } from 'nanostores'

export const toast = atom(false)

export const setToast = ({ value }) => {
  toast.set(value)
}
