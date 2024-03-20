import { useStore } from '@nanostores/react'
import { claveRegistro } from 'src/Controllers/context/claveContext'
import { validNIF } from 'src/Controllers/context/dni_nie_context'
import { useForm } from 'react-hook-form'
import DNI_NIE from '../../Inputs/DNI_NIE_Input'
import RememberInput from '../../Inputs/RememberInput'
import { useAuth } from 'src/Controllers/context/userContext'
import ValidarClave from './ValidarClave'
import { setModal } from 'src/Controllers/context/modal_context'
import ValidatePasswordInput from '@components/Inputs/ValidatePasswordInput'
import { correctPassword } from 'src/Controllers/context/passwordContext'

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const $validNIF = useStore(validNIF)
  const $correctPassword = useStore(correctPassword)
  const { crearUsuario } = useAuth()
  const $claveRegistro = useStore(claveRegistro)

  const onSubmit = async (data) => {
    if (!$validNIF) return
    if (!$correctPassword) return
    await crearUsuario(
      data.dni_nie + '@asiseg.com',
      data.password,
      data.remember
    )
    setModal({ value: false })
  }

  return (
    <>
      <div className="flex flex-1 justify-center w-full">
        {!$claveRegistro ? (
          <ValidarClave />
        ) : (
          <div className="space-y-4 md:space-y-6 sm:px-8 w-full">
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl mb-5">
              Introduzca sus datos
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} action="#">
              <DNI_NIE
                id={'register_nif'}
                register={register}
                errors={errors}
              />
              {/* Contraseña */}
              <ValidatePasswordInput register={register} errors={errors} />

              <RememberInput register={register} />
              <div className="flex justify-center">
                <input
                  type="submit"
                  id="registerInput"
                  value={'Registrarse'}
                  className=" text-white bg-asiseg-blue opacity-65 hover:opacity-100 transition-opacity p-2 rounded-md mb-4 cursor-pointer  "
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  )
}
