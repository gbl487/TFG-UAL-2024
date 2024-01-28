import { atom } from 'nanostores'

export const filtros = atom({
  curas: [],
  areas: [],
})

export const setCuras = (e) => {
  filtros.set({
    ...filtros.value,
    curas: e.value,
  })
}
export const setAreas = (e) => {
  filtros.set({
    ...filtros.value,
    areas: e.value,
  })
}
