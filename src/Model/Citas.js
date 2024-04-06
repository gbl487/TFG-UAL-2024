// import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { auth, db } from './Firebase'
import { getIdUsuarioFromNIF, getNIFUsuarioFromId } from './Usuario'
import { añadirMensaje } from './Chats'
import { generarCodigo } from 'src/Controllers/utils/generarCodigoAleatorio'

export async function crearCita({ paciente, fechaCita, horaCita, mensaje }) {
  const uid = auth.currentUser.uid
  const citaRef = collection(db, 'Citas')
  let result
  const idPaciente = await getIdUsuarioFromNIF({ nif: paciente })
  const idCita = await crearIdUnicoCita()
  const nuevaData = {
    idCita,
    medico: uid,
    paciente: idPaciente,
    fechaCita: fechaCita,
    horaCita: horaCita,
    mensaje: mensaje,
    fechaCreacion: new Date(),
  }
  // Utiliza setDoc para agregar el nuevo documento
  await setDoc(doc(citaRef), nuevaData)
    .then(() => {
      result = 'OK'
    })
    .catch(() => {
      result = 'ERROR'
    })
  if (result === 'OK') {
    console.log()
    const fecha = fechaCita.toLocaleDateString('es-ES')
    // Creamos el chat
    const { resultadoChat } = await añadirMensaje({
      idCita,
      idPaciente,
      fecha,
      hora: horaCita,
      mensaje,
    })
    console.log(resultadoChat)
  }
  return { result }
}

export async function crearIdUnicoCita() {
  let idCita
  const arraysIds = await obtenerIdsCitas()
  do {
    let seccion1 = generarCodigo(6)
    let seccion2 = generarCodigo(4)
    let seccion3 = generarCodigo(4)
    let seccion4 = generarCodigo(6)
    idCita = `${seccion1}-${seccion2}-${seccion3}-${seccion4}`
  } while (arraysIds.includes(idCita))
  return idCita
}

export async function obtenerIdsCitas() {
  try {
    // Utiliza setDoc para agregar el nuevo documento
    const querySnapshot = await getDocs(collection(db, 'Citas'))
    const arrayCitas = []
    querySnapshot.forEach((doc) => {
      arrayCitas.push(doc.data().idCita)
    })
    return arrayCitas
  } catch (error) {
    console.log(error)
  }
}

export async function getCitas() {
  const citas = []
  const uid = auth.currentUser.uid
  const q = query(collection(db, 'Citas'), where('medico', '==', uid))
  const querySnapshot = await getDocs(q)

  // Usar Promise.all para esperar a que todas las promesas se resuelvan
  await Promise.all(
    querySnapshot.docs.map(async (doc, index) => {
      if (!doc.data().cancelada) {
        const fechaCita = doc.data().fechaCita.toDate() // Convertir a objeto Date
        const horaCita = doc.data().horaCita
        const anio = fechaCita.getFullYear()
        const mes = fechaCita.getMonth()
        const dia = fechaCita.getDate()
        const horaInicio = parseInt(horaCita.substring(0, 2))
        const horaFin = horaInicio + 1
        const minuto = horaCita.substring(3, 5)
        const nif = await getNIFUsuarioFromId({ id: doc.data().paciente })
        const cita = {
          uid: doc.id,
          id: index + 1,
          title: nif,
          start: new Date(anio, mes, dia, horaInicio, minuto),
          end: new Date(anio, mes, dia, horaFin, minuto),
          mensaje: doc.data().mensaje,
        }
        citas.push(cita)
      }
    })
  )
  return citas
}

export async function modificarCita({ cita, fechaCita, horaCita, mensaje }) {
  let result = ''
  const citaRef = doc(db, 'Citas', cita.id)
  const today = new Date()
  try {
    const nuevosDatos = {
      fechaCita: fechaCita,
      horaCita: horaCita,
      mensaje: mensaje,
      fecha_actualizacion: today,
    }
    await updateDoc(citaRef, nuevosDatos)
      .then(() => (result = 'OK'))
      .catch(() => (result = 'ERROR'))
  } catch (error) {
    console.error('Error actualizando documento: ', error)
  }
  return { result }
}

export async function cancelarCita({ id }) {
  let result = ''
  const citaRef = doc(db, 'Citas', id)
  const today = new Date()
  const uid = auth.currentUser.uid
  try {
    await updateDoc(citaRef, {
      cancelada: true,
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
