import { useState } from 'react'
import { useForm } from 'react-hook-form'
import 'primereact/resources/themes/tailwind-light/theme.css'
export default function CrearCita() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [fecha, setFecha] = useState()

  const onSubmit = async (data) => {
    console.log(data)
    console.log(errors)
  }
  const handleFecha = (e) => {
    const value = e.target.value
    setFecha(value)
    console.log(value)
    console.log(value.length)
  }

  return (
    <div className="space-y-4 md:space-y-6  w-full">
      <h1 className="text-lg font-bold leading-tight tracking-tight text-gray-900 md:text-xl mb-5">
        Introduzca los siguientes datos para dar de alta la cita
      </h1>

      <div className="w-full">
        <span className="p-float-label">
          Fecha de la cita
          <input
            id="fecha"
            type="date"
            {...register('fecha', { required: true, minLength: 9 })}
            className={`asiseg_input h-8 ps-2 w-full rounded-md ${
              errors ? 'ring-red-600' : ''
            }`}
            value={fecha}
            onChange={(e) => {
              handleFecha(e)
            }}
            min="2024-01-01"
            max="9999-12-31"
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
      </div>
      <form onSubmit={handleSubmit(onSubmit)} action="#">
        <div className="flex justify-center">
          <input
            type="submit"
            id="registerInput"
            value={'Crear'}
            className=" text-white bg-asiseg-blue opacity-65 hover:opacity-100 transition-opacity p-2 rounded-md mb-4 cursor-pointer"
          />
        </div>
      </form>
    </div>
  )
}
