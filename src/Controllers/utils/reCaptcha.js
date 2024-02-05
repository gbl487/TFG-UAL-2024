import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'

export const renderRecaptcha = ({
  auth,
  containerOrId,
  onVerificationCompleted,
}) => {
  const appVerifier = new RecaptchaVerifier(auth, containerOrId, {
    size: 'normal',
    callback: (response) => {
      // Aquí puedes realizar acciones adicionales después de que se complete la verificación de reCAPTCHA
      console.log('reCAPTCHA completed')
      if (onVerificationCompleted) {
        onVerificationCompleted(response)
      }
    },
    'expired-callback': () => {
      // Aquí puedes manejar el caso en que la verificación de reCAPTCHA haya caducado
      console.log('reCAPTCHA caducado')
    },
  })
  return appVerifier
}

// Función para enviar el código de verificación
export const sendVerificationCode = async ({ auth, telefono, appVerifier }) => {
  try {
    const confirmation = await signInWithPhoneNumber(
      auth,
      telefono,
      appVerifier
    )
    return { confirmation }
  } catch (error) {
    console.error(error)
    throw error
  }
}
