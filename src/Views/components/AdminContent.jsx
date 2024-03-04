import { DeleteCardIcon, ModidyCardIcon, SeeCardIcon } from '@Icons/Icons'
import { AddContentButton } from './Buttons/AddContentButton'
import Card from './Card'
import { useAuth } from 'src/Controllers/context/userContext'

export default function AdminContent() {
  const { usuario } = useAuth()
  const titulo =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac dui et mauris tincidunt fermentum. Quisque vestibulum quam id turpis facilisis, in ullamcorper nulla ullamcorper.'
  const descripcion =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac dui et mauris tincidunt fermentum. Quisque vestibulum quam id turpis facilisis, in ullamcorper nulla ullamcorper. Nulla facilisi. Sed feugiat augue eget fermentum aliquam. Integer bibendum auctor ex, vel euismod purus. Sed tristique ligula nec ligula blandit, sit amet aliquam elit laoreet.'
  const Footer = () => {
    return (
      <div className="flex w-full bg-slate justify-end gap-2 ">
        <button className="btn btn-success opacity-65">
          <a href="/administrarcontenido/visualizar">
            <SeeCardIcon />
          </a>
        </button>
        <button className="btn btn-primary ">
          <a href="/administrarcontenido/modificar">
            <ModidyCardIcon />
          </a>
        </button>
        <button className="btn btn-error ">
          <DeleteCardIcon />
        </button>
      </div>
    )
  }
  return (
    <>
      {usuario && (
        <>
          <div className="p-4 md:ml-64 w-auto h-full flex flex-col">
            <div className="flex justify-center my-5">
              <a href="/administrarcontenido/crear">
                <AddContentButton />
              </a>
            </div>
            <div className="w-full flex justify-center">
              <section className="grid grid-cols-1 lg+:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5 gap-5">
                <Card
                  titulo={titulo}
                  descripcion={descripcion}
                  tags={[]}
                  Footer={Footer}
                />

                <Card
                  titulo={titulo}
                  descripcion={descripcion}
                  tags={[]}
                  Footer={Footer}
                />
                <Card
                  titulo={titulo}
                  descripcion={descripcion}
                  tags={[]}
                  Footer={Footer}
                />
                <Card
                  titulo={titulo}
                  descripcion={descripcion}
                  tags={[]}
                  Footer={Footer}
                />
                <Card
                  titulo={titulo}
                  descripcion={descripcion}
                  tags={[]}
                  Footer={Footer}
                />
              </section>
            </div>
          </div>
        </>
      )}
    </>
  )
}
