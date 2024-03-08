import { useStore } from '@nanostores/react'
import { useEffect } from 'react'
import { setToast, toast } from 'src/Controllers/context/toast_context'

export default function Toast({ text }) {
  const $toast = useStore(toast)
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast({ value: false }) // Ocultar el Toast después de 2 segundos
    }, 1000)
    return () => clearTimeout(timer) // Limpiar el temporizador al desmontar el componente
  }, []) // Se ejecuta solo una vez al montar el componente
  return (
    <>
      {$toast && (
        <div className="toast">
          <div className="alert alert-success">
            <span>{text}</span>
          </div>
        </div>
      )}
    </>
  )
}
