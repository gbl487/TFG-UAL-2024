export default function validarContraseña(contraseña) {
  const regexMayus = /[A-Z]/
  const regexNum = /\d/
  const regexSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/
  let validMayus = undefined
  let validNum = undefined
  let validSpecialChar = undefined

  regexMayus.test(contraseña) ? (validMayus = true) : (validMayus = false)
  regexNum.test(contraseña) ? (validNum = true) : (validNum = false)
  regexSpecialChar.test(contraseña)
    ? (validSpecialChar = true)
    : (validSpecialChar = false)

  return { validMayus, validNum, validSpecialChar }
}
