// import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'

import { setUser } from 'src/Controllers/context/userContext'
export class Usuario {
  async registrarUsuario({ confirmation, otp, dni_nie }) {
    let error
    let usuario
    await this.confirmOtp({
      confirmation,
      otp,
    }).then((result) => {
      // Se ha creado correctamente el usuario
      if (result.errorResult.code === 'auth/invalid-verification-code') {
        error = 'INVALID_CODE'
      }
      console.log(result)
      usuario = result.usuario
    })
    return { usuario, dni_nie, error }
  }

  async confirmOtp({ confirmation, otp }) {
    let usuario
    let errorResult
    try {
      await confirmation.confirm(otp).then((result) => {
        setUser({ value: result.user })
        usuario = result.user
        console.log(result)
      })
      console.log(confirmation)
    } catch (error) {
      errorResult = error
    }
    return { usuario, errorResult }
  }
}
