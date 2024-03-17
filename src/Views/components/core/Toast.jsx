import { useStore } from '@nanostores/react'
import { useEffect } from 'react'
import { setToast, toast } from 'src/Controllers/context/toast_context'

export default function Toast({ text }) {
  const $toast = useStore(toast)
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast({ value: false }) // Ocultar el Toast después de 2 segundos
    }, 1000)
    timer
    return () => clearTimeout(timer) // Limpiar el temporizador al desmontar el componente
  }) // Se ejecuta solo una vez al montar el componente

  return (
    <>
      {$toast && (
        <div className="toast">
          <div className="alert alert-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-circle-check"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#ffffff"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
              <path d="M9 12l2 2l4 -4" />
            </svg>
            <span className="text-white">{text}</span>
          </div>
        </div>
      )}
    </>
  )
}
