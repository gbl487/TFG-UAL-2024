import { useRef, useState } from 'react'
import { Editor } from 'primereact/editor'
import { FILTROS } from 'src/constants'
import { useForm } from 'react-hook-form'
import InfoCard from './InfoCard'
import { deltaToHtml } from 'src/Controllers/utils/delta'
export default function CrearTarjeta() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [titulo, setTitulo] = useState()
  const [text, setText] = useState('')
  const [content, setContent] = useState('')
  const [desc, setDesc] = useState('')
  const [tags, setTags] = useState([])
  const quillRef = useRef()
  const CabeceraEditor = () => {
    return (
      <div id="toolbar">
        <span className="ql-formats">
          <button className="ql-bold" aria-label="Bold"></button>
          <button className="ql-italic" aria-label="Italic"></button>
          <button className="ql-underline" aria-label="Underline"></button>
          <button className="ql-image" aria-label="Image"></button>
        </span>
      </div>
    )
  }
  const cabecera = CabeceraEditor()

  function getHtml(delta) {
    setContent(delta)
    const html = deltaToHtml(delta)
    setText(html)
    setDesc(html.replace(/<[^>]+>/g, ''))
  }
  function handleTagChange(e) {
    const checkboxID = e.id
    const isChecked = e.checked

    // Si el checkbox está marcado, agregamos el ID a la lista de tags
    if (isChecked) {
      if (!tags.includes(checkboxID)) {
        setTags((prevTags) => [...prevTags, checkboxID])
      }
    } else {
      // Si el checkbox está desmarcado, eliminamos el ID de la lista de tags
      setTags((prevTags) => prevTags.filter((tag) => tag !== checkboxID))
    }
  }
  const onSubmit = async (data) => {
    console.log(data)
    console.log(quillRef.current.getQuill().editor.delta)
    console.log(content)
  }

  return (
    <>
      <div className="p-10 md:ml-64 w-auto flex flex-col xl:flex-row justify-between gap-10">
        <div className="flex flex-col basis-2/3 justify-center md:justify-start gap-y-5">
          <h1>
            Por favor, introduzca todos los valores de todos los siguientes
            campos:
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} action="#">
            <label className="form-control w-full max-w-md">
              <div className="label">
                <span className="label-text text-black text-lg">Título</span>
              </div>
              <input
                type="text"
                id="titulo"
                {...register('titulo', { required: false })}
                placeholder="Cura..."
                // value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="input bg-asiseg-gray/10 input-bordered w-full max-w-md"
              />
              {errors.titulo?.type === 'required' && (
                <small className="text-red-400 text-xs" role="alert">
                  Este campo es obligatorio
                </small>
              )}
            </label>
            <div className="mt-5">
              <div className="label">
                <span className="label-text text-black text-lg">Portada</span>
              </div>
              <input
                type="file"
                id="portada"
                {...register('portada', { required: false })}
                // value={fichero}
                // onChange={(e) => setFichero(e.target.value)}
                className="file-input bg-asiseg-gray/10 w-full max-w-md"
              />
            </div>
            <div className="form-control w-full max-w-lg mt-5">
              <div className="label">
                <span className="label-text text-black text-lg">
                  Categorías
                </span>
              </div>
              <div className="flex flex-row flex-wrap gapx-2 gap-y-5">
                {FILTROS.map((filtro) => {
                  return (
                    <div
                      key={filtro.id}
                      className="form-control bg-asiseg-gray/10 p-2 w-auto rounded-lg mx-2"
                    >
                      <p>
                        <strong>{filtro.placeholder}</strong>
                      </p>
                      {filtro.options.map((categoria) => {
                        return (
                          <>
                            <label
                              key={categoria.code}
                              htmlFor={categoria.code}
                              className="label cursor-pointer"
                            >
                              <span className="label-text text-black pr-2">
                                {categoria.name}
                              </span>
                              <input
                                id={categoria.code}
                                {...register('cat_' + categoria.code, {
                                  required: false,
                                })}
                                onChange={(e) => handleTagChange(e.target)}
                                type="checkbox"
                                className="checkbox checkbox-primary"
                              />
                            </label>
                          </>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="mt-5">
              <div className="label">
                <span className="label-text text-black text-lg">Contenido</span>
              </div>
              <Editor
                id="contenido"
                // value={text}
                ref={quillRef}
                onTextChange={() =>
                  getHtml(quillRef.current.getQuill().editor.delta)
                }
                className="max-w-4xl"
                headerTemplate={cabecera}
                style={{ height: '600px' }}
              />
              {/* <button onClick={obtenerContenido}>Obtener Delta</button> */}
            </div>
            <div className="flex flex-1 justify-center mt-10">
              <input
                type="submit"
                className="btn btn-primary text-white opacity-65 transition-opacity p-4 rounded-md mb-4"
              />
            </div>
          </form>
        </div>

        <div className="flex flex-col w-full basis-1/3 gap-y-5">
          <h1>Ejemplo</h1>
          <div className="flex justify-center">
            <InfoCard
              titulo={titulo}
              descripcion={desc}
              tags={tags}
              contenido={text}
            />
          </div>
        </div>
      </div>
    </>
  )
}
