import EditorReact from '@components/Editor'
import { useAuth } from 'src/Controllers/context/userContext'
// import { getNIFUsuario } from 'src/Model/Usuario'

export default function MisDatos() {
  const { usuario } = useAuth()
  const nif = usuario?.email.replace('@asiseg.com', '').toUpperCase()
  // const nif = await getNIFUsuario({uid: usuario?.uid})
  return (
    <>
      <div className="p-4 md:ml-64 w-auto h-full">
        Mis datos:
        <p>DNI/NIE: {nif}</p>
        <EditorReact
          texto={
            '<div>Hello World!</div><div>PrimeReact <b>Editor</b> Rocks</div><div><br></div>'
          }
        ></EditorReact>
      </div>
    </>
  )
}
