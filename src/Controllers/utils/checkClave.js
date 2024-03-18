import { claveExists } from 'src/Model/Claves'

export async function checkClave({ value }) {
  const clave = await claveExists({ value: value })
  return clave
}
