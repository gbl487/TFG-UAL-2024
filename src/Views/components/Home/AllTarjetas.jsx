import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import firebaseApp from 'src/Model/Firebase'
import InfoCard from '../InfoCard'
import AsisegLoader from '../Buttons/AsisegLoader'
import { useFilters } from '@hooks/useFilters'
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
export default function ALlTarjetas() {
  const db = getFirestore(firebaseApp)
  const [docs, setDocs] = useState([])
  const [loading, setLoading] = useState(true)
  const { getTarjetasFiltradas } = useFilters()
  useEffect(() => {
    const obtenerTarjetas = async () => {
      try {
        // Obtén una referencia a la colección 'Tarjetas'
        const tarjetasRef = collection(db, 'Tarjetas')

        // Obtiene todos los documentos de la colección 'Tarjetas'
        const querySnapshot = await getDocs(tarjetasRef)

        return querySnapshot.docs
      } catch (error) {
        console.error('Error al obtener las tarjetas:', error)
      }
    }
    obtenerTarjetas().then((result) => {
      setDocs(result)
      setLoading(false)
    })
  }, [db])

  const tarjetas = getTarjetasFiltradas(docs)

  return (
    <>
      {!loading && tarjetas.length !== 0 && (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg+:grid-cols-3 xl:grid-cols-4 gap-5">
          {tarjetas.map((tarjeta) => {
            const data = tarjeta.data()
            var cfg = {}
            var converter = new QuillDeltaToHtmlConverter(data.contenido, cfg)
            var contenido = converter.convert()
            const desc = contenido.replace(/<[^>]+>/g, '')
            return (
              <InfoCard
                key={tarjeta.id}
                titulo={data.titulo}
                imagen={data.imagen}
                descripcion={desc}
                tags={data.categorias}
                contenido={contenido}
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
