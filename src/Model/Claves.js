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
import { getIdUsuario, getNIFUsuario } from './Usuario'
import { generarCodigo } from 'src/Controllers/utils/generarCodigoAleatorio'

export async function crearClave() {
  let result = ''
  const clave = generarCodigo(16)
  var fechaCreacion = new Date()
  var fechaCreacion_txt = fechaCreacion.toLocaleDateString('es-ES')
  const clavesRef = collection(db, 'Claves')
  const nombre_usuario = await getNIFUsuario()
  const id_usuario = await getIdUsuario()
  const nuevaClave = {
    clave: clave,
    nombre_creador: nombre_usuario,
    id_creador: id_usuario,
    fechaCreacion: fechaCreacion,
    fechaCreacionString: fechaCreacion_txt,
  }
  try {
    // Utiliza setDoc para agregar el nuevo documento
    await setDoc(doc(clavesRef), nuevaClave)
    result = 'OK'
  } catch (error) {
    result = error
  }
  return { result, nuevaClave }
}

export async function getAllClaves() {
  try {
    const querySnapshot = await getDocs(collection(db, 'Claves'))
    const claves = []

    for (const doc of querySnapshot.docs) {
      const data = doc.data()
      claves.push({
        clave: data.clave,
        creador: data.nombre_creador,
        fechaCreacion: data.fechaCreacionString,
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
  const claveQuery = query(
    collection(db, 'Claves'),
    where('clave', '==', value)
  )
  const querySnapshot = await getDocs(claveQuery)
  const id = querySnapshot.docs[0].id
  const documentoRef = doc(db, 'Claves', id)
  return { documentoRef }
}
