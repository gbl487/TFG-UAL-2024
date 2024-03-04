import { FILTROS } from 'src/constants'

export function getCategoryName(codigo) {
  for (let filtro of FILTROS) {
    for (let opcion of filtro.options) {
      if (opcion.code === codigo) {
        return opcion.name
      }
    }
  }
  return null // Si no se encuentra el código
}
