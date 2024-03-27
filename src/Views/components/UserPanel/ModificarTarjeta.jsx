import FormularioTarjeta from '@components/FormularioTarjeta'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getTarjetaFromId } from 'src/Model/Tarjetas'

export default function ModificarTarjeta() {
  const [tarjeta, setTarjeta] = useState()
  const { id } = useParams()
  useEffect(() => {
    const obtenerTarjeta = async () => {
      try {
        const tarjeta = await getTarjetaFromId({ idTarjeta: id })
        return tarjeta
      } catch (error) {
        console.error('Error al obtener las tarjetas:', error)
      }
    }
    obtenerTarjeta().then((result) => {
      setTarjeta(result)
    })
  }, [id])
  return <>{tarjeta && <FormularioTarjeta id={id} />}</>
}
