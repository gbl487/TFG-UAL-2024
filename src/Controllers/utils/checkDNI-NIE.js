export function checkDNI_NIE({ value }) {
  if (value.length < 9 || value.length > 9) return
  var DNI_REGEX = /^(\d{8})([A-Z])$/
  var NIE_REGEX = /^[XYZ]\d{7,8}[A-Z]$/
  let valid = false
  let documentType = ''

  if (value.match(DNI_REGEX)) {
    documentType = 'DNI'
  } else if (value.match(NIE_REGEX)) {
    documentType = 'NIE'
  }
  if (documentType !== '') {
    switch (documentType) {
      case 'DNI':
        valid = validDNI(value)
        break
      case 'NIE':
        valid = validNIE(value)
        break
    }
  }
  return {
    type: documentType,
    valid: valid,
  }
}
var validDNI = function (value) {
  var dni_letters = 'TRWAGMYFPDXBNJZSQVHLCKE'
  var letter = dni_letters.charAt(parseInt(value, 10) % 23)
  return letter === value.charAt(8)
}

var validNIE = function (nie) {
  var nie_prefix = nie.charAt(0)

  switch (nie_prefix) {
    case 'X':
      nie_prefix = 0
      break
    case 'Y':
      nie_prefix = 1
      break
    case 'Z':
      nie_prefix = 2
      break
  }

  return validDNI(nie_prefix + nie.substr(1))
}
