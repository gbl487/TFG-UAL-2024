import { useEffect, useState } from 'react'
import InfoCard from '../InfoCard'
import AsisegLoader from '../Buttons/AsisegLoader'
import { useFilters } from '@hooks/useFilters'
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
import { SeeMoreIcon } from '@icons/Icons'
import { obtenerTarjetas } from 'src/Model/Tarjetas'
export default function ALlTarjetas() {
  const [docs, setDocs] = useState([])
  const [loading, setLoading] = useState(true)
  const { getTarjetasFiltradas } = useFilters()
  useEffect(() => {
    obtenerTarjetas().then((result) => {
      setDocs(result)
      setLoading(false)
    })
  }, [])

  const tarjetas = getTarjetasFiltradas(docs)
  const Footer = () => {
    return (
      <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-asiseg-blue rounded-lg opacity-65 hover:opacity-100 transition-opacity ">
        Ver más
        <SeeMoreIcon />
      </div>
    )
  }
  return (
    <>
      {!loading && tarjetas.length !== 0 && (
        <section className="grid grid-cols-1 md:grid-cols-2 lg+:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-5">
          {tarjetas.map((tarjeta, index) => {
            var converter = new QuillDeltaToHtmlConverter(tarjeta.contenido, {})
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
                Footer={Footer}
              />
            )
          })}
        </section>
      )}
      {!loading && tarjetas.length === 0 && (
        <div className="h-screen">
          <div className="flex justify-center mt-10 p-5 border-2 rounded-lg">
            No hay resultados
          </div>
        </div>
      )}
      {loading && (
        <div className="flex w-full flex-col h-screen justify-center content-center">
          <AsisegLoader showLogo={true} />
        </div>
      )}
    </>
  )
}
