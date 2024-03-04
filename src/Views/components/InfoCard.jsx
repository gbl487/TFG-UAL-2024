import 'primeicons/primeicons.css'
import { useState } from 'react'
import { CloseIcon, SeeMoreIcon } from '@Icons/Icons.jsx'
import { Drawer } from 'vaul'
import Card from './Card.jsx'
import './quill.css'
import TagArray from './TagArray.jsx'
export default function InfoCard({ titulo, tags, descripcion, contenido }) {
  const [visible, setVisible] = useState(false)

  const ocultar = () => {
    setVisible(false)
  }
  const Footer = () => {
    return (
      <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-asiseg-blue rounded-lg opacity-65 hover:opacity-100 transition-opacity ">
        Ver más
        <SeeMoreIcon />
      </div>
    )
  }
  return (
    <>
      <Drawer.Root open={visible} direction="bottom" onClose={() => ocultar()}>
        <div className="w-full flex justify-center">
          <Drawer.Trigger asChild onClick={() => setVisible(true)}>
            <button>
              <Card
                titulo={titulo}
                descripcion={descripcion}
                tags={tags}
                Footer={Footer}
              />
            </button>
          </Drawer.Trigger>
        </div>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0" />
          <Drawer.Content className="bg-gray-50 flex flex-col  h-[100%] mt-24 fixed bottom-0 left-0 right-0 z-50">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-10 mt-5" />
            <div className="fixed top-4 right-4 sm:right-10 md:right-15 xl:right-20 ">
              <button onClick={() => ocultar()}>
                <CloseIcon />
              </button>
            </div>

            <div className="max-w-full w-full mx-auto flex flex-col overflow-y-auto p-4 rounded-t-[10px]">
              <div className="max-w-6xl mx-auto leading-loose text-lg">
                <Drawer.Title className="text-2xl font-semibold mb-2">
                  {titulo}
                </Drawer.Title>

                <div className="mb-2 flex flex-row flex-wrap gap-2 py-1">
                  <TagArray tags={tags} />
                </div>
                <div>
                  <div
                    className=" inner"
                    dangerouslySetInnerHTML={{ __html: contenido }}
                  />
                </div>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  )
}
