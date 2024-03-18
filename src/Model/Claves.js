import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore'
import { db } from './Firebase'
import { getNIFUsuario } from './Usuario'

export async function crearClave({ clave, creador, fechaCreacion }) {
  let result = ''
  const clavesRef = collection(db, 'Claves')
  const nuevaData = {
    clave: clave,
    creador: creador,
    fechaCreacion: fechaCreacion,
  }
  try {
    // Utiliza setDoc para agregar el nuevo documento
    await setDoc(doc(clavesRef), nuevaData)
    result = 'OK'
  } catch (error) {
    result = error
  }
  return { result }
}

export async function getAllClaves() {
  try {
    const querySnapshot = await getDocs(collection(db, 'Claves'))
    const claves = []

    for (const doc of querySnapshot.docs) {
      const data = doc.data()
      const result = await getNIFUsuario({ uid: data.creador })
      claves.push({
        id: doc.id,
        clave: data.clave,
        creador: result.NIF,
        fechaCreacion: data.fechaCreacion,
      })
    }
    return claves
  } catch (error) {
    console.log(error)
  }
}

export async function getClaveId({ value }) {
  const usuariosQuery = query(
    collection(db, 'Claves'),
    where('clave', '==', value)
  )
  const querySnapshot = getDocs(usuariosQuery)
    .then((result) => console.log(result.docs[0]))
    .catch((error) => console.log(error))
  const id = querySnapshot.docs[0].id
  const documentoRef = doc(db, 'Claves', id)
  const clave = await getDoc(documentoRef)
  console.log(clave.data().clave)
  return { clave: clave.data().clave }
}

export async function claveExists({ value }) {
  let claveExiste = false
  const usuariosQuery = query(
    collection(db, 'Claves'),
    where('clave', '==', value)
  )
  await getDocs(usuariosQuery)
    .then((result) => {
      if (result.docs[0]) claveExiste = true
      if (typeof result.docs[0] === 'undefined') claveExiste = false
    })
    .catch(() => (claveExiste = false))
  return claveExiste
}

export async function getClaveDoc({ value }) {
  const usuariosQuery = query(
    collection(db, 'Claves'),
    where('clave', '==', value)
  )
  const querySnapshot = await getDocs(usuariosQuery)
  const id = querySnapshot.docs[0].id
  const documentoRef = doc(db, 'Claves', id)
  return { documentoRef }
}
