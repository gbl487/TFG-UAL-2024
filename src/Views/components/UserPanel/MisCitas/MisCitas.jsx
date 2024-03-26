import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './miscitas.css'
import 'moment/locale/es'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { useEffect, useState } from 'react'
import { AsisegButton } from '@components/Buttons/AddContentButton'
import { Dialog } from 'primereact/dialog'
import CrearCita from './CrearCita'
import { getCitas } from 'src/Model/Citas'
import { auth } from 'src/Model/Firebase'
import AsisegLoader from '@components/Buttons/AsisegLoader'
import { useStore } from '@nanostores/react'
import {
  citaModal,
  setCitaModal,
} from 'src/Controllers/context/cita_modal_context'

dayjs.locale('es')
const localizer = dayjsLocalizer(dayjs)
export default function MisCitas() {
  const [visualizarModal, setVisualizarModal] = useState(false)
  const modal = useStore(citaModal)
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [cita, setCita] = useState(false)
  const [citaCreada, setCitaCreada] = useState(false)
  const onDoubleClickEvent = (calEvent) => {
    console.log(calEvent)

    setCita({
      paciente: calEvent.title,
      fecha_cita: calEvent.start.toLocaleDateString('es-ES'),
      hora_cita: calEvent.start.toLocaleTimeString('es-ES'),
      mensaje: calEvent.mensaje,
    })
    setVisualizarModal(true)
  }

  const handleClick = (e) => {
    e.preventDefault()
    setCitaModal({ value: true })
  }

  useEffect(() => {
    const obtenerCitas = async () => {
      const uid = auth.currentUser.uid
      const citas = await getCitas({ uid })
      return citas
    }

    setLoading(true)
    obtenerCitas().then((result) => {
      setEvents(result)
      setLoading(false)
    })

    // Si se crea una cita, actualizar el estado para forzar el re-renderizado del componente
    if (citaCreada) {
      obtenerCitas().then((result) => {
        setEvents(result)
        setCitaCreada(false) // Restaurar el estado
      })
    }
  }, [citaCreada])

  return (
    <>
      <div className="p-4 md:ml-64 w-auto h-screen">
        {loading ? (
          <div className="flex w-full h-full justify-center items-center">
            <AsisegLoader showLogo={false} />
          </div>
        ) : (
          <>
            <div className="flex justify-center">
              <button onClick={handleClick}>
                <AsisegButton text={'Añadir cita'} />
              </button>
            </div>
            <div className="h-[768px]">
              <Calendar
                culture={'es'}
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={{
                  today: 'Hoy',
                  next: 'Sig',
                  previous: 'Ant',
                  month: 'Mes',
                  week: 'Semana',
                  day: 'Día',
                  agenda: 'Agenda',
                  date: 'Fecha',
                  time: 'Hora',
                  event: 'Citas',
                  work_week: 'Semana',
                  noEventsInRange: 'No existen citas en este rango de fechas.',
                }}
                onDoubleClickEvent={onDoubleClickEvent}
              />
            </div>
          </>
        )}
      </div>
      <Dialog
        id="crear_Cita"
        header={'Añadir una cita'}
        visible={modal}
        onHide={() => {
          setCitaModal({ value: false })
        }}
        style={{ width: '700px', minWidth: '300px' }}
        breakpoints={{ '640px': '350px' }}
        className="bg-gray-50"
        draggable={false}
      >
        <CrearCita onCitaCreada={() => setCitaCreada(true)} />
      </Dialog>
      <Dialog
        id="vis_cita"
        header={'Visualizar cita'}
        visible={visualizarModal}
        onHide={() => {
          setVisualizarModal(false)
        }}
        style={{ width: '700px', minWidth: '300px' }}
        breakpoints={{ '640px': '350px' }}
        className="bg-gray-50"
        draggable={false}
      >
        {/* <VisualizarCita /> */}
        <div className="space-y-4 md:space-y-6 w-full">
          <p>
            <strong>Paciente: </strong>
            {cita.paciente}
          </p>
          <p>
            <strong>Fecha de la cita: </strong>
            {cita.fecha_cita}
          </p>
          <p>
            <strong>Hora de la cita: </strong>
            {cita.hora_cita}
          </p>
          <textarea
            name="textarea"
            id=""
            className="w-full min-h-40 max-h-40"
            value={cita.mensaje}
            disabled
          ></textarea>
        </div>
      </Dialog>
    </>
  )
}
