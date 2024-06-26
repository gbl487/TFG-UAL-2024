import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore'
import { db } from './Firebase'
import { getIdUsuario, getNIFUsuarioFromId } from './Usuario'

export async function crearChat({ idPaciente }) {
  const chatRef = collection(db, 'Chats')
  let resultadoChat
  const chatExistente = await comprobarChatExistente({ idPaciente })

  if (!chatExistente) {
    const nuevaData = {
      idPaciente: idPaciente,
      fechaCreacion: new Date(),
    }
    // Utiliza setDoc para agregar el nuevo documento
    await setDoc(doc(chatRef), nuevaData)
      .then(() => {
        resultadoChat = 'OK'
      })
      .catch(() => {
        resultadoChat = 'ERROR'
      })
  } else {
    // Añadimos un nuevo mensaje
    console.log(resultadoChat)
  }
  return { resultadoChat }
}

export async function comprobarChatExistente({ idPaciente }) {
  const q = query(
    collection(db, 'Chats'),
    where('idPaciente', '==', idPaciente)
  )
  const querySnapshot = await getDocs(q)
  return querySnapshot.empty ? false : true
}

export async function añadirMensajeCita({ idPaciente, fecha, hora, mensaje }) {
  let resultadoChat
  const emisor = getIdUsuario()
  const mensajeChat = `Buenas, se ha planificado una cita programada para el día ${fecha} a las ${hora}. Se ha agreado el siguiente mensaje: ${mensaje}`
  const chatRef = collection(db, 'Chats')
  const nuevaData = {
    idPaciente,
    fechaCreacion: new Date(),
    mensaje: mensajeChat,
    emisor,
  }
  // Utiliza setDoc para agregar el nuevo documento
  await setDoc(doc(chatRef), nuevaData)
    .then(() => {
      resultadoChat = 'OK'
    })
    .catch(() => {
      resultadoChat = 'ERROR'
    })
  return { resultadoChat }
}

export async function añadirMensaje({ idPaciente, mensaje }) {
  let resultadoChat
  const emisor = getIdUsuario()
  const chatRef = collection(db, 'Chats')
  const nuevaData = {
    idPaciente,
    fechaCreacion: new Date(),
    mensaje,
    emisor,
  }
  // Utiliza setDoc para agregar el nuevo documento
  await setDoc(doc(chatRef), nuevaData)
    .then(() => {
      resultadoChat = 'OK'
    })
    .catch(() => {
      resultadoChat = 'ERROR'
    })
  return { resultadoChat }
}

export async function getChatPaciente({ paciente }) {
  let mensajes = []
  const q = query(
    collection(db, 'Chats'),
    where('idPaciente', '==', paciente),
    orderBy('fechaCreacion', 'asc') // Ensure proper ordering here
  )
  const querySnapshot = await getDocs(q)
  // const [chats, loading, error] = useCollectionData(q, { idField: 'id' })
  // console.log(chats)
  await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const fechaObj = new Date(doc.data().fechaCreacion.seconds * 1000)
      const fecha = fechaObj.toLocaleDateString('es-ES')
      const hora = fechaObj.toLocaleTimeString('es-ES', {
        hour: 'numeric',
        minute: 'numeric',
      })
      const fechaMensaje = `${fecha} ${hora}`
      const nombreEmisor = await getNIFUsuarioFromId({ id: doc.data().emisor })
      const mensaje = {
        emisor: doc.data().emisor,
        mensaje: doc.data().mensaje,
        fechaMensaje,
        nombreEmisor,
      }
      mensajes.push(mensaje)
    })
  )
  // Now mensajes array should be ordered correctly
  return { mensajes }
}
