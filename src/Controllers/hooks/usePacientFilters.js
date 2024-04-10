import { useStore } from '@nanostores/react'
import { busquedaPaciente } from '../context/searchPacient_context'

export function usePacientFilters() {
  const busqueda = useStore(busquedaPaciente)
  const getPacientesFiltrados = (pacientes) => {
    console.log(pacientes)
    if (busqueda.length !== 0) {
      return pacientes.filter((paciente) => {
        return paciente.toLowerCase().includes(busqueda.toLowerCase())
      })
    }
    return pacientes
  }
  return { getPacientesFiltrados }
}
