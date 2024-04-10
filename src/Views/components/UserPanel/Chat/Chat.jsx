import { SeeChatIcon, SendMessageIcon } from '@icons/Icons'
import ChatEnd from './ChatEnd'
import ChatStart from './ChatStart'
import useMediaQuery from '@hooks/useMediaQuery'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  getAllNifs,
  getIdUsuario,
  getIdUsuarioFromNIF,
} from 'src/Model/Usuario'
import AsisegLoader from '@components/Buttons/AsisegLoader'
import PanelHeader from '../PanelHeader'
import { añadirMensaje } from 'src/Model/Chats'
import { useAuth } from 'src/Controllers/context/userContext'
import { AsisegButton } from '@components/Buttons/AddContentButton'
import { useChat } from '@hooks/useChat'
import { ROLES } from 'src/constants'
import { setBusquedaPaciente } from 'src/Controllers/context/searchPacient_context'
import { usePacientFilters } from '@hooks/usePacientFilters'
import isEmptyArray from 'src/Controllers/utils/isEmptyArray'
export default function Chat() {
  const usuario = getIdUsuario()
  const { rolUsuario } = useAuth()
  const desktop = useMediaQuery('1024')
  const [pacientes, setPacientes] = useState([])
  const [loadPacientes, setLoadPacientes] = useState(true)
  const [conversacion, setConversacion] = useState(
    rolUsuario === 'USUARIO' ? usuario : ''
  )
  const [inputMensaje, setInputMensaje] = useState(true)
  const [convMovil, setConvMovil] = useState(false)
  const [mensajeCreado, setMensajeCreado] = useState(false)
  const dummy = useRef()
  const { getPacientesFiltrados } = usePacientFilters()
  const obtenerNifs = async () => {
    const pacientes = await getAllNifs()
    return pacientes
  }
  const pacientesFiltrados = getPacientesFiltrados(pacientes)
  const { chats, loading } = useChat({ id: conversacion })

  useEffect(() => {
    setLoadPacientes(true)
    obtenerNifs()
      .then((result) => setPacientes(result.sort()))
      .finally(() => setLoadPacientes(false))
  }, [])

  useEffect(() => {
    if (chats || conversacion || mensajeCreado) {
      if (chats && chats.length !== 0 && rolUsuario === ROLES.USUARIO) {
        chats.at(-1).emisor !== usuario
          ? setInputMensaje(true)
          : setInputMensaje(false)
      }
      if (chats && chats.length > 0) {
        dummy.current?.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [conversacion, usuario, rolUsuario, mensajeCreado, chats])

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      if (!inputMensaje) return
      const nuevoMensajeInput = document.getElementById('nuevo_mensaje')
      if (!nuevoMensajeInput) return // Verifica si el elemento existe
      const nuevoMensaje = nuevoMensajeInput.value
      if (nuevoMensaje.length === 0) return
      const { resultadoChat } = await añadirMensaje({
        idPaciente: chats[0].idPaciente,
        mensaje: nuevoMensaje,
      })
      if (resultadoChat === 'OK') {
        setMensajeCreado(true)
        nuevoMensajeInput.value = ''
      }
      if (dummy.current) {
        // Asegúrate de que dummy.current exista antes de usarlo
        dummy.current.scrollIntoView({ behavior: 'smooth' })
      }
    },
    [inputMensaje, chats]
  )
  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="h-20 w-full">
        <PanelHeader />
      </header>

      {/* Contenedor principal */}
      <div className="flex flex-1 overflow-hidden">
        {/* Lista de chats */}
        {rolUsuario === ROLES.MEDICO &&
          (desktop || convMovil || !conversacion) && (
            <div className="flex flex-col w-full bg-asiseg-blue/70 lg:w-1/5 xl:w-1/6 border-r min-w-fit max-h-full">
              <div className="p-2 sticky">
                <input
                  id="busqueda_paciente"
                  type="text"
                  autoComplete="off"
                  onChange={(e) => {
                    e.preventDefault()
                    setBusquedaPaciente({ value: e.target.value })
                  }}
                  className="asiseg_input h-10 ps-2 w-full rounded-md"
                  placeholder="Buscar un chat"
                />
              </div>
              <div className="min-w-fit overflow-y-auto max-h-full">
                {loadPacientes ? (
                  <div className="flex flex-1 h-full justify-center items-center">
                    <AsisegLoader showLogo={false} />
                  </div>
                ) : (
                  <div>
                    {isEmptyArray(pacientesFiltrados) ? (
                      <div className="h-20 min-w-auto flex flex-row justify-center gap-x-2 items-center">
                        <p className="text-white font-semibold text-xl">
                          No hay resultados
                        </p>
                      </div>
                    ) : (
                      pacientesFiltrados.map((paciente, index) => (
                        <div
                          key={index}
                          className="h-20 min-w-auto flex flex-row justify-center gap-x-2 items-center hover:border hover:rounded-lg  cursor-pointer"
                          onClick={async () => {
                            const idPaciente = await getIdUsuarioFromNIF({
                              nif: paciente,
                            })
                            setConversacion(idPaciente)
                            setConvMovil(false)
                          }}
                        >
                          <p className="text-white font-semibold text-xl">
                            {paciente}
                          </p>
                          <SeeChatIcon />
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

        {/* Conversación */}
        {loading && (
          <div className="flex flex-1 h-full mt-20 justify-center items-center">
            <AsisegLoader />
          </div>
        )}

        {chats && (
          <div className="flex w-full antialiased justify-center">
            <div className="flex flex-col w-full">
              <div className="flex basis-[99%] items-start overflow-y-auto max-h-full">
                <div className="flex flex-col w-full justify-center px-1 md:px-5">
                  {!convMovil && !desktop && rolUsuario !== ROLES.USUARIO && (
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        setConvMovil(true)
                      }}
                      className="flex w-full h-20 justify-center items-center bg-white sticky z-10 top-0"
                    >
                      <AsisegButton text={'Ver otras conversacioness'} />
                    </button>
                  )}
                  {chats.length !== 0 ? (
                    chats.map((mensaje, indice) => {
                      const tipo = mensaje.emisor === usuario ? 'end' : 'start'
                      const fechaObj = new Date(
                        mensaje.fechaCreacion.seconds * 1000
                      )
                      const fecha = fechaObj.toLocaleDateString('es-ES')
                      const hora = fechaObj.toLocaleTimeString('es-ES', {
                        hour: 'numeric',
                        minute: 'numeric',
                      })
                      const fechaMensaje = `${fecha} ${hora}`
                      return (
                        <React.Fragment key={indice}>
                          {tipo === 'end' && (
                            <ChatEnd
                              username={mensaje.nombreEmisor}
                              fechaMensaje={fechaMensaje}
                              contenido={mensaje.mensaje}
                            />
                          )}
                          {tipo === 'start' && (
                            <ChatStart
                              username={mensaje.nombreEmisor}
                              fechaMensaje={fechaMensaje}
                              contenido={mensaje.mensaje}
                            />
                          )}
                        </React.Fragment>
                      )
                    })
                  ) : (
                    <div className="flex w-full flex-col justify-center mt-10 h-20">
                      <div className="flex justify-center h-20 items-center">
                        Aún no existen mensajes
                      </div>
                    </div>
                  )}
                  <span ref={dummy}></span>
                </div>
              </div>
              <form
                onSubmit={handleSubmit}
                className="flex basis-basis-[1%] mb-5 h-10 border-none rounded text-md flex-row px-1 md:px-5"
              >
                <input
                  id="nuevo_mensaje"
                  type="text"
                  autoComplete="off"
                  disabled={!inputMensaje}
                  className="asiseg_input h-10 ps-2 w-full rounded-md"
                  placeholder="Escribe un mensaje"
                />
                <button className="ml-2 bg-asiseg-blue h-10 p-2 rounded-lg">
                  <SendMessageIcon />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
