import Logo from '@components/Logo.jsx'
import { useState } from 'react'
import { Dialog } from 'primereact/dialog'
import 'primereact/resources/themes/tailwind-light/theme.css'
import '../styles/register.css'
import { RegisterForm } from '@components/RegisterForm.jsx'
// import useMediaQuery from '@hooks/useMediaQuery'
export default function Header() {
  const [visible, setVisible] = useState(false)

  // const isDesktop = useMediaQuery('1280')

  return (
    <>
      <div className="flex flex-row w-full">
        <Logo />
        <div className="flex justify-end w-full sm:mx-5 sm:items-start min-w-sm ">
          <div className="flex flex-col-reverse gap-1 justify-center my-5 mx-2 sm:mx-5 sm:flex-row sm:items-start">
            <button
              id="registerButton"
              className="text-white bg-asiseg-gray opacity-65 hover:opacity-100 transition-opacity p-2 rounded-md mx-1 mt-1 sm:mt-0"
              onClick={(e) => {
                e.preventDefault()
                setVisible(true)
              }}
            >
              Registrarse
            </button>
            <button
              id="loginButton"
              className="text-white bg-asiseg-blue opacity-65 hover:opacity-100 transition-opacity p-2 rounded-md mx-1"
            >
              Iniciar sesión
            </button>
          </div>
        </div>
      </div>
      <Dialog
        header="¡Bienvenid@!"
        visible={visible}
        onHide={() => {
          setVisible(!visible)
        }}
        style={{ width: '33vw' }}
        breakpoints={{ '1280px': '50vw', '768px': '90vw' }}
      >
        <RegisterForm />
      </Dialog>
    </>
  )
}
