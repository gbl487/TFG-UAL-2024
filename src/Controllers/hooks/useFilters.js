import { useStore } from '@nanostores/react'
import { filtros } from 'src/Controllers/context/filterContext'

export function useFilters() {
  const $filtros = useStore(filtros)
  const tarjetasFiltradas = (tarjetas) => {
    return tarjetas.filter((tarjeta) => {
      const areaMatch = tarjeta.categorias.some((categoria) =>
        $filtros.areas.some((filtro) => filtro.code === categoria.code)
      )
      const curaMatch = tarjeta.categorias.some((categoria) =>
        $filtros.curas.some((filtro) => filtro.code === categoria.code)
      )
      return areaMatch || curaMatch
    })
  }
  return { tarjetasFiltradas }
}
