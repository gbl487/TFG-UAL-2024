import { InputMask } from 'primereact/inputmask'
import { checkDNI_NIE } from 'src/Controllers/utils/checkDNI-NIE'
import { useState } from 'react'
import { useStore } from '@nanostores/react'
import {
  registerState,
  setRegister,
} from 'src/Controllers/context/registerContext'
// import firebaseApp from 'src/Model/Firebase'
import 'firebase/firestore'
import 'firebase/auth'
// import { getFirestore, doc, collection, setDoc } from 'firebase/firestore'
import { useForm } from 'react-hook-form'

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm()
  const $registerState = useStore(registerState)
  // const firestore = getFirestore(firebaseApp)
  // const auth = firebaseApp.getAuth()

  const [dni_nie, setDni_nie] = useState('')
  const [phone, setPhone] = useState('')
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
    } else {
      setErrorDNI(null)
      if (value.charAt(8) !== '_' && value.charAt(8) !== '') {
        const { valid } = checkDNI_NIE({ value })
        if (valid !== true) {
          setErrorDNI('El DNI/NIE introducido no es válido')
        } else {
          setErrorDNI(null)
        }
      }
    }
  }

  const onSubmit = (data) => console.log(data)
  return (
    <>
      <div className="flex flex-1 justify-center w-full">
        <div className="space-y-4 md:space-y-6 sm:p-8 w-11/12">
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl mb-5">
            {$registerState
              ? 'Introduzca sus datos'
              : 'Inicia sesión en su cuenta'}
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="" action="#">
            <div className="w-full">
              <span className="p-float-label">
                DNI/NIE
                <input
                  id="dni_nie"
                  type="text"
                  {...register('dni_nie', { required: true })}
                  className="h-8 start-5 w-full"
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
              </span>
              <div className="flex w-full justify-start mt-1">
                {errorDNI && (
                  <small className="text-red-400 text-xs">{errorDNI}</small>
                )}
              </div>
            </div>
            <div className="w-full mt-5">
              <span className="">
                Número de teléfono
                <InputMask
                  id="telefono"
                  mask="(+99) 999 999 999"
                  {...register('telefono', { required: true })}
                  slotChar=""
                  autoClear={false}
                  className="h-8 start-5 w-full"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errors.telefono?.type === 'required' && (
                  <small className="text-red-400 text-xs" role="alert">
                    Este campo es obligatorio
                  </small>
                )}
                {/* <label htmlFor="phoneNumber">Número de teléfono</label> */}
              </span>
            </div>
            <div className="flex items-center justify-between mt-5">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    {...register('remember')}
                    aria-describedby="remember"
                    type="checkbox"
                    className="accent-asiseg-blue w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-asiseg-blue "
                    required=""
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="text-gray-500 ">
                    Recordarme
                  </label>
                </div>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-primary-600 hover:underline "
              ></a>
            </div>
            <div className="flex flex-1 justify-center mt-2">
              <input
                type="submit"
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
      </div>
    </>
  )
}
