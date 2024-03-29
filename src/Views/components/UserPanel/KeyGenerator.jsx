import { AsisegButton } from '@components/Buttons/AddContentButton'
import AsisegLoader from '@components/Buttons/AsisegLoader'
import Toast from '@components/core/Toast'
import { DeleteKeyICon } from '@icons/Icons'
import { deleteDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { setToast } from 'src/Controllers/context/toast_context'
import { crearClave, getAllClaves, getClaveDoc } from 'src/Model/Claves'

export default function KeyGenerator() {
  const [claves, setClaves] = useState([])
  const [indiceClave, setIndiceClave] = useState()
  const [clave, setClave] = useState()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getAllClaves().then((result) => {
      setClaves(result)
      setLoading(false)
    })
  }, [])

  const handleClick = async () => {
    const { result, nuevaClave } = await crearClave()
    if (result === 'OK') {
      setToast({ value: true, text: 'Clave creada con éxito' })
      const clave = {
        clave: nuevaClave.clave,
        creador: nuevaClave.nombre_creador,
        fechaCreacion: nuevaClave.fechaCreacionString,
      }
      setClaves([...claves, clave])
    }
  }

  const showModal = (e, clave, index) => {
    e.preventDefault()

    setClave(clave)
    setIndiceClave(index)
    document.getElementById('my_modal').showModal()
  }

  const deleteClave = async (e) => {
    e.preventDefault()
    if (clave) {
      const { documentoRef } = await getClaveDoc({ value: clave })
      await deleteDoc(documentoRef)
      setToast({ value: true, text: 'Clave eliminada correctamente' })
      const nuevasClaves = claves.filter((_, i) => i !== indiceClave)
      setClaves(nuevasClaves)
      setIndiceClave()
      document.getElementById('my_modal').close()
    }
  }
  return (
    <div className="p-5 md:p-10 md:ml-64 w-auto flex flex-col justify-center">
      {loading ? (
        <div className="flex w-full flex-col h-screen justify-center content-center">
          <AsisegLoader showLogo={true} />
        </div>
      ) : (
        <div className="flex flex-col overflow-x-auto">
          <div className="flex justify-center" onClick={handleClick}>
            <AsisegButton text={'Generar clave aleatoria'} />
          </div>

          {claves.length !== 0 ? (
            <table className="table table-xs lg:table-lg">
              <thead>
                <tr className="text-black ">
                  <th></th>
                  <th>Clave</th>
                  <th>Creada por</th>
                  <th>Creada el</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {claves.map((clave, index) => {
                  return (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{clave.clave}</td>
                      <td>{clave.creador}</td>
                      <td>{clave.fechaCreacion}</td>
                      <td className="flex justify-center">
                        <button
                          onClick={(e) => showModal(e, clave.clave, index)}
                        >
                          <DeleteKeyICon />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          ) : (
            <div className="flex justify-center mt-10 p-5 border-2 rounded-lg">
              No hay resultados
            </div>
          )}

          <dialog id="my_modal" className="modal">
            <div className="modal-box bg-white">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-lg text-orange-500">
                ¡Advertencia!
              </h3>
              <p className="py-5">
                Está a punto de eliminar una clave, ¿está seguro?
              </p>
              <form method="dialog" className="flex justify-end gap-x-2">
                <button
                  onClick={(e) => deleteClave(e)}
                  className="btn btn-success text-white p-2 rounded-md"
                >
                  Aceptar
                </button>
                <button className="btn btn-error text-white p-2 rounded-md">
                  Cancelar
                </button>
              </form>
            </div>
          </dialog>
          <Toast />
        </div>
      )}
    </div>
  )
}
