// import Logo from '@components/Logo.jsx'
import { Dialog } from 'primereact/dialog'
import 'primereact/resources/themes/tailwind-light/theme.css'
import '../styles/register.css'
import RegisterForm from './RegisterForm'
import { useStore } from '@nanostores/react'
import { registerState } from 'src/Controllers/context/registerContext'
import { modal, setModal } from 'src/Controllers/context/modal_context'
import { useAuth } from 'src/Controllers/context/userContext'
import Logo from './Logo'
import AsisegLoader from './Buttons/AsisegLoader'
export default function Header() {
  const $registerState = useStore(registerState)
  const $modal = useStore(modal)
  const { usuario } = useAuth()
  return (
    <>
      <nav className=" bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
          <Logo />
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {typeof usuario === 'undefined' ? (
              <>
                <div className="mr-5 px-2 py-1">
                  <AsisegLoader showLogo={false} />
                </div>
              </>
            ) : usuario ? (
              <a href="/misdatos">
                <button className="btn btn-primary opacity-80 transition-opacity mr-5 px-2 py-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-user"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#ffffff"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                  </svg>
                </button>
              </a>
            ) : (
              <button
                type="button"
                className="text-white bg-asiseg-blue hover:bg-asiseg-blue/70 focus:ring-4 focus:outline-none focus:asiseg-blue font-medium rounded-lg text-sm px-4 py-2 text-center mr-5"
                onClick={() => setModal({ value: true })}
              >
                Iniciar sesión
              </button>
            )}

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

          {/* <ul className="hidden md:flex md:flex-col p-4 md:p-0  font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse  ">
            <a href="/panel">Ir a panel de control</a>
          </ul> */}
          {/* </div> */}
        </div>
      </nav>
      <Dialog
        header={$registerState ? '¡Bienvenid@!' : '¡Bienvenid@ de nuevo!'}
        visible={$modal}
        onHide={() => {
          setModal({ value: false })
        }}
        style={{ width: '450px', minWidth: '300px' }}
        breakpoints={{ '640px': '350px' }}
        className="bg-gray-50"
      >
        <RegisterForm />
      </Dialog>
    </>
  )
}
