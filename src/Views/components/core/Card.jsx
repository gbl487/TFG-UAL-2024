import TagArray from './TagArray'

export default function Card({ titulo, imagen, descripcion, tags, Footer }) {
  const defaultImagen = ''
  return (
    <div className="max-w-sm min-w-80 bg-gray-50/50 border border-gray-200 rounded-lg shadow-md hover:shadow-asiseg-gray hover:transition-shadow subpixel-antialiased overflow-hidden text-left">
      <img
        className="h-56 w-full object-cover object-center rounded-t-lg "
        src={imagen ? imagen : defaultImagen}
        alt={titulo}
      />
      <div className="p-5">
        <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 text-ellipsis line-clamp-2 min-h-14">
          {titulo}
        </h5>
        <p className="p-car-text mb-3 font-normal text-gray-9 00  dark:text-gray-400 text-ellipsis overflow-hidden line-clamp-3 min-h-[72px]">
          {descripcion}
        </p>
        <div>
          <div className="mb-2 flex flex-row flex-wrap gap-2 py-1 overflow-hidden min-h-20">
            <TagArray tags={tags} />
          </div>
          {Footer && <Footer />}
        </div>
      </div>
    </div>
  )
}
