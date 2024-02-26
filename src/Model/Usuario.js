// import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from '../Model/Firebase'
import { setUser } from 'src/Controllers/context/userContext'

export async function registrarUsuario({ confirmation, otp, dni_nie }) {
  let error
  let usuario
  await confirmOtp({
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

export async function confirmOtp({ confirmation, otp }) {
  let usuario
  let errorResult
  try {
    await confirmation
      .confirm(otp)
      .then((result) => {
        setUser({ value: result.user })
        usuario = result.user
        console.log(result)
      })
      .catch((error) => (errorResult = error))
  } catch (error) {
    errorResult = error
  }
  return { usuario, errorResult }
}

export function cerrarSesionUsuario() {
  auth.signOut()
}
