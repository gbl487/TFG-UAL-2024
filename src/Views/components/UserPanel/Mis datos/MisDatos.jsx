import { useAuth } from 'src/Controllers/context/userContext'
import PanelHeader from '../PanelHeader'
// import { getNIFUsuario } from 'src/Model/Usuario'

export default function MisDatos() {
  const { usuario } = useAuth()
  const nif = usuario?.email.replace('@asiseg.com', '').toUpperCase()
  return (
    <>
      <div className="h-screen flex flex-col">
        {/* Header */}
        <PanelHeader />
        <div className="w-full h-full mt-28">
          Mis datos:
          <p>DNI/NIE: {nif}</p>
        </div>
      </div>
    </>
  )
}
