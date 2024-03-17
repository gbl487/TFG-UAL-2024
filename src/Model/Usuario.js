// import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from './Firebase'

export function cerrarSesionUsuario() {
  auth.signOut()
}

export async function getNIFUsuario({ uid }) {
  try {
    const docRef = await doc(db, 'Usuarios', uid)
    const documentSnapshot = await getDoc(docRef)

    if (documentSnapshot.exists()) {
      // Accede a los datos del documento
      const documentData = documentSnapshot.data()
      return documentData
    } else {
      console.log('El documento no existe')
      return null
    }
  } catch (error) {
    console.log(error)
  }
}
