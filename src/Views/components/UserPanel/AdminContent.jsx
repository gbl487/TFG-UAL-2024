import { DeleteCardIcon, ModidyCardIcon, SeeCardIcon } from '@icons/Icons'
import { AddContentButton } from '../Buttons/AddContentButton'
import Card from '../core/Card'
import { useAuth } from 'src/Controllers/context/userContext'
import { useEffect, useState } from 'react'
import { db } from 'src/Model/Firebase'
import { collection, getDocs } from 'firebase/firestore'
import { deltaToHtml } from 'src/Controllers/utils/delta'
import AsisegLoader from '../Buttons/AsisegLoader'
import { Link } from 'react-router-dom'

export default function AdminContent() {
  const { usuario } = useAuth()

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
  }, [])

  const Footer = (id) => {
    const modHref = `/contenido/modificar/${id.id}`
    return (
      <div className="flex w-full bg-slate justify-end gap-2 ">
        <Link href="/contenido/visualizar">
          <button className="btn btn-success opacity-65">
            <SeeCardIcon />
          </button>
        </Link>
        <Link to={modHref}>
          <button className="btn btn-primary ">
            <ModidyCardIcon />
          </button>
        </Link>
        <button className="btn btn-error ">
          <DeleteCardIcon />
        </button>
      </div>
    )
  }

  return (
    <>
      {usuario ? (
        <div className="p-4 md:ml-64 w-auto h-full flex flex-col">
          <div className="flex justify-center my-5">
            <Link to="/contenido/crear">
              <AddContentButton />
            </Link>
          </div>
          {!loading && docs.length !== 0 && (
            <div className="w-full flex justify-center">
              <section className="grid grid-cols-1 lg+:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5 gap-5">
                {docs.map((tarjeta) => {
                  const data = tarjeta.data()
                  const html = deltaToHtml(data.contenido)
                  const desc = html.replace(/<[^>]+>/g, '')
                  return (
                    <Card
                      key={tarjeta.id}
                      titulo={data.titulo}
                      imagen={data.imagen}
                      descripcion={desc}
                      tags={data.categorias}
                      contenido={html}
                      Footer={() => <Footer id={tarjeta.id} />}
                    />
                  )
                })}
              </section>
            </div>
          )}
          {!loading && docs.length === 0 && (
            <div className="h-screen w-full flex justify-center items-center">
              <p className="text-3xl">No hay resultados</p>
            </div>
          )}
          {loading && (
            <div className="flex w-full flex-col h-screen justify-center content-center">
              <AsisegLoader showLogo={true} />
            </div>
          )}
        </div>
      ) : (
        ''
      )}

      {/* {usuario && (
        <>
          <div className="p-4 md:ml-64 w-auto h-full flex flex-col">
            <div className="flex justify-center my-5">
              <a href="/administrarcontenido/crear">
                <AddContentButton />
              </a>
            </div>

            <div className="w-full flex justify-center">
              <section className="grid grid-cols-1 lg+:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5 gap-5">
                {docs.map((tarjeta) => {
                  const data = tarjeta.data()
                  const html = deltaToHtml(data.contenido)
                  const desc = html.replace(/<[^>]+>/g, '')
                  return (
                    <Card
                      key={tarjeta.id}
                      titulo={data.titulo}
                      portada={data.imagen}
                      descripcion={desc}
                      tags={data.categorias}
                      contenido={html}
                      Footer={() => <Footer id={tarjeta.id} />}
                    />
                  )
                })}
              </section>
            </div>
          </div>
        </>
      )} */}
    </>
  )
}
