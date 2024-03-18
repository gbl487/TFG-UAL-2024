import { useState } from 'react'
export default function ClaveInput({ id, register, errors, errorClave }) {
  const [clave, setClave] = useState('')
  const handleClave = (e) => {
    const value = e.target.value
    if (value.length > 16) return
    setClave(value)
  }
  return (
    <div className="w-full">
      <span className="p-float-label">
        <p className="mb-1"> Clave de registro</p>
        <input
          id={id}
          type="text"
          {...register('clave', { required: true, minLength: 16 })}
          className="asiseg_input h-8 ps-2 w-full rounded-md border-black"
          value={clave}
          onChange={(e) => {
            handleClave(e)
          }}
          aria-invalid={errors.dni_nie ? 'true' : 'false'}
        />
        {errors.clave?.type === 'required' && (
          <small className="text-red-400 text-xs" role="alert">
            Este campo es obligatorio
          </small>
        )}
        {errors.clave?.type === 'minLength' && (
          <small className="text-red-400 text-xs" role="alert">
            Entrada inválida. Ingresa el menos 16 caracteres.
          </small>
        )}
      </span>
      <div className="flex w-full justify-start mt-1">
        {errorClave && (
          <small className="text-red-400 text-xs">Clave inválida</small>
        )}
      </div>
    </div>
  )
}
