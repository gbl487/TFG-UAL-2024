// import { useForm } from 'react-hook-form'
import { useState } from 'react'
// import Card from './Card'
import { Editor } from 'primereact/editor'
import './quill.css'
export default function CrearTarjeta() {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm()
  const [titulo, setTitulo] = useState()
  const [fichero, setFichero] = useState()
  const [text, setText] = useState('')
  const [value, setValue] = useState('')
  const CabeceraEditor = () => {
    return (
      <div id="toolbar">
        <span className="ql-formats">
          <button className="ql-bold" aria-label="Bold"></button>
          <button className="ql-italic" aria-label="Italic"></button>
          <button className="ql-underline" aria-label="Underline"></button>
        </span>
      </div>
    )
  }
  const cabecera = CabeceraEditor()
  // const Footer = () => {
  //   return (
  //     <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-asiseg-blue rounded-lg opacity-65 hover:opacity-100 transition-opacity ">
  //       Ver más
  //       <SeeMoreIcon />
  //     </div>
  //   )
  // }
  let html = '' // Utilizaremos esta variable para construir el HTML
  function deltaToHtml(delta) {
    delta.ops.forEach((op) => {
      console.log(html)

      if (op.delete) {
        html = html.slice(0, -1)
      }

      if (op.insert) {
        console.log(op.insert)
        if (typeof op.insert === 'string') {
          if (html === '') {
            if (op.insert !== '\n') {
              html += '<p>'
            }
          }
          if (op.insert === '\n') {
            html += '</p></br>'
          }
          html += op.insert // Concatenamos el texto directamente
        } else if (typeof op.insert === 'object' && op.insert.image) {
          html += `<img src="${op.insert.image}" >` // Concatenamos la etiqueta de la imagen
        }
      }
      // class="flex justify-center max-h-14 mb-5"

      if (op.attributes) {
        Object.keys(op.attributes).forEach((key) => {
          if (key === 'link') {
            html += `<a href="${op.attributes.link}">${html}</a>` // Envolver enlace alrededor del HTML existente
          } else if (key === 'italic' && op.attributes[key]) {
            html += `<em>${html}</em>` // Aplicamos estilo de cursiva al HTML existente
          } else if (key === 'bold' && op.attributes[key]) {
            html += `<strong>${html}</strong>` // Aplicamos estilo de negrita al HTML existenteD
          } else if (key === 'underline' && op.attributes[key]) {
            html += `<u>${html}</u>` // Aplicamos subrayado al HTML existente
          }
        })
      }
    })
    setText(html)
  }

  console.log(text)

  return (
    <>
      <div className="p-10 md:ml-64 w-auto flex flex-col xl:flex-row justify-between gap-10">
        <div className="flex flex-col basis-2/3 justify-center md:justify-start gap-y-5">
          <h1>
            Por favor, introduzca todos los valores de todos los siguientes
            campos:
          </h1>
          <form action="#">
            <label className="form-control w-full max-w-md">
              <div className="label">
                <span className="label-text text-black text-lg">Título</span>
              </div>
              <input
                type="text"
                placeholder="Cura..."
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="input bg-asiseg-gray/20 input-bordered w-full max-w-md"
              />
            </label>
            <div className="mt-5">
              <div className="label">
                <span className="label-text text-black text-lg">Portada</span>
              </div>
              <input
                type="file"
                value={fichero}
                onChange={(e) => setFichero(e.target.value)}
                className="file-input bg-asiseg-gray/20 w-full max-w-md"
              />
            </div>
            <div className="mt-5">
              <div className="label">
                <span className="label-text text-black text-lg">Contenido</span>
              </div>
              <Editor
                value={text}
                onTextChange={(e) => deltaToHtml(e.delta)}
                className="max-w-3xl"
                headerTemplate={cabecera}
                style={{ height: '400px' }}
              />
            </div>
          </form>
        </div>

        <div className="flex basis-1/3 bg-asiseg-blue/50">
          <div className="flex flex-col w-full gap-y-5">
            <h1>Ejemplo</h1>
            {/* <Card titulo={titulo} descripcion={text} Footer={Footer} /> */}
            <div>
              <div
                className="flex flex-col w-full justify-center inner"
                dangerouslySetInnerHTML={{ __html: text }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
