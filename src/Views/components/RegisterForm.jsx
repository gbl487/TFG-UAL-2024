import { useStore } from '@nanostores/react'
import {
  registerState,
  setRegister,
} from 'src/Controllers/context/registerContext'
import { validNIF } from 'src/Controllers/context/dni_nie_context'
import { useForm } from 'react-hook-form'
import DNI_NIE from './Inputs/DNI_NIE_Input'
import RememberInput from './Inputs/RememberInput'
import { useState } from 'react'
import { setUserData } from 'src/Controllers/context/userData_context'
import { useAuth } from 'src/Controllers/context/userContext'

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const $registerState = useStore(registerState)
  const $validNIF = useStore(validNIF)
  const { crearUsuario, iniciarSesion } = useAuth()

  const [registrando, setRegistrando] = useState(false)
  // const [password, setPassword] = useState()
  // const [password2, setPassword2] = useState()
  const onSubmit = async (data) => {
    if (!$validNIF) return
    setRegistrando(true)
    setUserData({ value: data })

    if ($registerState) {
      await crearUsuario(data.dni_nie + '@asiseg.com', data.password)
    } else {
      await iniciarSesion(data.dni_nie + '@asiseg.com', data.password)
    }
  }

  return (
    <>
      <div className="flex flex-1 justify-center w-full">
        {registrando ? (
          // <ConfirmarOtp />
          <div></div>
        ) : (
          <div className="space-y-4 md:space-y-6 sm:p-8 w-full">
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl mb-5">
              {$registerState
                ? 'Introduzca sus datos'
                : 'Inicia sesión en su cuenta'}
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} action="#">
              <DNI_NIE register={register} errors={errors} />
              {/* Contraseña */}
              <div className="w-full">
                <span className="p-float-label">
                  Contraseña
                  <input
                    id="password"
                    type="password"
                    {...register('password', { required: true, minLength: 8 })}
                    className="asiseg_input h-8 ps-2 w-full rounded-md"
                    aria-invalid={errors.dni_nie ? 'true' : 'false'}
                  />
                </span>
              </div>
              {/* <PhoneInput register={register} errors={errors} />{' '} */}
              {/* Validar contrasña */}
              {$registerState ? (
                <div className="w-full">
                  {/* <span className="p-float-label">
                    Validar contraseña
                    <input
                      id="dni_nie"
                      type="text"
                      className="asiseg_input h-8 ps-2 w-full rounded-md"
                      value={password2}
                      onChange={(e) => {
                        setPassword2(e.target.value)
                      }}
                      aria-invalid={errors.dni_nie ? 'true' : 'false'}
                    />
                  </span> */}
                </div>
              ) : (
                ''
              )}
              <RememberInput register={register} />
              <div className="flex flex-1 justify-center">
                <input
                  type="submit"
                  id="registerState"
                  value={$registerState ? 'Registrarse' : 'Iniciar sesión'}
                  className=" text-white bg-asiseg-blue opacity-65 hover:opacity-100 transition-opacity p-2 rounded-md mb-4 cursor-pointer  "
                />
              </div>
              <div className="flex flex-row w-full justify-start items-center">
                <p className="text-sm font-light text-gray-500">
                  {$registerState
                    ? '¿Ya tienes una cuenta?'
                    : '¿No tienes aún una cuenta?'}
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:underline hover:text-asiseg-blue mx-1"
                    onClick={(e) => setRegister(e)}
                  >
                    {$registerState ? 'Inicia sesión' : 'Regístrese'}
                  </a>
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  )
}
