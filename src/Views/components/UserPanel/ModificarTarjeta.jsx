import { useEffect, useState } from 'react'
import { getTarjetaFromId } from 'src/Model/Tarjetas'

export default function ModificarTarjeta({ uid }) {
  const [tarjeta, setTarjeta] = useState()
  useEffect(() => {
    const obtenerTarjeta = async () => {
      try {
        const tarjeta = await getTarjetaFromId({ uid })
        return tarjeta
      } catch (error) {
        console.error('Error al obtener las tarjetas:', error)
      }
    }
    obtenerTarjeta().then((result) => {
      setTarjeta(result)
    })
  }, [uid])
  console.log(tarjeta)
  return <div className="p-4 sm:ml-64 w-auto h-full">{uid}</div>
}
