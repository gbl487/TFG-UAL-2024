import Logo from '@components/Logo.jsx'
export default function Header() {
  return (
    <>
      <div className="flex flex-row w-full">
        <Logo />
        <div className="flex justify-end w-full sm:mx-5 sm:items-start min-w-sm ">
          <div className="flex flex-col-reverse gap-1 justify-center sm:flex-row sm:items-start my-5 mx-2 sm:mx-5 transition-transform">
            <button className="text-white bg-asiseg-gray opacity-65 hover:opacity-100 transition-opacity p-2 rounded-md mx-1 mt-1 sm:mt-0">
              Registrarse
            </button>
            <button className="text-white bg-asiseg-blue opacity-65 hover:opacity-100 transition-opacity p-2 rounded-md mx-1">
              Iniciar sesión
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
