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

export async function crearCita({ paciente, fechaCita, horaCita, mensaje }) {
  const uid = auth.currentUser.uid
  const citaRef = collection(db, 'Citas')
  let result
  const nuevaData = {
    medico: uid,
    paciente: paciente,
    fechaCita: fechaCita,
    horaCita: horaCita,
    mensaje: mensaje,
    fecha_creacion: new Date(),
  }
  // Utiliza setDoc para agregar el nuevo documento
  await setDoc(doc(citaRef), nuevaData)
    .then(() => {
      result = 'VALID'
    })
    .catch(() => {
      result = 'INVALID'
    })
  console.log(result)
  return { result }
}

export async function getCitas() {
  let citas = []
  let horaCita = ''
  let index = 0 // Declarar e inicializar el índice
  const uid = auth.currentUser.uid
  const q = query(collection(db, 'Citas'), where('medico', '==', uid))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    index++
    const fechaCita = doc.data().fechaCita.toDate() // Convertir a objeto Date
    horaCita = doc.data().horaCita
    const anio = fechaCita.getFullYear()
    const mes = fechaCita.getMonth()
    const dia = fechaCita.getDate()
    const horaInicio = parseInt(horaCita.substring(0, 2))
    const horaFin = horaInicio + 1
    const minuto = horaCita.substring(3, 5)
    const cita = {
      uid: doc.id,
      id: index,
      title: doc.data().paciente,
      start: new Date(anio, mes, dia, horaInicio, minuto),
      end: new Date(anio, mes, dia, horaFin, minuto),
      mensaje: doc.data().mensaje,
    }
    citas.push(cita)
  })
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
      .then(() => (result = 'VALID'))
      .catch(() => (result = 'INVALID'))
  } catch (error) {
    console.error('Error actualizando documento: ', error)
  }
  return { result }
}
