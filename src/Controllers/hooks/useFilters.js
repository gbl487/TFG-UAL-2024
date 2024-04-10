import { useStore } from '@nanostores/react'
import { filtros } from 'src/Controllers/context/filterContext'
import { search } from '../context/search_context'

export function useFilters() {
  const $filtros = useStore(filtros)

  const busqueda = useStore(search)
  const getTarjetasFiltradas = (tarjetas) => {
    let tarjetasFiltradas = tarjetas
    if (busqueda.length !== 0) {
      tarjetasFiltradas = tarjetasFiltradas.filter((tarjeta) => {
        return tarjeta.titulo.toLowerCase().includes(busqueda.toLowerCase())
      })
    }
    if ($filtros.areas.length === 0 && $filtros.curas.length === 0)
      return tarjetasFiltradas

    tarjetasFiltradas = tarjetasFiltradas.filter((tarjeta) => {
      return (
        tarjeta.categorias.some((categoria) =>
          $filtros.areas.some((filtro) => filtro.code === categoria)
        ) ||
        tarjeta.categorias.some((categoria) =>
          $filtros.curas.some((filtro) => filtro.code === categoria)
        )
      )
    })
    return tarjetasFiltradas
  }
  return { getTarjetasFiltradas }
}
