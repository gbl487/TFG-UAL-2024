import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import firebaseApp from 'src/Model/Firebase'
import InfoCard from './InfoCard'
import AsisegLoader from './Buttons/AsisegLoader'
export default function ALlTarjetas() {
  const db = getFirestore(firebaseApp)
  const [docs, setDocs] = useState([])
  const [loading, setLoading] = useState(true)
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

  return (
    <>
      {loading ? (
        <div className="flex w-full flex-col h-screen justify-center content-center">
          <AsisegLoader showLogo={true} />
        </div>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg+:grid-cols-3 xl:grid-cols-4 gap-5">
          {docs.map((tarjeta) => {
            const data = tarjeta.data()
            return (
              <InfoCard
                key={tarjeta.id}
                titulo={data.titulo}
                portada={data.portada}
                descripcion={''}
                tags={data.categorias}
                contenido={''}
              />
            )
          })}
        </section>
      )}
    </>
  )
}
