// import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
export class Usuario {
  async registrarUsuario({ auth, telefono }) {
    return { auth, telefono }
  }

  async confirmOtp({ confirmation, otp }) {
    let usuario
    let errorResult
    try {
      const result = await confirmation.confirm(otp)
      usuario = result.user
    } catch (error) {
      errorResult = error
    }
    return { usuario, errorResult }
  }
}
