import { InputMask } from 'primereact/inputmask'
import { checkDNI_NIE } from 'src/Controllers/utils/checkDNI-NIE'
import { useState } from 'react'
export function RegisterForm() {
  const [dni_nie, setDni_nie] = useState('')
  const [phone, setPhone] = useState('')
  const [errorDNI, setErrorDNI] = useState(null)
  const handleDNI_NIE = (e) => {
    const value = e.target.value
    setDni_nie(value)
    const primerCaracter = value.charAt(0)
    if (
      primerCaracter !== '' &&
      primerCaracter !== 'X' &&
      primerCaracter !== 'Y' &&
      primerCaracter !== 'Z' &&
      isNaN(parseInt(primerCaracter))
    ) {
      setErrorDNI('El primer caracter debe ser X, Y, Z, o un número')
      return
    } else {
      setDni_nie(value)
      const { valid } = checkDNI_NIE({ value })
      if (valid !== true) {
        setErrorDNI('El DNI/NIE introducido no es válido')
      } else {
        setErrorDNI(null)
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <>
      <div className="flex flex-row justify-center">
        <img
          id="logo"
          alt="logo"
          src="/Logo.svg"
          className="min-w-32 w-10 sm:w-40 mt-[-20px]"
        />
      </div>

      <div className="flex flex-col justify-center ">
        <form action="registerForm">
          <div className="flex flex-row flex-wrap justify-center w-full mb-7">
            <span className="p-float-label">
              <InputMask
                id="dni"
                value={dni_nie}
                autoClear={false}
                mask="*9999999a"
                className="h-8 start-5"
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

          <div className="flex flex-row justify-center w-full mb-7">
            <span className="p-float-label">
              <InputMask
                id="phone"
                mask="(+99) 999 999 999"
                autoClear={false}
                className="h-8"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value)
                }}
              />
              <label htmlFor="phoneNumber">Número de teléfono</label>
            </span>
          </div>
          <div className="flex flex-1 justify-center">
            <button
              className=" text-white bg-asiseg-blue opacity-65 hover:opacity-100 transition-opacity p-2 rounded-md mb-4"
              onClick={(e) => {
                handleSubmit(e)
              }}
            >
              Registrarme
            </button>
          </div>
          <div className="flex flex-row w-full justify-start items-center">
            <h1>Por favor, rellene los campos para poder registrarse.</h1>
          </div>
        </form>
      </div>
    </>
  )
}
