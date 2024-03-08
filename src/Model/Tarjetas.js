import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import { db } from './Firebase'

export async function crearTarjeta({ titulo, imagen, categorias, contenido }) {
  let result = ''
  const tarjetasRef = collection(db, 'Tarjetas')
  const nuevaData = {
    titulo: titulo,
    imagen: imagen,
    categorias: categorias,
    contenido: contenido,
  }
  try {
    // Utiliza setDoc para agregar el nuevo documento
    await setDoc(doc(tarjetasRef), nuevaData)
    result = 'VALID'
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

export async function getTarjetaFromId({ uid }) {
  try {
    console.log(uid)
    const docRef = await doc(db, 'Tarjetas', uid)
    const documentSnapshot = await getDoc(docRef)

    if (documentSnapshot.exists()) {
      // Accede a los datos del documento
      const documentData = documentSnapshot.data()
      console.log('Datos del documento:', documentData)
      return documentData
    } else {
      console.log('El documento no existe')
      return null
    }
  } catch (error) {
    console.log(error)
  }
}
