import { useStore } from '@nanostores/react'
import { filtros } from 'src/Controllers/context/filterContext'

export function useFilters() {
  const $filtros = useStore(filtros)

  const getTarjetasFiltradas = (tarjetas) => {
    if ($filtros.areas.length === 0 && $filtros.curas.length === 0)
      return tarjetas
    return tarjetas.filter((tarjeta) => {
      return (
        tarjeta
          .data()
          .categorias.some((categoria) =>
            $filtros.areas.some((filtro) => filtro.code === categoria)
          ) ||
        tarjeta
          .data()
          .categorias.some((categoria) =>
            $filtros.curas.some((filtro) => filtro.code === categoria)
          )
      )
    })
  }
  return { getTarjetasFiltradas }
}
