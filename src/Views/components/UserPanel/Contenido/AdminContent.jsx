import { DeleteCardIcon, ModidyCardIcon } from '@icons/Icons'
import { AsisegButton } from '../../Buttons/AddContentButton'
import { useEffect, useState } from 'react'
import AsisegLoader from '../../Buttons/AsisegLoader'
import { Link } from 'react-router-dom'
import InfoCard from '@components/InfoCard'
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
import Toast from '@components/core/Toast'
import { setToast } from 'src/Controllers/context/toast_context'
import { eliminarTarjeta, obtenerTarjetas } from 'src/Model/Tarjetas'
import PanelHeader from '../PanelHeader'

export default function AdminContent() {
  const [docs, setDocs] = useState([])
  const [loading, setLoading] = useState(true)
  const [idTarjeta, setIdTarjeta] = useState(null)
  useEffect(() => {
    obtenerTarjetas().then((result) => {
      setDocs(result)
      setLoading(false)
    })
  }, [])

  const Footer = ({ id, showCancelacion }) => {
    const modHref = `/contenido/modificar/${id}`
    return (
      <div className="flex w-full bg-slate justify-end gap-2 ">
        <Link to={modHref}>
          <div className="btn btn-primary ">
            <ModidyCardIcon />
          </div>
        </Link>
        <div
          className="btn btn-error"
          onClick={(e) => {
            e.stopPropagation()
            showCancelacion(id)
          }}
        >
          <DeleteCardIcon />
        </div>
      </div>
    )
  }

  const showModal = () => {
    document.getElementById('my_modal').showModal()
  }

  const showCancelacion = (id) => {
    setIdTarjeta(id)
    showModal()
  }

  const handleCancelacion = async () => {
    setLoading(true)
    const { result } = await eliminarTarjeta({ idTarjeta })
    document.getElementById('my_modal').close()
    setLoading(false)
    if (result === 'OK') {
      setToast({ value: true, text: 'Contenido eliminado correctamente' })
    }
  }

  return (
    <>
      <div className="h-screen flex flex-col">
        {/* Header */}
        <PanelHeader />
        <div className="flex justify-center mt-28">
          <Link to="/contenido/crear">
            <AsisegButton text={'Añadir contenido'} />
          </Link>
        </div>
        {!loading && docs.length !== 0 && (
          <div className="w-full flex justify-center mt-8">
            <section className="grid grid-cols-1 lg+:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5 gap-5">
              {docs.map((tarjeta, index) => {
                var converter = new QuillDeltaToHtmlConverter(
                  tarjeta.contenido,
                  {}
                )
                var contenido = converter.convert()
                const desc = contenido.replace(/<[^>]+>/g, '')
                return (
                  <InfoCard
                    key={index}
                    titulo={tarjeta.titulo}
                    imagen={tarjeta.imagen}
                    descripcion={desc}
                    tags={tarjeta.categorias}
                    contenido={contenido}
                    Footer={() => (
                      <Footer
                        id={tarjeta.idTarjeta}
                        showCancelacion={showCancelacion}
                      />
                    )}
                  />
                )
              })}
            </section>
          </div>
        )}
        {!loading && docs.length === 0 && (
          <div className="flex justify-center mt-10 p-5 border-2 rounded-lg">
            No hay resultados
          </div>
        )}
        {loading && (
          <div className="flex w-full flex-col h-screen justify-center content-center">
            <AsisegLoader showLogo={true} />
          </div>
        )}
        <Toast />
        <dialog id="my_modal" className="modal">
          <div className="modal-box bg-white">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg text-orange-500">¡Advertencia!</h3>
            <p className="py-5">
              Está a punto de eliminar este contenido, ¿está seguro?
            </p>
            <form method="dialog" className="flex justify-end gap-x-2">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  handleCancelacion()
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
    </>
  )
}
