import { useState } from 'react'
export default function PasswordInput({ id, register, errors }) {
  const [password, setPassword] = useState('')
  const [errorPassword, setErrorPassword] = useState(null)
  const handlePassword = (e) => {
    const value = e.target.value
    if (value.length > 9) return
    setPassword(value)
    setErrorPassword(false)
  }
  return (
    <div className="w-full">
      <span className="p-float-label">
        Contraseña
        <input
          id={id}
          type="password"
          {...register('password', { required: true, minLength: 8 })}
          className={`asiseg_input h-8 ps-2 w-full rounded-md ${
            errors ? 'shadow-red-800' : ''
          }`}
          value={password}
          onChange={(e) => {
            handlePassword(e)
          }}
          aria-invalid={errors.dni_nie ? 'true' : 'false'}
        />
        {errors.password?.type === 'required' && (
          <small className="text-red-400 text-xs" role="alert">
            Este campo es obligatorio
          </small>
        )}
        {errors.password?.type === 'minLength' && (
          <small className="text-red-400 text-xs" role="alert">
            Entrada inválida. Ingresa el menos 9 caracteres.
          </small>
        )}
      </span>
      <div className="flex w-full justify-start mt-1">
        {errorPassword && (
          <small className="text-red-400 text-xs">{errorPassword}</small>
        )}
      </div>
    </div>
  )
}
