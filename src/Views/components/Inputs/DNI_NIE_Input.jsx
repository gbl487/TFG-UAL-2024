import { useState } from 'react'
import { checkDNI_NIE } from 'src/Controllers/utils/checkDNI-NIE'
import { setValidNIF } from 'src/Controllers/context/dni_nie_context'
export default function DNI_NIE({ register, errors }) {
  const [dni_nie, setDni_nie] = useState('')
  const [errorDNI, setErrorDNI] = useState(null)
  const handleDNI_NIE = (e) => {
    const value = e.target.value
    if (value.length > 9) return
    setDni_nie(value)
    const primerCaracter = value.charAt(0)
    if (
      primerCaracter !== '' &&
      primerCaracter !== 'X' &&
      primerCaracter !== 'Y' &&
      primerCaracter !== 'Z' &&
      isNaN(parseInt(primerCaracter))
    ) {
      setErrorDNI('El primer caracter debe ser X, Y, Z, o un número')
      setValidNIF({ value: false })
    } else {
      setErrorDNI(null)
      setValidNIF({ value: true })
      if (value.charAt(8) !== '_' && value.charAt(8) !== '') {
        const { valid } = checkDNI_NIE({ value })
        if (valid !== true) {
          setErrorDNI('El DNI/NIE introducido no es válido')
          setValidNIF({ value: false })
        } else {
          setErrorDNI(null)
          setValidNIF({ value: true })
        }
      }
    }
  }

  return (
    <div className="w-full">
      <span className="p-float-label">
        DNI/NIE
        <input
          id="dni_nie"
          type="text"
          {...register('dni_nie', { required: true, minLength: 9 })}
          className="asiseg_input h-8 ps-2 w-full rounded-md"
          value={dni_nie}
          onChange={(e) => {
            handleDNI_NIE(e)
          }}
          aria-invalid={errors.dni_nie ? 'true' : 'false'}
        />
        {errors.dni_nie?.type === 'required' && (
          <small className="text-red-400 text-xs" role="alert">
            Este campo es obligatorio
          </small>
        )}
        {errors.dni_nie?.type === 'minLength' && (
          <small className="text-red-400 text-xs" role="alert">
            Entrada inválida. Ingresa el menos 9 caracteres.
          </small>
        )}
      </span>
      <div className="flex w-full justify-start mt-1">
        {errorDNI && <small className="text-red-400 text-xs">{errorDNI}</small>}
      </div>
    </div>
  )
}
