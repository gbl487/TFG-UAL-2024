// import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import { auth, db } from './Firebase'
import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
} from 'firebase/auth'

export function cerrarSesionUsuario() {
  auth.signOut()
}

export async function getNIFUsuario() {
  const uid = auth.currentUser.uid
  try {
    const docRef = await doc(db, 'Usuarios', uid)
    const documentSnapshot = await getDoc(docRef)

    if (documentSnapshot.exists()) {
      // Accede a los datos del documento
      const documentData = documentSnapshot.data()
      return documentData.nif
    } else {
      console.log('El documento no existe')
      return null
    }
  } catch (error) {
    console.log(error)
  }
}

export async function registrarUsuarioFirebase({ email, password, remember }) {
  let errorUsuario = ''
  let usuarioValido = false
  let uid_usuario
  remember
    ? await setPersistence(auth, browserLocalPersistence)
    : await setPersistence(auth, browserSessionPersistence)
  await createUserWithEmailAndPassword(auth, email, password)
    .then((result) => {
      usuarioValido = true
      // setUser({ value: result.user })
      uid_usuario = result.user.uid
    })
    .catch((error) => {
      console.log(error)
      if (error.code === 'auth/email-already-in-use')
        errorUsuario = 'EMAIL_IN_USE'
      if (error.code === 'auth/too-many-requests')
        errorUsuario = 'TOO_MANY_REQUESTS'
      usuarioValido = false
    })
  return { uid_usuario, usuarioValido, errorUsuario }
}

export async function crearUsuario({ uid, username, remember }) {
  let result
  const usuarioRef = collection(db, 'Usuarios')
  const nuevaData = {
    nif: username,
    rol: 'usuario',
    persistencia_sesion: remember,
    fecha_creacion: new Date(),
  }
  // Utiliza setDoc para agregar el nuevo documento
  await setDoc(doc(usuarioRef, uid), nuevaData)
    .then(() => {
      result = 'VALID'
    })
    .catch(() => {
      result = 'INVALID'
    })
  console.log(result)
  return { result }
}

export async function getAllNifs() {
  let pacientes = []
  const querySnapshot = await getDocs(collection(db, 'Usuarios'))
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    pacientes.push(doc.data().nif)
    console.log(doc.id, ' => ', doc.data().nif)
  })
  return pacientes
}

export async function getIdUsuario() {
  return auth.currentUser.uid
}
