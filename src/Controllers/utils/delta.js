export function deltaToHtml(delta) {
  let html = ''
  let newInsert = ''
  // let string = ''
  // const patron = /\n{2,}/g
  delta.ops.forEach((op) => {
    if (op.insert) {
      if (typeof op.insert === 'string') {
        // if (patron.test(op.insert)) {
        //   string = op.insert
        //   string.replace(patron, '\n')
        //   console.log(string)
        // }
        if (op.insert !== '\n') {
          newInsert = op.insert.replace(/\n/g, '</br>')
          html += `<p>${newInsert}</p>` // Para texto
        }
      } else if (typeof op.insert === 'object' && op.insert.image) {
        html += `<div class="flex justify-center">
          <img src="${op.insert.image}"></div>` // Para imágenes
      }
    }
    // Verifica los atributos del op
    if (op.attributes) {
      if (op.attributes.link) {
        html = `<a href="${op.attributes.link}">${html}</a>`
      }
      if (op.attributes.italic) {
        html = `<em>${html}</em>`
      }
      if (op.attributes.bold) {
        html = `<strong>${html}</strong>`
      }
      if (op.attributes.underline) {
        html = `<u>${html}</u>`
      }
    }
  })

  return html
}
