import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
// import { setPersistence } from 'firebase/auth'
// import firebase from 'firebase/compat/app'
import { auth } from '../../Model/Firebase'
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
export const sendVerificationCode = async ({ telefono, appVerifier }) => {
  let confirmation
  let errorResult

  try {
    confirmation = await signInWithPhoneNumber(auth, telefono, appVerifier)
    // Se ha enviado el código de verificación
    // Hacer algo con confirmation
  } catch (error) {
    // Manejar el error
    console.error(
      'Error al intentar autenticar con el número de teléfono:',
      error
    )
    errorResult = error
  }

  return { confirmation, errorResult }
}

// await setPersistence(auth, firebase.auth.Auth.Persistence.NONE)
// .then(() => {
//   // Existing and future Auth states are now persisted in the current
//   // session only. Closing the window would clear any existing state even
//   // if a user forgets to sign out.
//   // ...
//   // New sign-in will be persisted with session persistence.
//   console.log('Establecida persistencia')
// })
// .catch((error) => {
//   // Handle Errors here.
//   console.log(error)
// })
