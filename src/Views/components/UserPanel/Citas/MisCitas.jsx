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
import AsisegLoader from '@components/Buttons/AsisegLoader'
import { useStore } from '@nanostores/react'
import {
  citaModModal,
  citaModal,
  setCitaModModal,
  setCitaModal,
} from 'src/Controllers/context/cita_modal_context'
import ModificarCita from './ModificarCita'
import Toast from '@components/core/Toast'
import { setToast } from 'src/Controllers/context/toast_context'
import PanelHeader from '../PanelHeader'

dayjs.locale('es')
const localizer = dayjsLocalizer(dayjs)
export default function MisCitas() {
  const modCita = useStore(citaModModal)
  const modal = useStore(citaModal)
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [cita, setCita] = useState(false)
  const [citaCreada, setCitaCreada] = useState(false)
  const [citaModificada, setCitaModificada] = useState(false)
  const [citaCancelada, setCitaCancelada] = useState(false)
  const onDoubleClickEvent = (calEvent) => {
    setCita({
      id: calEvent.uid,
      paciente: calEvent.title,
      fecha_cita: calEvent.start,
      mensaje: calEvent.mensaje,
    })
    setCitaModModal({ value: true })
  }

  const handleClick = (e) => {
    e.preventDefault()
    setCitaModal({ value: true })
  }
  const obtenerCitas = async () => {
    const citas = await getCitas()
    return citas
  }
  useEffect(() => {
    setLoading(true)
    obtenerCitas().then((result) => {
      setEvents(result)
      setLoading(false)
    })

    // Si se crea una cita, actualizar el estado para forzar el re-renderizado del componente
    if (citaCreada || citaModificada || citaCancelada) {
      if (citaCreada)
        setToast({ value: true, text: 'Cita creada correctamente' })
      if (citaModificada)
        setToast({ value: true, text: 'Cita modificada correctamente' })
      if (citaCancelada)
        setToast({ value: true, text: 'Cita cancelada correctamente' })
      obtenerCitas().then((result) => {
        setEvents(result)
        setCitaCreada(false) // Restaurar el estado
        setCitaModificada(false) // Restaurar el estado
        setCitaCancelada(false) // Restaurar el estado
        setLoading(false)
      })
    }
  }, [citaCreada, citaModificada, citaCancelada])

  return (
    <>
      <div className="h-screen flex flex-col">
        {/* Header */}
        <PanelHeader />
        {loading ? (
          <div className="flex w-full h-full justify-center items-center ">
            <AsisegLoader showLogo={false} />
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-5 mt-28">
              <button onClick={handleClick}>
                <AsisegButton text={'Añadir cita'} />
              </button>
            </div>
            <div className="h-[768px] mt-8 mx-2 md:mx-10">
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
      <Toast />
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
        header={`Cita del paciente: ${cita.paciente}`}
        visible={modCita}
        onHide={() => {
          setCitaModModal({ value: false })
        }}
        style={{ width: '700px', minWidth: '300px' }}
        breakpoints={{ '640px': '350px' }}
        className="bg-gray-50"
        draggable={false}
      >
        <ModificarCita
          cita={cita}
          onCitaModificada={() => setCitaModificada(true)}
          onCitaCancelada={() => setCitaCancelada(true)}
        />
      </Dialog>
    </>
  )
}
