export default function Header() {
  return (
    <div className="flex flex-row w-full">
      <div className="flex justify-start">
        <a href="/">
          <img
            alt="logo"
            src="/Logo.svg"
            className="w-32 sm:w-48 lg:w-60 mt-2.5 ml-12"
          />
        </a>
      </div>

      <div className="flex justify-end w-full sm:mx-5 sm: items-start">
        <div className="flex flex-col-reverse gap-1 sm:flex-row sm:items-start my-5 mx-5 transition-transform">
          <button className="text-white bg-asiseg-gray opacity-65 hover:opacity-100 transition-opacity p-2 rounded-md mx-1 mt-1 sm:mt-0">
            Registrarse
          </button>
          <button className="text-white bg-asiseg-blue opacity-65 hover:opacity-100 transition-opacity p-2 rounded-md mx-1">
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  )
}
