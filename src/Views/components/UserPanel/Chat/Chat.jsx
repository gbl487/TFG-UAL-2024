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
  const obtenerNifs = async () => {
    const pacientes = await getAllNifs()
    return pacientes
  }

  const { chats, loading } = useChat({ id: conversacion })

  useEffect(() => {
    setLoadPacientes(true)
    obtenerNifs()
      .then((result) => setPacientes(result.sort()))
      .finally(() => setLoadPacientes(false))
  }, [])

  useEffect(() => {
    if (chats || conversacion || mensajeCreado) {
      if (chats && chats.length !== 0 && rolUsuario === 'USUARIO') {
        chats.at(-1).emisor !== usuario
          ? setInputMensaje(true)
          : setInputMensaje(false)
      }
      if (chats && chats.length > 0) {
        dummy.current?.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [conversacion, usuario, rolUsuario, mensajeCreado, chats])

  const handleClick = useCallback(
    async (e) => {
      e.preventDefault()
      if (!inputMensaje) return
      const nuevoMensaje = document.getElementById('nuevo_mensaje').value
      if (nuevoMensaje.length === 0) return
      const { resultadoChat } = await añadirMensaje({
        idPaciente: chats[0].idPaciente,
        mensaje: nuevoMensaje,
      })
      if (resultadoChat === 'OK') {
        setMensajeCreado(true)
        document.getElementById('nuevo_mensaje').value = ''
      }
      dummy.current.scrollIntoView({ behavior: 'smooth' })
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
      <div className="flex flex-1  overflow-hidden">
        {/* Lista de chats */}
        {rolUsuario === 'MEDICO' && (desktop || convMovil || !conversacion) && (
          <div className="w-full md:w-1/5 lg:w-1/6 border-r overflow-y-auto max-h-full">
            {loadPacientes ? (
              <div className="flex flex-1 h-full justify-center items-center">
                <AsisegLoader showLogo={false} />
              </div>
            ) : (
              <div className=" bg-asiseg-blue/70">
                {pacientes.map((paciente, index) => {
                  return (
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
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* Conversación */}
        {loading && (
          <div className="flex flex-1 h-full mt-20 justify-center items-center">
            <AsisegLoader />
          </div>
        )}

        {chats && (
          <div className="flex w-full justify-center pl-2">
            <div className="flex flex-col antialiased ">
              <div className="flex basis-[99%] items-start overflow-y-auto max-h-full mt-2 ">
                <div className="flex flex-col w-full justify-center">
                  {!convMovil && !desktop && rolUsuario !== 'USUARIO' && (
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        setConvMovil(true)
                        setConversacion()
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
              <div className="flex basis-basis-[1%] mb-5 h-10 border-none rounded text-md flex-row">
                <input
                  id="nuevo_mensaje"
                  type="text"
                  autoComplete="off"
                  disabled={!inputMensaje}
                  className="asiseg_input h-10 ps-2 w-full rounded-md"
                  placeholder="Escribe un mensaje"
                />
                <button
                  onClick={handleClick}
                  className="ml-2 bg-asiseg-blue h-10 p-2 rounded-lg"
                >
                  <SendMessageIcon />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
