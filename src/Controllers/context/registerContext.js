import { atom } from 'nanostores'

export const register = atom(false)

export const setRegister = (e) => {
  e.preventDefault()
  register.set(!register.value)
}
