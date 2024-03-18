import RegisterForm from '../Auth/RegisterForm'
import LoginForm from '../Auth/LoginForm'
import { useState } from 'react'

export default function AuthForm() {
  const [registrando, setRegistrando] = useState(false)

  const handleClick = async (e) => {
    e.preventDefault()
    setRegistrando(!registrando)
  }
  return (
    <>
      {registrando ? <RegisterForm /> : <LoginForm />}

      <div className="flex flex-row w-full justify-start items-center pb-2">
        <p className="text-sm font-light text-gray-500">
          {registrando
            ? '¿Ya tienes una cuenta?'
            : '¿No tienes aún una cuenta?'}
          <a
            href="#"
            className="font-medium text-primary-600 hover:underline hover:text-asiseg-blue mx-1"
            onClick={(e) => handleClick(e)}
          >
            {registrando ? 'Inicia sesión' : 'Regístrese'}
          </a>
        </p>
      </div>
    </>
  )
}
