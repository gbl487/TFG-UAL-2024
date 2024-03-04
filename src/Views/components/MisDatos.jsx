import { useAuth } from 'src/Controllers/context/userContext'

export default function Misdatos() {
  const { usuario } = useAuth()
  return (
    <div className="p-4 sm:ml-64 w-auto h-full">
      Mis datos:
      <p>Número de teléfono: {usuario.phoneNumber}</p>
    </div>
  )
}
