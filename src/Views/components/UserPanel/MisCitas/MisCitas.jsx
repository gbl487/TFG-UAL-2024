import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './miscitas.css'
import 'moment/locale/es'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { useState } from 'react'
import { AsisegButton } from '@components/Buttons/AddContentButton'
import { Dialog } from 'primereact/dialog'
import CrearCita from './CrearCita'

dayjs.locale('es')
const localizer = dayjsLocalizer(dayjs)
export default function MisCitas() {
  const [modal, setModal] = useState(false)
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Evento 1',
      start: new Date(2024, 2, 15, 10, 0), // Año, Mes (0-11), Día, Hora, Minuto
      end: new Date(2024, 2, 15, 12, 0),
      allDay: true,
      paciente: 'paciente',
    },
    {
      id: 2,
      title: 'Evento 2',
      start: new Date(2024, 2, 20),
      end: new Date(2024, 2, 20),
    },
    {
      id: 3,
      title: 'Evento 3',
      start: new Date(2024, 2, 21, 11, 0),
      end: new Date(2024, 2, 21, 13, 0),
    },
    // Agrega más eventos según necesites
  ])
  const onDoubleClickEvent = (calEvent) => {
    console.log(calEvent)
  }

  const handleClick = (e) => {
    e.preventDefault()
    // const newEvent = {
    //   id: 4,
    //   title: 'Evento 4',
    //   start: new Date(2024, 2, 21, 11, 0),
    //   end: new Date(2024, 2, 21, 13, 0),
    // }
    // setEvents([...events, newEvent])
    setModal(true)
  }

  return (
    <>
      <div className="p-4 md:ml-64 w-auto h-full">
        <div className="flex justify-center">
          <button onClick={handleClick}>
            <AsisegButton text={'Añadir cita'} />
          </button>
        </div>
        <div className="h-[960px]">
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
              event: 'Eventos',
              work_week: 'Semana',
              noEventsInRange: 'No existen eventos en este rango de fechas.',
            }}
            onDoubleClickEvent={onDoubleClickEvent}
          />
        </div>
      </div>
      <Dialog
        header={'Añadir una cita'}
        visible={modal}
        onHide={() => {
          setModal(false)
        }}
        style={{ width: '450px', minWidth: '300px' }}
        breakpoints={{ '640px': '350px' }}
        className="bg-gray-50"
        draggable={false}
      >
        <CrearCita />
      </Dialog>
    </>
  )
}
