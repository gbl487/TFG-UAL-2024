import { setModal } from 'src/Controllers/context/modal_context'
import { useEffect, useState, useRef } from 'react'
import {
  renderRecaptcha,
  sendVerificationCode,
} from 'src/Controllers/utils/reCaptcha'
import { auth } from '../../Model/Firebase'
import { userData } from 'src/Controllers/context/userData_context'
import { useStore } from '@nanostores/react'
import { registrarUsuario } from 'src/Model/Usuario'
export default function ConfirmarOtp() {
  const [otp, setOtp] = useState('')
  const [user, setUser] = useState(null)
  const [ingresarOtp, setIngresarOtp] = useState(false)
  const [captcha, setCaptcha] = useState(false)
  const recaptchaContainerRef = useRef()
  const $userData = useStore(userData)

  useEffect(() => {
    setCaptcha(true)
    async function renderCaptcha() {
      let appVerifier
      if (typeof recaptchaContainerRef.current === 'undefined') return
      try {
        appVerifier = await renderRecaptcha({
          auth,
          containerOrId: recaptchaContainerRef.current,
          onVerificationCompleted,
        })
        // Cuando se ha mostrado el captcha, mostramos el boton para ingresar codigo otp
      } catch (error) {
        console.log(error)
      }
      try {
        if (typeof appVerifier === 'undefined') return
        const { confirmation } = await sendVerificationCode({
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
  }, [captcha, $userData.telefono])
  const verifyOtp = async (e) => {
    e.preventDefault()
    console.log(user)
    console.log(otp)
    console.log($userData.dni_nie)
    await registrarUsuario({
      confirmation: user,
      otp,
      dni_nie: $userData.dni_nie,
    })
      .then((resultado) => {
        console.log(resultado)
        console.log(auth)
      })
      .catch((error) => console.log(error))

    setModal({ value: false })
  }

  const onVerificationCompleted = (response) => {
    // Lógica adicional después de completar la verificación
    setIngresarOtp(true)
    console.log('Verificación completada:', response)
  }

  return (
    <div className="flex flex-col w-full h-52 justify-center">
      {captcha && (
        <>
          {ingresarOtp ? (
            <div className="flex flex-col gap-y-5">
              <div>Se ha enviado un sms al telefono {$userData.telefono}</div>
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
                id="recaptcha-container"
                ref={recaptchaContainerRef}
                className="flex justify-center"
              ></div>
            </>
          )}
        </>
      )}
    </div>
  )
}
