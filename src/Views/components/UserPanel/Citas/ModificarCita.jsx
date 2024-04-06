import { useEffect, useState } from 'react'
import 'primereact/resources/themes/tailwind-light/theme.css'
import { Calendar } from 'primereact/calendar'
import 'primereact/resources/themes/tailwind-light/theme.css'
import { addLocale } from 'primereact/api'
import AsisegLoader from '@components/Buttons/AsisegLoader'
import { setCitaModModal } from 'src/Controllers/context/cita_modal_context'
import { cancelarCita, modificarCita } from 'src/Model/Citas'
import { AsisegButton } from '@components/Buttons/AddContentButton'
export default function ModificarCita({
  onCitaModificada,
  onCitaCancelada,
  cita,
}) {
  const [fecha, setFecha] = useState()
  const [errorFecha, setErrorFecha] = useState()
  const [hora, setHora] = useState()
  const [errorHora, setErrorHora] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [errorMensaje, setErrorMensaje] = useState(false)
  const [loading, setLoading] = useState(false)
  const [modCita, setModCita] = useState(false)
  const [noChange, setNoChange] = useState(false)
  const [cancelar, setCancelar] = useState(false)
  useEffect(() => {
    if (!modCita) {
      const horaCita = cita.fecha_cita.getHours().toString().padStart(2, '0')
      const minutoCita = cita.fecha_cita
        .getMinutes()
        .toString()
        .padStart(2, '0')
      setHora(`${horaCita}:${minutoCita}`)
      setMensaje(cita.mensaje)
      setFecha(cita.fecha_cita)
    }
  }, [cita, modCita])

  const handleFechaSelect = (e) => {
    const selectedDate = e.value
    console.log(selectedDate)
    const hoy = new Date()
    // Verificar si la fecha seleccionada es mayor o igual a hoy
    setFecha(selectedDate)
    if (selectedDate <= hoy) {
      setErrorFecha('FECHA_MENOR')
    } else {
      setErrorFecha()
    }
  }

  const handleHoraChange = (e) => {
    const newHora = e.target.value
    if (newHora === '') console.log('hora invalida')
    const hora = newHora.substring(0, 2)
    const minuto = newHora.substring(3, 5)
    setHora(`${hora}:${minuto}`)
  }

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

  const consultarModificacion = (e) => {
    const fechaHTML = document.getElementById('hora_cita')
    if (!fechaHTML.checkValidity()) {
      setErrorHora(true)
      return
    }
    setErrorHora(false)
    if (mensaje === '') {
      setErrorMensaje(true)
      return
    }
    setErrorMensaje(false)
    const horaCita = cita.fecha_cita.getHours().toString().padStart(2, '0')
    const minutoCita = cita.fecha_cita.getMinutes().toString().padStart(2, '0')
    const horaOld = `${horaCita}:${minutoCita}`

    if (
      cita.fecha_cita !== fecha ||
      hora !== horaOld ||
      mensaje !== cita.mensaje
    ) {
      setNoChange(false)
      showModal(e)
    } else {
      setNoChange(true)
    }
  }

  const enviarModificacion = async (e) => {
    e.preventDefault()
    document.getElementById('my_modal').close()
    setLoading(true)
    const { result } = await modificarCita({
      cita,
      fechaCita: fecha,
      horaCita: hora,
      mensaje,
    })
    setLoading(false)
    setCitaModModal({ value: false })
    if (result === 'OK') {
      onCitaModificada()
    }
  }

  const showModal = () => {
    document.getElementById('my_modal').showModal()
  }

  const handleCancelacion = async () => {
    setLoading(true)
    const { result } = await cancelarCita({ id: cita.id })
    setCitaModModal({ value: false })
    setLoading(true)
    if (result === 'OK') {
      onCitaCancelada()
    }
  }

  return (
    <div className="space-y-4 md:space-y-6 w-full">
      <div className="space-y-4 w-full">
        <div className="w-full px-4 ">
          <span className="p-float-label">
            Paciente
            <select
              className="select asiseg_input min-h-8 h-8 ps-2 w-full rounded-md bg-white disabled:bg-white disabled:text-inherit disabled:asiseg-input text-sm border-none"
              value={cita.paciente}
              disabled
            >
              <option defaultValue="Escoja un paciente">
                Escoja un paciente
              </option>
              <option key="1" value={cita.paciente}>
                {cita.paciente}
              </option>
            </select>
          </span>
        </div>
        <div className="w-full px-4 flex flex-col">
          <span>Fecha de la cita</span>
          <Calendar
            id="fecha_cita"
            dateFormat="dd/mm/yy"
            value={fecha}
            onSelect={handleFechaSelect}
            locale="es"
            disabled={modCita ? false : true}
            className="asiseg-input  h-8 text-sm"
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
            disabled={modCita ? false : true}
            onChange={handleHoraChange} // Función de manejo de cambios
            className="select asiseg_input min-h-8 h-8 ps-2 w-full rounded-md bg-white text-sm disabled:bg-white disabled:text-inherit disabled:asiseg-input border-none"
          />
          {modCita && errorHora && (
            <small className="text-red-400 text-xs mt-1" role="alert">
              Formato de fecha no válida
            </small>
          )}
        </div>

        <div className="w-full px-4">
          <span className="w-full flex flex-col">
            Mensaje
            <textarea
              id="mensaje"
              disabled={modCita ? false : true}
              value={mensaje}
              onChange={(e) => {
                setMensaje(e.target.value)
              }}
              className="textarea asiseg-input bg-white  focus:outline-asiseg-blue focus:border-asiseg-blue disabled:bg-white disabled:text-inherit disabled:asiseg-input disabled:border-[#a6a6a6]"
              placeholder="Contenido del mensaje..."
            ></textarea>
            {modCita && errorMensaje && (
              <small className="text-red-400 text-xs mt-1" role="alert">
                Este campo es obligatorio
              </small>
            )}
          </span>
        </div>
        {modCita && noChange && (
          <small className="text-red-400 text-xs" role="alert">
            No se han realizado cambios
          </small>
        )}

        <div className={`flex ${loading ? 'justify-center' : 'justify-end'}`}>
          {loading ? (
            <AsisegLoader showLogo={false} />
          ) : (
            <>
              <button
                id="mod_vis_cita"
                className="mr-4"
                onClick={() => {
                  setModCita(!modCita)
                }}
              >
                <AsisegButton
                  text={modCita ? 'Volver a visualizar' : 'Modificar cita'}
                />
              </button>
              {modCita && (
                <>
                  <button
                    id="modificar_cita"
                    className="mr-4"
                    onClick={(e) => {
                      e.preventDefault()
                      consultarModificacion(e)
                    }}
                  >
                    <AsisegButton text="Enviar modificación" />
                  </button>
                </>
              )}
              <button
                id="cancelar_cita"
                className="mr-4"
                onClick={(e) => {
                  e.preventDefault()
                  setCancelar(true)
                  showModal()
                }}
              >
                <AsisegButton tipo={'ERROR'} text="Cancelar cita" />
              </button>
            </>
          )}
        </div>
      </div>
      <dialog id="my_modal" className="modal">
        <div className="modal-box bg-white">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg text-orange-500">¡Advertencia!</h3>
          <p className="py-5">
            {cancelar
              ? 'Está a punto de cancelar esta cita, ¿está seguro?'
              : 'Está a punto de modificar esta cita, ¿está seguro?'}
          </p>
          <form method="dialog" className="flex justify-end gap-x-2">
            <button
              onClick={(e) => {
                e.preventDefault()
                cancelar ? handleCancelacion() : enviarModificacion(e)
              }}
              className="btn btn-primary text-white p-2 rounded-md"
            >
              Aceptar
            </button>
            <button className="btn btn-error text-white p-2 rounded-md">
              Cancelar
            </button>
          </form>
        </div>
      </dialog>
    </div>
  )
}
