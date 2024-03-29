const idArea = 'FiltroArea'
const placeArea = 'Área afectada'
const optionsArea = [
  { name: 'Corazón', code: 'COR' },
  { name: 'Pulmón', code: 'PUL' },
  { name: 'Hígado', code: 'HIG' },
  { name: 'Estómago', code: 'EST' },
  { name: 'Riñones', code: 'RIN' },
]

const AREA_AFECTADA = {
  id: idArea,
  placeholder: placeArea,
  options: optionsArea,
}

const idCura = 'FiltroCura'
const placeholderCura = 'Tipo de cura'
const optionsCura = [
  { name: 'Preoperatorio', code: 'PREOP' },
  { name: 'Postoperatorio', code: 'POSTOP' },
]

const TIPO_CURA = {
  id: idCura,
  placeholder: placeholderCura,
  options: optionsCura,
}

export const FILTROS = [AREA_AFECTADA, TIPO_CURA]

export const ALLOWEDFILETYPES = ['image/png', 'image/jpeg']

export const ROLES = { USUARIO: 'USUARIO', MEDICO: 'MEDICO' }
