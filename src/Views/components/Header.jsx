// import Logo from '@components/Logo.jsx'
import { useState } from 'react'
import { Dialog } from 'primereact/dialog'
import 'primereact/resources/themes/tailwind-light/theme.css'
import '../styles/register.css'
import RegisterForm from './RegisterForm'
import SearchInput from './SearchInput'
import { useStore } from '@nanostores/react'
import { registerState } from 'src/Controllers/context/registerContext'
// import RegisterForm from '@components/RegisterForm.jsx'
// import useMediaQuery from '@hooks/useMediaQuery'
export default function Header() {
  const $registerState = useStore(registerState)
  const [visible, setVisible] = useState(false)
  // const [menuVisible, setMenuVisible] = useState(false)

  // const toggleMenu = () => {
  //   setMenuVisible(!menuVisible)
  // }
  // const isDesktop = useMediaQuery('1280')

  return (
    <>
      <nav className=" bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="/favicon_asiseg.svg"
              className="h-14 ml-5 my-2"
              alt="Asiseg Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-asiseg-blue">
              ASISEG
            </span>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="text-white bg-asiseg-blue hover:bg-asiseg-blue/70 focus:ring-4 focus:outline-none focus:asiseg-blue font-medium rounded-lg text-sm px-4 py-2 text-center mr-5"
              onClick={() => {
                setVisible(!visible)
              }}
            >
              Iniciar sesión
            </button>
            {/* <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-sticky"
              aria-expanded={menuVisible}
            >
              <span className="sr-only">
                {menuVisible ? 'Close main menu' : 'Open main menu'}
              </span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                ></path>
              </svg>
            </button> */}
          </div>
          {/* <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 `}
            // ${
            //   menuVisible ? 'block' : 'hidden'
            // }
          > */}
          <ul className="hidden md:flex md:flex-col p-4 md:p-0  font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse  ">
            <li>
              <SearchInput />
            </li>
          </ul>
          {/* </div> */}
        </div>
      </nav>
      <Dialog
        header={$registerState ? '¡Bienvenid@!' : '¡Bienvenid@ de nuevo!'}
        visible={visible}
        onHide={() => {
          setVisible(!visible)
        }}
        style={{ width: '450px', minWidth: '300px' }}
        breakpoints={{ '640px': '350px' }}
      >
        <RegisterForm />
      </Dialog>
    </>
  )
}
