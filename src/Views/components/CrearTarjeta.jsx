import { useRef, useState } from 'react'
import { Editor } from 'primereact/editor'
import { FILTROS, ALLOWEDFILETYPES } from 'src/constants'
import { useForm } from 'react-hook-form'
import InfoCard from './InfoCard'
import { deltaToHtml } from 'src/Controllers/utils/delta'
import 'primereact/resources/themes/tailwind-light/theme.css'
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
import isEmptyArray from 'src/Controllers/utils/isEmptyArray'
import { crearTarjeta } from 'src/Model/Tarjetas'
import { setToast } from 'src/Controllers/context/toast_context'
import Toast from './Toast'
import AsisegLoader from './Buttons/AsisegLoader'
export default function CrearTarjeta() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [titulo, setTitulo] = useState()
  const [text, setText] = useState('')
  const [content, setContent] = useState('')
  const [errorContent, setErrorContent] = useState(false)
  const [portada, setPortada] = useState('')
  const [errorPortada, setErrorPortada] = useState(false)
  const [tags, setTags] = useState([])
  const [errorTag, setErrorTag] = useState(false)
  const [desc, setDesc] = useState('')
  const [loading, setLoading] = useState(false)
  const quillRef = useRef()
  // const CabeceraEditor = () => {
  //   return (
  //     <div id="toolbar">
  //       <span className="ql-formats">
  //         <button className="ql-bold" aria-label="Bold"></button>
  //         <button className="ql-italic" aria-label="Italic"></button>
  //         <button className="ql-underline" aria-label="Underline"></button>
  //         <button className="ql-image" aria-label="Image"></button>
  //       </span>
  //     </div>
  //   )
  // }
  // const cabecera = CabeceraEditor()

  function getHtml(delta) {
    setContent(delta)
    var cfg = {}
    var converter = new QuillDeltaToHtmlConverter(delta.ops, cfg)
    var contenido = converter.convert()
    const html = deltaToHtml(delta.ops)
    setText(contenido)
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
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
    })

  const onSubmit = async (data) => {
    setErrorTag(isEmptyArray(tags))
    setErrorContent(isEmptyArray(content))
    !ALLOWEDFILETYPES.includes(data.portada[0].type)
      ? setErrorPortada(true)
      : setErrorPortada(false)
    if (!errorContent && !errorTag && !errorPortada) {
      setLoading(true)
      const { result } = await crearTarjeta({
        titulo: titulo,
        imagen: portada,
        categorias: tags,
        contenido: content.ops,
      })
      if (result === 'VALID') {
        setToast({ value: true })
        const timer = setTimeout(() => {
          setLoading(false)
          if (window) window.location.href = '/administrarcontenido'
        }, 1000)
        timer()
      }
    }
  }
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    toBase64(file).then((data) => setPortada(data))
  }
  return (
    <>
      <div className="p-10 md:ml-64 w-auto flex flex-col xl:flex-row justify-between gap-10">
        {loading ? (
          <div className="flex w-full justify-center items-center">
            <AsisegLoader showLogo={true} />
          </div>
        ) : (
          <>
            <div className="flex flex-col basis-2/3 justify-center md:justify-start gap-y-5">
              <h1>
                Por favor, introduzca todos los valores de todos los siguientes
                campos:
              </h1>
              <form onSubmit={handleSubmit(onSubmit)} action="#">
                <div className="form-control max-w-md">
                  <div className="label">
                    <span className="label-text text-black text-lg">
                      Título
                    </span>
                  </div>
                  <input
                    type="text"
                    id="titulo"
                    {...register('titulo', { required: true, minLength: 5 })}
                    placeholder="Cura..."
                    // value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="input bg-asiseg-gray/10 input-bordered w-full max-w-md"
                  />
                  {errors.titulo?.type === 'required' && (
                    <small className="text-red-400 text-xs mt-2" role="alert">
                      Este campo es obligatorio
                    </small>
                  )}
                  {errors.titulo?.type === 'minLength' && (
                    <small className="text-red-400 text-xs mt-2" role="alert">
                      El título debe tener 50 caracteres
                    </small>
                  )}
                </div>
                <div className="form-control max-w-md mt-5">
                  <div className="label">
                    <span className="label-text text-black text-lg">
                      Imagen
                    </span>
                  </div>
                  <input
                    type="file"
                    id="portada"
                    {...register('portada', { required: true })}
                    onChange={handleFileChange}
                    className="file-input bg-asiseg-gray/10 w-full max-w-md"
                  />
                  {errors.portada?.type === 'required' && (
                    <small className="text-red-400 text-xs mt-2" role="alert">
                      Este campo es obligatorio
                    </small>
                  )}
                  {errorPortada && (
                    <small className="text-red-400 text-xs mt-2" role="alert">
                      Tipo de archivo inválido
                    </small>
                  )}
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
                            )
                          })}
                        </div>
                      )
                    })}
                    {errorTag && (
                      <small className="text-red-400 text-xs mt-2" role="alert">
                        Debe seleccionar al menos una categoía
                      </small>
                    )}
                  </div>
                </div>
                <div className="mt-5">
                  <div className="label">
                    <span className="label-text text-black text-lg">
                      Contenido
                    </span>
                  </div>
                  <Editor
                    id="contenido"
                    ref={quillRef}
                    onTextChange={() =>
                      getHtml(quillRef.current.getQuill().editor.delta)
                    }
                    className="max-w-4xl"
                    // headerTemplate={cabecera}
                    style={{ height: '600px' }}
                  />
                  {errorContent && (
                    <small className="text-red-400 text-xs mt-2" role="alert">
                      Este campo es obligatorio
                    </small>
                  )}
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
                  portada={portada}
                  descripcion={desc}
                  tags={tags}
                  contenido={text}
                />
              </div>
            </div>
          </>
        )}

        <Toast text={'Contenido creado con éxito'} />
      </div>
    </>
  )
}
