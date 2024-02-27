import { AddContentButton } from './Buttons/AddContentButton'
import InfoCard from './InfoCard'
import { useAuth } from 'src/Controllers/context/userContext'

export default function AdminContent() {
  const { usuario } = useAuth()
  return (
    <>
      {usuario && (
        <>
          <div className="p-4 md:ml-64 w-auto h-full flex flex-col">
            <div className="flex justify-center my-5">
              <AddContentButton />
            </div>
            <section className="grid grid-cols-1 lg+:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5 gap-5">
              <InfoCard
                titulo="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac dui et mauris tincidunt fermentum. Quisque vestibulum quam id turpis facilisis, in ullamcorper nulla ullamcorper."
                descripcion="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac dui et mauris tincidunt fermentum. Quisque vestibulum quam id turpis facilisis, in ullamcorper nulla ullamcorper. Nulla facilisi. Sed feugiat augue eget fermentum aliquam. Integer bibendum auctor ex, vel euismod purus. Sed tristique ligula nec ligula blandit, sit amet aliquam elit laoreet."
              />
              <InfoCard
                titulo="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac dui et mauris tincidunt fermentum. Quisque vestibulum quam id turpis facilisis, in ullamcorper nulla ullamcorper."
                descripcion="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac dui et mauris tincidunt fermentum. Quisque vestibulum quam id turpis facilisis, in ullamcorper nulla ullamcorper. Nulla facilisi. Sed feugiat augue eget fermentum aliquam. Integer bibendum auctor ex, vel euismod purus. Sed tristique ligula nec ligula blandit, sit amet aliquam elit laoreet."
              />
              <InfoCard
                titulo="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac dui et mauris tincidunt fermentum. Quisque vestibulum quam id turpis facilisis, in ullamcorper nulla ullamcorper."
                descripcion="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac dui et mauris tincidunt fermentum. Quisque vestibulum quam id turpis facilisis, in ullamcorper nulla ullamcorper. Nulla facilisi. Sed feugiat augue eget fermentum aliquam. Integer bibendum auctor ex, vel euismod purus. Sed tristique ligula nec ligula blandit, sit amet aliquam elit laoreet."
              />
              <InfoCard
                titulo="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac dui et mauris tincidunt fermentum. Quisque vestibulum quam id turpis facilisis, in ullamcorper nulla ullamcorper."
                descripcion="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac dui et mauris tincidunt fermentum. Quisque vestibulum quam id turpis facilisis, in ullamcorper nulla ullamcorper. Nulla facilisi. Sed feugiat augue eget fermentum aliquam. Integer bibendum auctor ex, vel euismod purus. Sed tristique ligula nec ligula blandit, sit amet aliquam elit laoreet."
              />

              <InfoCard
                titulo="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac dui et mauris tincidunt fermentum. Quisque vestibulum quam id turpis facilisis, in ullamcorper nulla ullamcorper."
                descripcion="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac dui et mauris tincidunt fermentum. Quisque vestibulum quam id turpis facilisis, in ullamcorper nulla ullamcorper. Nulla facilisi. Sed feugiat augue eget fermentum aliquam. Integer bibendum auctor ex, vel euismod purus. Sed tristique ligula nec ligula blandit, sit amet aliquam elit laoreet."
              />
              <InfoCard
                titulo="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac dui et mauris tincidunt fermentum. Quisque vestibulum quam id turpis facilisis, in ullamcorper nulla ullamcorper."
                descripcion="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac dui et mauris tincidunt fermentum. Quisque vestibulum quam id turpis facilisis, in ullamcorper nulla ullamcorper. Nulla facilisi. Sed feugiat augue eget fermentum aliquam. Integer bibendum auctor ex, vel euismod purus. Sed tristique ligula nec ligula blandit, sit amet aliquam elit laoreet."
              />
              <InfoCard
                titulo="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac dui et mauris tincidunt fermentum. Quisque vestibulum quam id turpis facilisis, in ullamcorper nulla ullamcorper."
                descripcion="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac dui et mauris tincidunt fermentum. Quisque vestibulum quam id turpis facilisis, in ullamcorper nulla ullamcorper. Nulla facilisi. Sed feugiat augue eget fermentum aliquam. Integer bibendum auctor ex, vel euismod purus. Sed tristique ligula nec ligula blandit, sit amet aliquam elit laoreet."
              />
              <InfoCard
                titulo="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac dui et mauris tincidunt fermentum. Quisque vestibulum quam id turpis facilisis, in ullamcorper nulla ullamcorper."
                descripcion="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac dui et mauris tincidunt fermentum. Quisque vestibulum quam id turpis facilisis, in ullamcorper nulla ullamcorper. Nulla facilisi. Sed feugiat augue eget fermentum aliquam. Integer bibendum auctor ex, vel euismod purus. Sed tristique ligula nec ligula blandit, sit amet aliquam elit laoreet."
              />
              <InfoCard
                titulo="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac dui et mauris tincidunt fermentum. Quisque vestibulum quam id turpis facilisis, in ullamcorper nulla ullamcorper."
                descripcion="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac dui et mauris tincidunt fermentum. Quisque vestibulum quam id turpis facilisis, in ullamcorper nulla ullamcorper. Nulla facilisi. Sed feugiat augue eget fermentum aliquam. Integer bibendum auctor ex, vel euismod purus. Sed tristique ligula nec ligula blandit, sit amet aliquam elit laoreet."
              />
            </section>
          </div>
        </>
      )}
    </>
  )
}
