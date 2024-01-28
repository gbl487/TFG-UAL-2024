import { InputMask } from 'primereact/inputmask'
import { checkDNI_NIE } from 'src/Controllers/utils/checkDNI-NIE'
import { useState } from 'react'
export default function RegisterForm() {
  const [dni_nie, setDni_nie] = useState('')
  const [phone, setPhone] = useState('')
  const [errorDNI, setErrorDNI] = useState(null)
  const handleDNI_NIE = (e) => {
    const value = e.target.value
    const primerCaracter = value.charAt(0)
    if (
      primerCaracter !== '' &&
      primerCaracter !== 'X' &&
      primerCaracter !== 'Y' &&
      primerCaracter !== 'Z' &&
      isNaN(parseInt(primerCaracter))
    ) {
      setErrorDNI('El primer caracter debe ser X, Y, Z, o un número')
    } else {
      setErrorDNI(null)
      setDni_nie(value)
      if (value.charAt(8) !== '_' && value.charAt(8) !== '') {
        console.log('hola')
        const valid = checkDNI_NIE({ value })
        if (valid !== true) {
          setErrorDNI('El DNI/NIE introducido no es válido')
        } else {
          setErrorDNI(null)
        }
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <>
      <div className="flex flex-1 justify-center w-full">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl mb-5">
            Inicia sesión en su cuenta
          </h1>
          <form className="space-y-4 md:space-y-6" action="#">
            <div className="w-full mb-7">
              <span className="p-float-label">
                <InputMask
                  id="dni"
                  value={dni_nie}
                  autoClear={false}
                  mask="*9999999a"
                  className="h-8 start-5 w-full"
                  onChange={(e) => {
                    handleDNI_NIE(e)
                  }}
                />
                <label htmlFor="dni">DNI/NIE</label>
              </span>
              <div className="flex w-full justify-center mt-1">
                {errorDNI && (
                  <small className="text-red-400 text-xs">{errorDNI}</small>
                )}
              </div>
            </div>
            <div className="w-full mb-7">
              <span className="p-float-label">
                <InputMask
                  id="phone"
                  mask="(+99) 999 999 999"
                  autoClear={false}
                  className="h-8 start-5 w-full"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value)
                  }}
                />
                <label htmlFor="phoneNumber">Número de teléfono</label>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                    required=""
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="text-gray-500 ">
                    Recordarme
                  </label>
                </div>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-primary-600 hover:underline "
              ></a>
            </div>
            <div className="flex flex-1 justify-center">
              <button
                type="submit"
                className=" text-white bg-asiseg-blue opacity-65 hover:opacity-100 transition-opacity p-2 rounded-md mb-4"
                onClick={(e) => {
                  handleSubmit(e)
                }}
              >
                Iniciar sesión
              </button>
            </div>
            <div className="flex flex-row w-full justify-start items-center">
              <p className="text-sm font-light text-gray-500">
                ¿No tienes aún una cuenta?
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline hover:text-asiseg-blue mx-1"
                >
                  Regístrese
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
