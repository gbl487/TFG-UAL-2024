import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import 'primereact/resources/themes/tailwind-light/theme.css'
import { getAllNifs } from 'src/Model/Usuario'
import { Calendar } from 'primereact/calendar'
import 'primereact/resources/themes/tailwind-light/theme.css'
import { addLocale } from 'primereact/api'
import { crearCita } from 'src/Model/Citas'
import { setCitaModal } from 'src/Controllers/context/cita_modal_context'
import AsisegLoader from '@components/Buttons/AsisegLoader'
export default function CrearCita({ onCitaCreada }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [pacientes, setPacientes] = useState([])
  const [errorPaciente, setErrorPaciente] = useState(false)
  const [paciente, setPaciente] = useState()
  const [fecha, setFecha] = useState()
  const [errorFecha, setErrorFecha] = useState()
  const [hora, setHora] = useState()
  const [loading, setLoading] = useState(false)
  const onSubmit = async (data) => {
    if (errorFecha) return
    if (!pacientes.includes(data.paciente)) {
      setErrorPaciente(true)
      return
    } else {
      setErrorPaciente(false)
    }
    setLoading(true)
    const { result } = await crearCita({
      paciente: data.paciente,
      fechaCita: data.fecha_cita,
      horaCita: data.hora_cita,
      mensaje: data.mensaje,
    })
    setLoading(false)
    setCitaModal({ value: false })
    if (result === 'OK') {
      onCitaCreada()
    }
  }

  const handleFechaSelect = (e) => {
    const selectedDate = e.value
    const today = new Date()
    // Verificar si la fecha seleccionada es mayor o igual a hoy
    setFecha(selectedDate)
    if (selectedDate <= today) {
      setErrorFecha('FECHA_MENOR')
    } else {
      setErrorFecha()
    }
  }
  useEffect(() => {
    const obtenerNifs = async () => {
      const pacientes = await getAllNifs()
      return pacientes
    }
    obtenerNifs().then((result) => setPacientes(result))
  }, [])

  addLocale('es', {
    firstDayOfWeek: 1,
    showMonthAfterYear: false,
    dayNames: [
      'domingo',
      'lunes',
      'martes',
      'miércoles',
      'jueves',
      'viernes',
      'sábado',
    ],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: [
      'enero-',
      'febrero-',
      'marzo-',
      'abril-',
      'mayo-',
      'junio-',
      'julio-',
      'agosto-',
      'septiembre-',
      'octubre-',
      'noviembre-',
      'diciembre-',
    ],
    monthNamesShort: [
      'ene',
      'feb',
      'mar',
      'abr',
      'may',
      'jun',
      'jul',
      'ago',
      'sep',
      'oct',
      'nov',
      'dic',
    ],
    today: 'Hoy',
    clear: 'Borrar',
  })

  const dateTemplate = (date) => {
    const fechaActual = new Date()
    if (
      date.month < fechaActual.getMonth() ||
      date.year < fechaActual.getFullYear() ||
      (date.month === fechaActual.getMonth() &&
        date.day <= fechaActual.getDate())
    ) {
      return (
        <strong style={{ textDecoration: 'line-through' }}>{date.day}</strong>
      )
    }
    return date.day
  }

  return (
    <div className="space-y-4 md:space-y-6 w-full">
      <h1 className="text-lg font-bold leading-tight tracking-tight text-gray-900 md:text-xl">
        Introduzca los siguientes datos para dar de alta la cita
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        action="#"
        className="space-y-4 w-full"
      >
        <div className="w-full px-4 ">
          <span className="p-float-label">
            Paciente
            <select
              value={paciente}
              className="select asiseg_input min-h-8 h-8 ps-2 w-full rounded-md bg-white text-sm"
              onChange={(e) => setPaciente(e.target.value)}
              {...register('paciente', { required: true })}
            >
              <option defaultValue="Escoja un paciente">
                Escoja un paciente
              </option>
              {pacientes.map((nif, index) => {
                return (
                  <option key={index} value={nif}>
                    {nif}
                  </option>
                )
              })}
            </select>
            {errors.paciente?.type === 'required' ||
              (errorPaciente && (
                <small className="text-red-400 text-xs" role="alert">
                  Este campo es obligatorio
                </small>
              ))}
          </span>
        </div>
        <div className="w-full px-4 flex flex-col">
          <span>Fecha de la cita</span>
          <Calendar
            {...register('fecha_cita', { required: true })}
            id="fecha_cita"
            dateFormat="dd/mm/yy"
            value={fecha}
            onSelect={handleFechaSelect}
            className="asiseg-input h-8 text-sm"
            locale="es"
            dateTemplate={dateTemplate}
          />
          {errorFecha === 'FECHA_MENOR' && (
            <small className="text-red-400 text-xs" role="alert">
              La fecha seleccionada no es válida
            </small>
          )}
        </div>
        <div className="w-full px-4 flex flex-col">
          <span>Hora de la cita</span>
          <input
            type="time"
            id="hora_cita"
            name="hora_cita"
            value={hora}
            onChange={(e) => setHora(e.value)}
            {...register('hora_cita', { required: true })}
            className="select asiseg_input min-h-8 h-8 ps-2 w-full rounded-md bg-white text-sm"
          />
        </div>

        <div className="w-full px-4">
          <span className="w-full flex flex-col">
            Mensaje
            <textarea
              id="mensaje"
              className="textarea asiseg-input bg-white border-[#a6a6a6] focus:outline-asiseg-blue focus:border-asiseg-blue"
              placeholder="Contenido del mensaje..."
              {...register('mensaje', { required: true })}
            ></textarea>
            {errors.mensaje?.type === 'required' && (
              <small className="text-red-400 text-xs" role="alert">
                Este campo es obligatorio
              </small>
            )}
          </span>
        </div>

        <div className={`flex ${loading ? 'justify-center' : 'justify-end'}`}>
          {loading ? (
            <AsisegLoader showLogo={false} />
          ) : (
            <input
              type="submit"
              id="crear_cita"
              value={'Crear'}
              className=" text-white bg-asiseg-blue opacity-65 hover:opacity-100 transition-opacity p-2 rounded-md mb-4 cursor-pointer"
            />
          )}
        </div>
      </form>
    </div>
  )
}
