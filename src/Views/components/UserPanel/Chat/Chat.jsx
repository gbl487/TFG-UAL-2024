import { SeeChatIcon, SendMessageIcon } from '@icons/Icons'
import ChatEnd from './ChatEnd'
import ChatStart from './ChatStart'
import useMediaQuery from '@hooks/useMediaQuery'
import React, { useEffect, useState } from 'react'
import { getAllNifs, getIdUsuario } from 'src/Model/Usuario'
import AsisegLoader from '@components/Buttons/AsisegLoader'
import PanelHeader from '../PanelHeader'
import { añadirMensaje, getChatPaciente } from 'src/Model/Chats'
import { useAuth } from 'src/Controllers/context/userContext'
import { AsisegButton } from '@components/Buttons/AddContentButton'

export default function Chat() {
  const usuario = getIdUsuario()
  const { rolUsuario } = useAuth()
  const desktop = useMediaQuery('1024')
  const [pacientes, setPacientes] = useState([])
  const [loadPacientes, setLoadPacientes] = useState(true)
  const [loadMensajes, setLoadMensajes] = useState(true)
  const [conversacion, setConversacion] = useState()
  const [mensajes, setMensajes] = useState()
  const [nuevoMensaje, setNuevoMensaje] = useState()
  const [inputMensaje, setInputMensaje] = useState(true)
  const [idChat, setIdChat] = useState()
  const [convMovil, setConvMovil] = useState(false)

  const obtenerNifs = async () => {
    const pacientes = await getAllNifs()
    return pacientes
  }
  useEffect(() => {
    setLoadPacientes(true)
    obtenerNifs().then((result) => setPacientes(result.sort()))
    setLoadPacientes(false)
  }, [])

  useEffect(() => {
    setLoadMensajes(true)
    if (conversacion || rolUsuario === 'USUARIO') {
      const paciente = rolUsuario === 'USUARIO' ? usuario : conversacion
      const nif = rolUsuario === 'USUARIO' ? false : true
      getChatPaciente({ paciente, nif }).then((result) => {
        setMensajes(result.mensajes)
        setIdChat(result.idPaciente)
        if (result.mensajes.length !== 0)
          result.mensajes.at(-1).emisor !== usuario
            ? setInputMensaje(true)
            : setInputMensaje(false)
      })
    }
    setLoadMensajes(false)
  }, [conversacion, usuario, rolUsuario])

  const handleClick = async (e) => {
    e.preventDefault()
    if (!inputMensaje) return
    const { resultadoChat } = await añadirMensaje({
      idPaciente: idChat,
      fecha: new Date(),
      mensaje: nuevoMensaje,
    })
    console.log(resultadoChat)
    console.log(nuevoMensaje)
  }
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
                <AsisegLoader />
              </div>
            ) : (
              <div className=" bg-asiseg-blue/70  overflow-auto">
                {pacientes.map((paciente, index) => {
                  return (
                    <div
                      key={index}
                      className="h-20 min-w-auto flex flex-row justify-center gap-x-2 items-center hover:border hover:rounded-lg  cursor-pointer"
                      onClick={() => {
                        setConversacion(paciente)
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
        {conversacion && loadMensajes && (
          <div className="flex flex-1 h-full mt-20 justify-center items-center">
            <AsisegLoader />
          </div>
        )}

        {(conversacion || rolUsuario === 'USUARIO') &&
          !loadMensajes &&
          mensajes && (
            <div className="flex w-full justify-center px-2">
              <div className="flex flex-col antialiased ">
                <div className="flex basis-[99%] items-start overflow-y-auto max-h-full mt-2 ">
                  <div className="flex flex-col">
                    {!convMovil && !desktop && rolUsuario !== 'USUARIO' && (
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          setConvMovil(true)
                          setMensajes()
                        }}
                        className="flex w-full h-20 mt-5 justify-center "
                      >
                        <AsisegButton text={'Ver otras conversacioness'} />
                      </button>
                    )}
                    {mensajes.length !== 0 ? (
                      mensajes.map((mensaje, indice) => {
                        const tipo =
                          mensaje.emisor === usuario ? 'end' : 'start'
                        return (
                          <React.Fragment key={indice}>
                            {tipo === 'end' && (
                              <ChatEnd
                                username={mensaje.emisor}
                                fechaMensaje={mensaje.fechaMensaje}
                                contenido={mensaje.mensaje}
                              />
                            )}
                            {tipo === 'start' && (
                              <ChatStart
                                username={mensaje.emisor}
                                fechaMensaje={mensaje.fechaMensaje}
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
                  </div>
                </div>
                {mensajes && mensajes.length !== 0 && (
                  <div className="flex basis-basis-[1%] mb-5 h-10 border-none rounded text-md flex-row">
                    <input
                      type="text"
                      disabled={!inputMensaje}
                      onChange={(e) => setNuevoMensaje(e.target.value)}
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
                )}
              </div>
            </div>
          )}
      </div>
    </div>
  )
}
