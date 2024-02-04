// import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
export class Usuario {
  async registrarUsuario({ auth, telefono }) {
    return { auth, telefono }
  }
}
