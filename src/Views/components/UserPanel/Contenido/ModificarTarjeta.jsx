import { useEffect, useRef, useState } from 'react'
import { Editor } from 'primereact/editor'
import { FILTROS, ALLOWEDFILETYPES } from 'src/constants'
import { useForm } from 'react-hook-form'
import InfoCard from '../../InfoCard'
import { getDelta } from 'src/Controllers/utils/delta'
import 'primereact/resources/themes/tailwind-light/theme.css'
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
import isEmptyArray from 'src/Controllers/utils/isEmptyArray'
import { getTarjetaFromId, modificarTarjeta } from 'src/Model/Tarjetas'
import { setToast } from 'src/Controllers/context/toast_context'
import AsisegLoader from './../../Buttons/AsisegLoader'
import { useNavigate, useParams } from 'react-router'
import Toast from '@components/core/Toast'
import checkDatosTarjeta from 'src/Controllers/utils/checkDatosTarjeta'
import PanelHeader from '../PanelHeader'
export default function ModificarTarjeta() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { id } = useParams()
  const [titulo, setTitulo] = useState('')
  const [text, setText] = useState('')
  const [content, setContent] = useState('')
  const [errorContent, setErrorContent] = useState(false)
  const [imagen, setImagen] = useState('')
  const [errorImagen, setErrorImagen] = useState(false)
  const [tags, setTags] = useState([])
  const [errorTag, setErrorTag] = useState(false)
  const [desc, setDesc] = useState('')
  const [loading, setLoading] = useState(true)
  const [loadingEditor, setLoadingEditor] = useState(true)
  const quillRef = useRef()
  const [tarjeta, setTarjeta] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    const obtenerTarjeta = async () => {
      try {
        const tarjeta = await getTarjetaFromId({ idTarjeta: id })
        return tarjeta
      } catch (error) {
        console.error('Error al obtener las tarjetas:', error)
      }
    }
    obtenerTarjeta().then((result) => {
      setTarjeta(result)
      const { delta } = getDelta(result.contenido)
      var contenido = new QuillDeltaToHtmlConverter(delta.ops, {}).convert()

      setContent(contenido)
      setDesc(contenido.replace(/<[^>]+>/g, ''))
      setText(contenido)
      setTitulo(result.titulo)
      setTags(result.categorias)
      setImagen(result.imagen)

      setLoading(false)
    })
  }, [id])
  useEffect(() => {
    if (quillRef.current && tarjeta && tarjeta.contenido) {
      setTimeout(() => {
        const editor = quillRef.current.getQuill()
        if (editor) {
          editor.setContents(tarjeta.contenido)
        }
        setLoadingEditor(false)
      }, 1000)
    }
  }, [quillRef, tarjeta])

  const CabeceraEditor = () => {
    return (
      <div id="toolbar">
        <span className="ql-formats">
          <button className="ql-bold" aria-label="Bold"></button>
          <button className="ql-italic" aria-label="Italic"></button>
          <button className="ql-underline" aria-label="Underline"></button>
          <button className="ql-strike" aria-label="Strike"></button>
          <button className="ql-link" aria-label="Insert Link"></button>
          <button className="ql-image" aria-label="Insert Image"></button>
        </span>
        <span className="ql-formats">
          <button
            className="ql-list"
            value="ordered"
            aria-label="Ordered List"
          ></button>
          <button
            className="ql-list"
            value="bullet"
            aria-label="Unordered List"
          ></button>
          <select className="ql-align" aria-label="Text Alignment">
            <option value=""></option>
            <option value="center"></option>
            <option value="right"></option>
            <option value="justify"></option>
          </select>
        </span>
        <span className="ql-formats">
          <select className="ql-color" aria-label="Text Color">
            <option value=""></option>
            <option value="red"></option>
            <option value="green"></option>
            <option value="blue"></option>
          </select>
          <select className="ql-background" aria-label="Background Color">
            <option value=""></option>
            <option value="red"></option>
            <option value="green"></option>
            <option value="blue"></option>
          </select>
          <button className="ql-clean" aria-label="Remove Format"></button>
        </span>
      </div>
    )
  }
  const cabecera = CabeceraEditor()
  function getHtml(delta) {
    setContent(delta)
    var contenido = new QuillDeltaToHtmlConverter(delta.ops, {}).convert()
    setText(contenido)
    setDesc(contenido.replace(/<[^>]+>/g, ''))
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

  const onSubmit = async () => {
    setErrorTag(isEmptyArray(tags))
    setErrorContent(isEmptyArray(content))
    if (!errorContent && !errorTag && !errorImagen) {
      const datosOld = {
        titulo: tarjeta.titulo,
        imagen: tarjeta.imagen,
        categorias: tarjeta.categorias,
        contenido: tarjeta.contenido,
      }
      const datosNew = {
        titulo: titulo,
        imagen: imagen,
        categorias: tags,
        contenido: content.ops,
      }
      const { resultado: resultadoCheck } = checkDatosTarjeta({
        datosOld,
        datosNew,
      })

      if (resultadoCheck === 'OK') {
        setLoading(true)
        const { result } = await modificarTarjeta({
          idTarjeta: id,
          titulo: titulo,
          imagen: imagen,
          categorias: tags,
          contenido: content.ops,
        })
        if (result === 'OK') {
          setToast({ value: true, text: 'Contenido modificado correctamente' })
          setLoading(false)
          navigate('/contenido')
        }
      } else {
        setToast({ value: true, text: 'No se han detectado cambios' })
      }
    }
  }
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    !ALLOWEDFILETYPES.includes(file.type)
      ? setErrorImagen(true)
      : setErrorImagen(false)
    toBase64(file).then((data) => {
      setImagen(data)
    })
  }
  return (
    <>
      <div className="h-screen flex flex-col">
        {/* Header */}
        <PanelHeader />
        {loading ? (
          <div className="flex w-full h-screen justify-center items-center">
            <AsisegLoader showLogo={true} />
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row px-10">
            <div className="flex flex-col basis-2/3 justify-center md:justify-start gap-y-5 mt-28">
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
                    defaultValue={tarjeta.titulo}
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
                    id="imagen"
                    onChange={handleFileChange}
                    className="file-input bg-asiseg-gray/10 w-full max-w-md"
                  />
                  {errors.imagen?.type === 'required' && (
                    <small className="text-red-400 text-xs mt-2" role="alert">
                      Este campo es obligatorio
                    </small>
                  )}
                  {errorImagen && (
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
                                  defaultChecked={tarjeta.categorias.includes(
                                    categoria.code
                                  )}
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

                  {loadingEditor && (
                    <div className="flex flex-col justify-center my-5 pt-2 border-2 rounded-lg max-w-4xl">
                      <p className="flex w-full justify-center">
                        Cargando contenido del editor...
                      </p>
                      <AsisegLoader showLogo={false} />
                    </div>
                  )}
                  <Editor
                    id="contenido"
                    ref={quillRef}
                    onTextChange={() => {
                      getHtml(quillRef.current.getQuill().editor.delta)
                    }}
                    className="max-w-full"
                    headerTemplate={cabecera}
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
                    disabled={loadingEditor ? true : false}
                    type="submit"
                    className="btn btn-primary text-white opacity-65 transition-opacity p-4 rounded-md mb-4"
                  />
                </div>
              </form>
            </div>

            <div className="flex flex-col w-full basis-1/3 gap-y-5 mt-28">
              <h1>Ejemplo</h1>
              {loadingEditor ? (
                <div className="flex flex-col justify-center my-5 pt-2 border-2 rounded-lg max-w-4xl">
                  <p className="flex w-full justify-center">Cargando ejemplo</p>
                  <AsisegLoader showLogo={false} />
                </div>
              ) : (
                <div className="flex justify-center">
                  <InfoCard
                    titulo={titulo}
                    imagen={imagen}
                    descripcion={desc}
                    tags={tags}
                    contenido={text}
                  />
                </div>
              )}
            </div>
            <Toast />
          </div>
        )}
      </div>
    </>
  )
}
