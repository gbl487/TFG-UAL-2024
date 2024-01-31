import { atom } from 'nanostores'

export const registerState = atom(false)

export const setRegister = (e) => {
  e.preventDefault()
  registerState.set(!registerState.value)
}
