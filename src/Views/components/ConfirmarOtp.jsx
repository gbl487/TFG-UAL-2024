import { Usuario } from 'src/Model/Usuario'
import { setModal } from 'src/Controllers/context/modal_context'
import { useEffect, useState, useRef } from 'react'
import {
  renderRecaptcha,
  sendVerificationCode,
} from 'src/Controllers/utils/reCaptcha'
import firebaseApp from 'src/Model/Firebase'
import { getAuth } from 'firebase/auth'
import { userData } from 'src/Controllers/context/userData_context'
import { useStore } from '@nanostores/react'

export default function ConfirmarOtp() {
  const usuarioClase = new Usuario()
  const [otp, setOtp] = useState('')
  const [user, setUser] = useState(null)
  const [ingresarOtp, setIngresarOtp] = useState(false)
  const [captcha, setCaptcha] = useState(false)
  const recaptchaContainerRef = useRef('recaptcha-container')
  const auth = getAuth(firebaseApp)
  const $userData = useStore(userData)

  const onVerificationCompleted = (response) => {
    // Lógica adicional después de completar la verificación
    setTimeout(1000)
    setIngresarOtp(true)
    console.log('Verificación completada:', response)
  }

  useEffect(() => {
    setCaptcha(true)

    async function renderCaptcha() {
      let appVerifier
      try {
        appVerifier = await renderRecaptcha({
          auth,
          containerOrId: recaptchaContainerRef.current,
          onVerificationCompleted,
        })
        // Cuando se ha mostrado el captcha, mostramos el boton para ingresar codigo otp

        const { confirmation } = await sendVerificationCode({
          auth,
          telefono: $userData.telefono,
          appVerifier,
        })

        setUser(confirmation)
      } catch (error) {
        console.log(error)
      }
    }
    renderCaptcha()

    // Clean-up function (optional)
    return () => {
      setCaptcha(false)
      // Perform any clean-up here if necessary
    }
  }, [captcha, auth, $userData.telefono])
  const verifyOtp = async (e) => {
    e.preventDefault()
    const { usuario, errorResult } = usuarioClase.confirmOtp({
      confirmation: user,
      otp,
    })
    console.log(usuario)
    console.log(errorResult)
    setModal({ value: false })
  }

  return (
    <div className="flex flex-col w-full h-52 justify-center">
      {captcha && (
        <>
          {ingresarOtp ? (
            <div className="flex flex-col gap-y-5">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button onClick={(e) => verifyOtp(e)}>Aceptar</button>
            </div>
          ) : (
            <>
              <p className="mb-5">
                Por favor, complete la verificación reCAPTCHA antes de
                continuar:
              </p>
              <div
                className="flex justify-center"
                id="recaptcha-container"
                ref={recaptchaContainerRef}
              ></div>
            </>
          )}
        </>
      )}
    </div>
  )
}
