import { atom } from 'nanostores'

export const toast = atom(false)
export const toastText = atom('')

export const setToast = ({ value, text }) => {
  toast.set(value)
  toastText.set(text)
}
