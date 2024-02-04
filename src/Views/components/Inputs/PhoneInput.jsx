import { useState } from 'react'
import { InputMask } from 'primereact/inputmask'
export default function PhoneInput({ register, errors }) {
  const [phone, setPhone] = useState('')
  return (
    <div className="w-full mt-5">
      <span className="">
        Número de teléfono
        <InputMask
          id="telefono"
          mask="+99 999 999 999"
          {...register('telefono', { required: true, minLength: 15 })}
          slotChar=""
          autoClear={false}
          className="h-8 ps-2 w-full"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {errors.telefono?.type === 'required' && (
          <small className="text-red-400 text-xs" role="alert">
            Este campo es obligatorio
          </small>
        )}
        {errors.telefono?.type === 'minLength' && (
          <small className="text-red-400 text-xs" role="alert">
            Entrada inválida. No se ha completado el número de teléfono.
          </small>
        )}
      </span>
    </div>
  )
}
