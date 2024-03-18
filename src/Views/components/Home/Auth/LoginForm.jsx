import DNI_NIE from '@components/Inputs/DNI_NIE_Input'
import PasswordInput from '@components/Inputs/PasswordInput'
import RememberInput from '@components/Inputs/RememberInput'
import { useStore } from '@nanostores/react'
import { useForm } from 'react-hook-form'
import { validNIF } from 'src/Controllers/context/dni_nie_context'
import { setModal } from 'src/Controllers/context/modal_context'
import { useAuth } from 'src/Controllers/context/userContext'
import { setUserData } from 'src/Controllers/context/userData_context'

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { iniciarSesion } = useAuth()
  const $validNIF = useStore(validNIF)
  const onSubmit = async (data) => {
    if (!$validNIF) return

    setUserData({ value: data })
    await iniciarSesion(data.dni_nie + '@asiseg.com', data.password)
    setModal({ value: false })
  }

  return (
    <div className="flex flex-1 justify-center w-full">
      <div className="space-y-4 md:space-y-6 sm:px-8 w-full">
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl mb-5">
          Inicia sesión en su cuenta
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} action="#">
          <DNI_NIE id={'login_nif'} register={register} errors={errors} />
          {/* Contraseña */}
          <PasswordInput register={register} errors={errors} />
          <RememberInput register={register} />
          <div className="flex justify-center">
            <input
              type="submit"
              id="loginInput"
              value={'Iniciar sesión'}
              className=" text-white bg-asiseg-blue opacity-65 hover:opacity-100 transition-opacity p-2 rounded-md mb-4 cursor-pointer  "
            />
          </div>
        </form>
      </div>
    </div>
  )
}
