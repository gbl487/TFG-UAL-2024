// import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Editor } from 'primereact/editor'
export default function CrearTarjeta() {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm()
  const [titulo, setTitulo] = useState()
  const [fichero, setFichero] = useState()
  const [text, setText] = useState('')
  console.log(text)
  return (
    <>
      <div className="p-10 md:ml-64 w-auto h-full flex flex-col justify-center md:justify-start gap-y-5">
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
              onTextChange={(e) => setText(e.delta)}
              style={{ height: '320px' }}
            />
          </div>
        </form>
      </div>
    </>
  )
}
