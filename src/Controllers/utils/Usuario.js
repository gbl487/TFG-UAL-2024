import { auth } from '../../Model/Firebase'
import { cerrarSesionUsuario } from 'src/Model/Usuario'
export function checkSesionUsuario() {
  if (auth.currentUser !== null) return true
  return false
}

export function userSignOut() {
  if (checkSesionUsuario) cerrarSesionUsuario()
}
