import { useState } from 'react'
import validarContraseña from 'src/Controllers/utils/validarContraseña'
export default function PasswordInput({ id, register, errors }) {
  const [password, setPassword] = useState('')
  const [errorPassword, setErrorPassword] = useState()
  const [errorMayus, setErrorMayus] = useState(false)
  const [errorNum, setErrorNum] = useState(false)
  const [errorSpecialChar, setErrorSpecialChar] = useState(false)
  const handlePassword = (e) => {
    const value = e.target.value
    setPassword(value)
    if (value.length === 0) {
      setErrorPassword(false)
    } else if (value.length >= 1) {
      setErrorMayus(true)
      setErrorNum(true)
      setErrorSpecialChar(true)
      setErrorPassword(true)
      if (value.length > 32) return
      const { validMayus, validNum, validSpecialChar } =
        validarContraseña(value)
      setErrorMayus(validMayus)
      setErrorNum(validNum)
      setErrorSpecialChar(validSpecialChar)
      if (!validMayus || !validNum || !validSpecialChar) {
        setErrorPassword(true)
      } else {
        setErrorPassword(false)
      }
    }
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
            Entrada inválida. Ingresa el menos 8 caracteres.
          </small>
        )}
      </span>
      <div className="flex w-full justify-start mt-1">
        {errorPassword && (
          <small className="text-red-400 text-xs">{errorPassword}</small>
        )}
        {errorPassword && (
          <ul className="text-red-400 text-sm list-disc">
            <li className={`${errorMayus ? 'text-green-500' : ''}`}>
              Al menos una mayúscula
            </li>
            <li className={`${errorNum ? 'text-green-500' : ''}`}>
              Al menos un número
            </li>
            <li className={`${errorSpecialChar ? 'text-green-500' : ''}`}>
              Al menos un carácter especial
            </li>
          </ul>
        )}
      </div>
    </div>
  )
}
