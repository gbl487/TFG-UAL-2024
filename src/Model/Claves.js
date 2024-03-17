import { collection, doc, getDocs, setDoc } from 'firebase/firestore'
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
