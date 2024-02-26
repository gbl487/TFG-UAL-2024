import 'primeicons/primeicons.css'
import { useState } from 'react'
import Chip from './Tag.jsx'
import { CloseIcon, SeeMoreIcon } from '@Icons/Icons.jsx'
import { Drawer } from 'vaul'

export default function InfoCard({ titulo, descripcion }) {
  const [visible, setVisible] = useState(false)

  const ocultar = () => {
    setVisible(false)
  }
  return (
    <>
      <Drawer.Root open={visible} direction="bottom" onClose={() => ocultar()}>
        <Drawer.Trigger asChild onClick={() => setVisible(true)}>
          <div className="w-full flex justify-center">
            <button className="max-w-sm min-w-80 bg-gray-100 border border-gray-200 rounded-lg shadow-md hover:shadow-asiseg-gray hover:transition-shadow subpixel-antialiased overflow-hidden text-left">
              {/* dark:bg-gray-800 dark:border-gray-700 */}

              <img
                className="h-56 w-full object-cover object-center rounded-t-lg "
                src="https://media.istockphoto.com/id/519085852/es/foto/3-d-ilustraci%C3%B3n-de-intestino-delgado.jpg?s=2048x2048&w=is&k=20&c=i172otnZoBgfuY9Pdpl5R7KMteyFxhWzVnvzsgUW3LU="
                alt="Titulo del contenido"
              />

              {/* https://media.istockphoto.com/id/519085852/es/foto/3-d-ilustraci%C3%B3n-de-intestino-delgado.jpg?s=2048x2048&w=is&k=20&c=i172otnZoBgfuY9Pdpl5R7KMteyFxhWzVnvzsgUW3LU= */}
              <div className="p-5">
                <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 text-ellipsis overflow-hidden line-clamp-2 min-h-14">
                  {/* dark:text-white */}
                  {titulo}
                </h5>

                <p className="p-car-text mb-3 font-normal text-gray-700  dark:text-gray-400 text-ellipsis overflow-hidden line-clamp-3 min-h-[72px]">
                  {descripcion}
                </p>
                <div>
                  <div className="mb-2 flex flex-row flex-wrap gap-2 py-1 overflow-hidden min-h-20">
                    <Chip tag={'Preoperatorio'} />
                    <Chip tag={'Corazon'} />
                    <Chip tag={'Pulmon'} />
                    <Chip tag={'Estomago'} />
                  </div>

                  <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-asiseg-blue rounded-lg opacity-65 hover:opacity-100 transition-opacity ">
                    {/* dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 */}
                    Ver más
                    <SeeMoreIcon />
                  </div>
                </div>
              </div>
            </button>
          </div>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0" />
          <Drawer.Content className="bg-white flex flex-col rounded-t-[10px] h-[100%] mt-24 fixed bottom-0 left-0 right-0 z-50">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-10 mt-5" />
            <div className=" fixed top-4 right-4 ">
              <button onClick={() => ocultar()}>
                <CloseIcon />
              </button>
            </div>

            <div className="max-w-full w-full mx-auto flex flex-col overflow-y-auto p-4 rounded-t-[10px]">
              <div className="max-w-6xl mx-auto leading-loose text-lg">
                <Drawer.Title className="text-2xl font-semibold mb-2">
                  Titulo de la tarjeta
                </Drawer.Title>

                <div className="mb-2 flex flex-row flex-wrap gap-2 py-1">
                  <Chip tag={'Preoperatorio'} />
                  <Chip tag={'Corazon'} />
                  <Chip tag={'Pulmon'} />
                </div>
                <p className="mb-5 text-pretty">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
                <img className="h-52" src="/asiseg-logo-desktop.svg" alt="" />
                <p className="mb-5 text-pretty">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
                <p className="mb-5 text-pretty">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
                <img className="h-52" src="/asiseg-logo-desktop.svg" alt="" />
                <p className="mb-5 text-pretty">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
                <img className="h-52" src="/asiseg-logo-desktop.svg" alt="" />
                <p className="mb-5 text-pretty">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
                <img className="h-52" src="/asiseg-logo-desktop.svg" alt="" />
                <p className="mb-5 text-pretty">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
                <img className="h-52" src="/asiseg-logo-desktop.svg" alt="" />
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  )
}
