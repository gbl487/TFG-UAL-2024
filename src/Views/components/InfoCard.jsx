import 'primeicons/primeicons.css'
import { useState } from 'react'
import { Dialog } from 'primereact/dialog'
import Chip from './Tag.jsx'
import { SeeMoreIcon } from '@Icons/Icons.jsx'

export default function InfoCard({ titulo, descripcion }) {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <button
        className="flex justify-center text-left"
        onClick={() => {
          setVisible(true)
        }}
      >
        <div className="max-w-sm min-w-80 bg-gray-100 border border-gray-200 rounded-lg shadow-md hover:shadow-asiseg-gray hover:transition-shadow subpixel-antialiased overflow-hidden">
          {/* dark:bg-gray-800 dark:border-gray-700 */}
          <img
            className="h-56 w-full object-cover object-center rounded-t-lg "
            src="https://media.istockphoto.com/id/519085852/es/foto/3-d-ilustraci%C3%B3n-de-intestino-delgado.jpg?s=2048x2048&w=is&k=20&c=i172otnZoBgfuY9Pdpl5R7KMteyFxhWzVnvzsgUW3LU="
            alt=""
          />

          {/* https://media.istockphoto.com/id/519085852/es/foto/3-d-ilustraci%C3%B3n-de-intestino-delgado.jpg?s=2048x2048&w=is&k=20&c=i172otnZoBgfuY9Pdpl5R7KMteyFxhWzVnvzsgUW3LU= */}
          <div className="p-5">
            <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 text-ellipsis overflow-hidden line-clamp-2 min-h-14">
              {/* dark:text-white */}
              {titulo}
            </h5>

            <p className="p-car-text mb-3 font-normal text-gray-700  dark:text-gray-400 text-ellipsis overflow-hidden line-clamp-3 min-h-[72px]">
              {descripcion}
            </p>
            <div>
              <div className="mb-2 flex flex-row flex-wrap gap-2 py-1 overflow-hidden">
                <Chip tag={'Preoperatorio'} />
                <Chip tag={'Corazon'} />
                <Chip tag={'Pulmon'} />
              </div>

              <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-asiseg-blue rounded-lg opacity-65 hover:opacity-100 transition-opacity ">
                {/* dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 */}
                Ver más
                <SeeMoreIcon />
              </div>
            </div>
          </div>
        </div>
      </button>

      <Dialog
        id="cardModal"
        header="Header"
        visible={visible}
        className="w-4/6"
        onHide={() => setVisible(false)}
      >
        <p className="mb-5 text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p className="mb-5 text-justify">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt ut labore et dolore magnam
          aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
          ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
          ea voluptate velit esse quam nihil molestiae consequatur, vel illum
          qui dolorem eum fugiat quo voluptas nulla pariatur?
        </p>
        <p className="mb-5 text-justify">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui
          blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
          et quas molestias excepturi sint occaecati cupiditate non provident,
          similique sunt in culpa qui officia deserunt mollitia animi, id est
          laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
          distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
          cumque nihil impedit quo minus id quod maxime placeat facere possimus,
          omnis voluptas assumenda est, omnis dolor repellendus. Temporibus
          autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe
          eveniet ut et voluptates repudiandae sint et molestiae non recusandae.
          Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
          voluptatibus maiores alias consequatur aut perferendis doloribus
          asperiores repellat.
        </p>
        <p className="mb-5 text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p className="mb-5 text-justify">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt ut labore et dolore magnam
          aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
          ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
          ea voluptate velit esse quam nihil molestiae consequatur, vel illum
          qui dolorem eum fugiat quo voluptas nulla pariatur?
        </p>
        <p className="mb-5 text-justify">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui
          blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
          et quas molestias excepturi sint occaecati cupiditate non provident,
          similique sunt in culpa qui officia deserunt mollitia animi, id est
          laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
          distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
          cumque nihil impedit quo minus id quod maxime placeat facere possimus,
          omnis voluptas assumenda est, omnis dolor repellendus. Temporibus
          autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe
          eveniet ut et voluptates repudiandae sint et molestiae non recusandae.
          Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
          voluptatibus maiores alias consequatur aut perferendis doloribus
          asperiores repellat.
        </p>
      </Dialog>
    </>
  )
}
