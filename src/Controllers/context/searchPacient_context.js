import { atom } from 'nanostores'

export const busquedaPaciente = atom('')

export const setBusquedaPaciente = ({ value }) => {
  busquedaPaciente.set(value)
}
