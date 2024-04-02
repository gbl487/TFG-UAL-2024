import { SeeChatIcon } from '@icons/Icons'
import ChatEnd from './ChatEnd'
import ChatStart from './ChatStart'
import ChatHeader from './ChatHeader'
import useMediaQuery from '@hooks/useMediaQuery'
import { useEffect, useState } from 'react'
import { getAllNifs } from 'src/Model/Usuario'
import AsisegLoader from '@components/Buttons/AsisegLoader'

export default function Chat() {
  const desktop = useMediaQuery('768')
  const [pacientes, setPacientes] = useState([])
  const [loadPacientes, setLoadPacientes] = useState(true)
  const obtenerNifs = async () => {
    const pacientes = await getAllNifs()
    return pacientes
  }
  useEffect(() => {
    setLoadPacientes(true)
    obtenerNifs().then((result) => setPacientes(result))
    setLoadPacientes(false)
  }, [])
  return (
    <div className="h-screen flex flex-col">
      {/* Header fijo */}
      <header className="h-20 fixed top-0 w-full z-10">
        <ChatHeader />
      </header>

      {/* Contenedor principal */}
      <div className="flex flex-1 mt-20 overflow-hidden">
        {/* Lista de chats */}
        <div className="w-full md:w-1/5 lg:w-1/6 border-r overflow-y-auto max-h-full">
          {loadPacientes ? (
            <div className="flex flex-1 h-full justify-center items-center">
              <AsisegLoader />
            </div>
          ) : (
            <div className=" bg-asiseg-blue/70 hover:p-2 overflow-auto">
              {pacientes.map((paciente, index) => {
                return (
                  <div
                    key={index}
                    className="h-20 flex flex-row justify-around items-center hover:border hover:rounded-lg  cursor-pointer"
                  >
                    <p className="text-white font-semibold text-xl">
                      {paciente}
                    </p>
                    <SeeChatIcon />
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Conversación */}
        {desktop && (
          <div className="flex-1 flex flex-col">
            <div className="overflow-y-auto max-h-full px-10 mt-2">
              <div className="flex flex-col">
                <ChatStart
                  username={'Dr. Gabriel Jesus Bernardez Luque'}
                  fechaMensaje={'20/03/24 12:45'}
                  contenido={
                    'You were the Chosen One! You were the Chosen One! You were the Chosen One! You were the Chosen One! You were the Chosen One! You were the Chosen One! You were the Chosen One!You were the Chosen One!You were the Chosen One!You were the Chosen One!You were the Chosen One!You were the Chosen One!You were the Chosen One!'
                  }
                />
                <ChatEnd
                  username={'Gabu'}
                  fechaMensaje={'20/03/24 12:45'}
                  contenido={'You were the Chosen One!'}
                />
                <ChatStart
                  username={'Dr. Gabriel Jesus Bernardez Luque'}
                  fechaMensaje={'20/03/24 12:45'}
                  contenido={
                    'You were the Chosen One! You were the Chosen One! You were the Chosen One! You were the Chosen One! You were the Chosen One! You were the Chosen One! You were the Chosen One!You were the Chosen One!You were the Chosen One!You were the Chosen One!You were the Chosen One!You were the Chosen One!You were the Chosen One!'
                  }
                />
                <ChatEnd
                  username={'Gabu'}
                  fechaMensaje={'20/03/24 12:45'}
                  contenido={'You were the Chosen One!'}
                />
                <ChatEnd
                  username={'Gabu'}
                  fechaMensaje={'20/03/24 12:45'}
                  contenido={'You were the Chosen One!'}
                />
                <ChatEnd
                  username={'Gabu'}
                  fechaMensaje={'20/03/24 12:45'}
                  contenido={'You were the Chosen One!'}
                />
                <ChatEnd
                  username={'Gabu'}
                  fechaMensaje={'20/03/24 12:45'}
                  contenido={'You were the Chosen One!'}
                />
                <ChatEnd
                  username={'Gabu'}
                  fechaMensaje={'20/03/24 12:45'}
                  contenido={'You were the Chosen One!'}
                />
                <ChatEnd
                  username={'Gabu'}
                  fechaMensaje={'20/03/24 12:45'}
                  contenido={'You were the Chosen One!'}
                />
                <ChatEnd
                  username={'Gabu'}
                  fechaMensaje={'20/03/24 12:45'}
                  contenido={'You were the Chosen One!'}
                />

                <ChatEnd
                  username={'Gabu'}
                  fechaMensaje={'20/03/24 12:45'}
                  contenido={'You were the Chosen One!'}
                />
                <ChatEnd
                  username={'Gabu'}
                  fechaMensaje={'20/03/24 12:45'}
                  contenido={'You were the Chosen One!'}
                />
              </div>
            </div>
            <div className="px-10 mb-5 h-10 w-full border-none rounded text-md flex flex-row items-center">
              <input
                type="text"
                className="asiseg_input h-10 ps-2 w-full rounded-md"
                placeholder="Escribe un mensaje"
              />
              <button className="ml-2 bg-asiseg-blue p-2 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-send-2"
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#ffffff"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z" />
                  <path d="M6.5 12h14.5" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
