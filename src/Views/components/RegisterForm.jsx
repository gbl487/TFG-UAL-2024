import { useStore } from '@nanostores/react'
import {
  registerState,
  setRegister,
} from 'src/Controllers/context/registerContext'
import { validNIF } from 'src/Controllers/context/dni_nie_context'
import firebaseApp from 'src/Model/Firebase'
import 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// import { getFirestore, doc, collection, setDoc } from 'firebase/firestore'
import { useForm } from 'react-hook-form'
import DNI_NIE from './Inputs/DNI_NIE_Input'
import PhoneInput from './Inputs/PhoneInput'
import RememberInput from './Inputs/RememberInput'
import { useRef, useState } from 'react'
// import { registrarUsuario } from 'src/Controllers/utils/registrarUsuario'
import {
  renderRecaptcha,
  sendVerificationCode,
} from 'src/Controllers/utils/reCaptcha'

export default function RegisterForm() {
  // const firestore = getFirestore(firebaseApp)
  const auth = getAuth(firebaseApp)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const $registerState = useStore(registerState)
  const $validNIF = useStore(validNIF)
  const [otp, setOtp] = useState('')
  const [user, setUser] = useState(null)
  const [usuario, setUsuario] = useState(null)
  const [registrando, setRegistrando] = useState(false)
  const recaptchaContainerRef = useRef('recaptcha-container')

  const onVerificationCompleted = (response) => {
    // Lógica adicional después de completar la verificación
    console.log('Verificación completada:', response)
  }

  const onSubmit = async (data) => {
    if (!$validNIF) return
    setRegistrando(true)
    let appVerifier
    let confirmation
    try {
      appVerifier = await renderRecaptcha({
        auth,
        containerOrId: recaptchaContainerRef.current,
        onVerificationCompleted,
      })

      confirmation = await sendVerificationCode({
        auth,
        telefono: data.telefono,
        appVerifier,
      })
      setUser(confirmation)
      console.log(confirmation)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="flex flex-1 justify-center w-full">
        <div id="recaptcha-container" ref={recaptchaContainerRef}></div>
        {registrando ? (
          <div className="w-full">
            <p>
              Por favor, complete la verificación reCAPTCHA antes de continuar:
            </p>
            <div>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                onClick={(e) => {
                  e.preventDefault()
                  user.confirm(otp).then((result) => {
                    const usuario = result.user
                    console.log(usuario)
                  })
                }}
              >
                Aceptar
              </button>
            </div>
            {/* <div id="recaptcha-container" ref={recaptchaContainerRef}></div> */}
          </div>
        ) : (
          <div className="space-y-4 md:space-y-6 sm:p-8 w-full">
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl mb-5">
              {$registerState
                ? 'Introduzca sus datos'
                : 'Inicia sesión en su cuenta'}
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="" action="#">
              <DNI_NIE register={register} errors={errors} />
              <PhoneInput register={register} errors={errors} />
              <RememberInput register={register} />

              <div className="flex flex-1 justify-center">
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
        )}
      </div>
    </>
  )
}
