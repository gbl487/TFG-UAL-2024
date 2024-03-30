import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { auth, db } from './Firebase'
import { generarCodigo } from 'src/Controllers/utils/generarCodigoAleatorio'

export async function crearTarjeta({ titulo, imagen, categorias, contenido }) {
  let result = ''
  const { idTarjeta } = await crearIdUnico()
  console.log(idTarjeta)
  const tarjetasRef = collection(db, 'Tarjetas')
  const nuevaData = {
    idTarjeta: idTarjeta,
    titulo: titulo,
    imagen: imagen,
    categorias: categorias,
    contenido: contenido,
  }
  try {
    // Utiliza setDoc para agregar el nuevo documento
    await setDoc(doc(tarjetasRef), nuevaData)
    result = 'OK'
  } catch (error) {
    result = error
  }
  return { result }
}

export async function getAllTarjetasUids() {
  try {
    // Utiliza setDoc para agregar el nuevo documento
    const querySnapshot = await getDocs(collection(db, 'Tarjetas'))
    const uids = []
    querySnapshot.forEach((doc) => {
      uids.push(doc.id)
    })
    return uids
  } catch (error) {
    console.log(error)
  }
}

export async function crearIdUnico() {
  let idTarjeta
  const arraysIds = await obtenerIdsTarjetas()
  console.log(arraysIds)
  do {
    let seccion1 = generarCodigo(6)
    let seccion2 = generarCodigo(4)
    let seccion3 = generarCodigo(4)
    let seccion4 = generarCodigo(6)
    idTarjeta = `${seccion1}-${seccion2}-${seccion3}-${seccion4}`
    console.log(idTarjeta)
  } while (arraysIds.includes(idTarjeta))
  return { idTarjeta }
}

export async function getAllIdsTarjetas() {
  const querySnapshot = await getDocs(collection(db, 'Tarjetas'))
  const arrayIds = []
  querySnapshot.forEach((doc) => {
    arrayIds.push(doc.data().idTarjeta)
  })
  return arrayIds
}

export async function obtenerTarjetas() {
  try {
    // Utiliza setDoc para agregar el nuevo documento
    const querySnapshot = await getDocs(collection(db, 'Tarjetas'))
    const arrayTarjetas = []
    querySnapshot.forEach((doc) => {
      if (!doc.data().borrada) {
        arrayTarjetas.push(doc.data())
      }
    })
    return arrayTarjetas
  } catch (error) {
    console.log(error)
  }
}

export async function obtenerIdsTarjetas() {
  try {
    // Utiliza setDoc para agregar el nuevo documento
    const querySnapshot = await getDocs(collection(db, 'Tarjetas'))
    const arrayTarjetas = []
    querySnapshot.forEach((doc) => {
      arrayTarjetas.push(doc.data().idTarjeta)
    })
    return arrayTarjetas
  } catch (error) {
    console.log(error)
  }
}

export async function getTarjetaFromId({ idTarjeta }) {
  const tarjetaQuery = query(
    collection(db, 'Tarjetas'),
    where('idTarjeta', '==', idTarjeta)
  )
  const querySnapshot = await getDocs(tarjetaQuery)

  const id = querySnapshot.docs[0].id

  const documentoRef = doc(db, 'Tarjetas', id)
  const docSnap = await getDoc(documentoRef)
  if (docSnap.exists()) {
    // Retorna los datos del documento
    return docSnap.data()
  } else {
    // Si el documento no existe, retorna un mensaje o lanza un error
    console.log('El documento no existe')
  }
  return documentoRef
}

export async function getUIdTarjeta({ idTarjeta }) {
  const tarjetaQuery = query(
    collection(db, 'Tarjetas'),
    where('idTarjeta', '==', idTarjeta)
  )
  const querySnapshot = await getDocs(tarjetaQuery)

  const id = querySnapshot.docs[0].id

  const documentoRef = doc(db, 'Tarjetas', id)
  const docSnap = await getDoc(documentoRef)
  if (docSnap.exists()) {
    // Retorna los datos del documento
    return docSnap.id
  } else {
    // Si el documento no existe, retorna un mensaje o lanza un error
    console.log('El documento no existe')
  }
  return documentoRef
}

export async function modificarTarjeta({
  idTarjeta,
  titulo,
  imagen,
  categorias,
  contenido,
}) {
  let result = ''
  const uid = await getUIdTarjeta({ idTarjeta })
  const tarjetaRef = doc(db, 'Tarjetas', uid)
  const today = new Date()
  try {
    const nuevosDatos = {
      titulo: titulo,
      imagen: imagen,
      categorias: categorias,
      contenido: contenido,
      fecha_actualizacion: today,
    }
    await updateDoc(tarjetaRef, nuevosDatos)
      .then(() => (result = 'OK'))
      .catch(() => (result = 'ERROR'))
  } catch (error) {
    console.error('Error actualizando documento: ', error)
  }
  return { result }
}

export async function eliminarTarjeta({ idTarjeta }) {
  let result = ''
  const today = new Date()
  const uid = auth.currentUser.uid
  const tarjetaQuery = query(
    collection(db, 'Tarjetas'),
    where('idTarjeta', '==', idTarjeta)
  )
  const querySnapshot = await getDocs(tarjetaQuery)

  const id = querySnapshot.docs[0].id

  const documentoRef = doc(db, 'Tarjetas', id)
  try {
    await updateDoc(documentoRef, {
      borrada: true,
      fecha_actualizacion: today,
      actualizado_por: uid,
    })
      .then(() => (result = 'OK'))
      .catch(() => (result = 'ERROR'))
  } catch (error) {
    console.error('Error actualizando documento: ', error)
  }
  return { result }
}
