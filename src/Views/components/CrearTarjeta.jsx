// import { useForm } from 'react-hook-form'
import { useRef, useState } from 'react'
import Card from './Card'
import './quill.css'
import { Editor } from 'primereact/editor'
import { SeeMoreIcon } from '@Icons/Icons'
import { FILTROS } from 'src/constants'
export default function CrearTarjeta() {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm()
  const [titulo, setTitulo] = useState()
  const [fichero, setFichero] = useState()
  const [text, setText] = useState('')
  const quillRef = useRef()
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
  const Footer = () => {
    return (
      <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-asiseg-blue rounded-lg opacity-65 hover:opacity-100 transition-opacity ">
        Ver más
        <SeeMoreIcon />
      </div>
    )
  }
  const obtenerContenido = () => {
    const newDelta = quillRef.current.getQuill().editor.delta
    const newHtml = deltaToHtml(newDelta)
    setText(newHtml)
  }

  function deltaToHtml(delta) {
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
                id="titulo"
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
                id="portada"
                value={fichero}
                onChange={(e) => setFichero(e.target.value)}
                className="file-input bg-asiseg-gray/20 w-full max-w-md"
              />
            </div>
            <div className="form-control w-full max-w-md mt-5">
              <div className="label">
                <span className="label-text text-black text-lg">
                  Categorías
                </span>
              </div>
              <div className="flex flex-row">
                <div className="flex flex-col mx-2">
                  <div className="form-control bg-asiseg-gray/10 p-2 rounded-lg">
                    <p>
                      <strong>Tipo de Cura</strong>
                    </p>
                    <label htmlFor="PREOP" className="label cursor-pointer">
                      <span className="label-text text-black pr-2">
                        Preoperatorio
                      </span>
                      <input
                        id="PREOP"
                        type="checkbox"
                        className="checkbox checkbox-primary"
                      />
                    </label>
                    <label htmlFor="POSTOP" className="label cursor-pointer">
                      <span className="label-text text-black pr-2">
                        Postoperatorio
                      </span>
                      <input
                        id="POSTOP"
                        type="checkbox"
                        className="checkbox checkbox-primary"
                      />
                    </label>
                  </div>
                </div>
                <div className="flex flex-col mx-2">
                  <div className="form-control bg-asiseg-gray/10 p-2 rounded-lg">
                    <p>
                      <strong>Área afectada</strong>
                    </p>
                    <label className="label cursor-pointer">
                      <span className="label-text text-black pr-2">
                        Corazón
                      </span>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary"
                      />
                    </label>
                    <label className="label cursor-pointer">
                      <span className="label-text text-black pr-2">Pulmón</span>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary"
                      />
                    </label>

                    <label className="label cursor-pointer">
                      <span className="label-text text-black pr-2">Hígado</span>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <div className="label">
                <span className="label-text text-black text-lg">Contenido</span>
              </div>
              <Editor
                id="editor"
                // value={text}
                ref={quillRef}
                // onTextChange={(e) => handleEditorChange(e)}
                className="max-w-3xl"
                headerTemplate={cabecera}
                style={{ height: '400px' }}
              />
              <button onClick={obtenerContenido}>Obtener Delta</button>
            </div>
          </form>
        </div>

        <div className="flex flex-col w-full basis-1/3 gap-y-5">
          <h1>Ejemplo</h1>
          <div className="flex justify-center">
            <Card titulo={titulo} descripcion={text} Footer={Footer} />
          </div>

          <div>
            <div
              className=" inner"
              dangerouslySetInnerHTML={{ __html: text }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
