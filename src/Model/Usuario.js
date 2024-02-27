// import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from './Firebase'

export function cerrarSesionUsuario() {
  auth.signOut()
}
