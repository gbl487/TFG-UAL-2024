import AsisegLoader from '@components/Buttons/AsisegLoader'
import ClaveInput from '@components/Inputs/ClaveInput'
import Toast from '@components/core/Toast'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { setClaveRegisto } from 'src/Controllers/context/claveContext'
import { setToast } from 'src/Controllers/context/toast_context'
import { checkClave } from 'src/Controllers/utils/checkClave'

export default function ValidarClave() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [errorClave, setErrorClave] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toastText, setToasText] = useState()
  const onSubmit = async (data) => {
    setLoading(true)
    const claveExiste = await checkClave({ value: data.clave })
    if (claveExiste) {
      setErrorClave(false)
      setClaveRegisto({ value: true })
      setToasText('Clave válida')
      setToast({ value: true })
    } else {
      setErrorClave(true)
    }
    setLoading(false)
  }
  return (
    <div className="space-y-4 md:space-y-6 sm:px-4 w-full">
      <h1 className="text-base font-bold leading-tight tracking-tight text-gray-900 md:text-lg mb-5">
        Por favor, introduzca la clave proporcionada para proceder al registro
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} action="#">
        <div className="px-4">
          <ClaveInput
            id={'claveRegistro'}
            register={register}
            errors={errors}
            errorClave={errorClave}
          />
        </div>

        <div className="flex justify-center">
          {loading && <AsisegLoader showLogo={false} />}
          {!loading && (
            <input
              type="submit"
              id="validar_clave"
              value={'Validar clave'}
              className=" text-white bg-asiseg-blue opacity-65 hover:opacity-100 transition-opacity p-2 rounded-md mb-4 cursor-pointer mt-5 "
            />
          )}
        </div>
      </form>
      <Toast text={toastText} />
    </div>
  )
}
