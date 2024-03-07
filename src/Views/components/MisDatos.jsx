import { useAuth } from 'src/Controllers/context/userContext'

export default function Misdatos() {
  const { usuario } = useAuth()
  const nif = usuario.email.replace('@asiseg.com', '').toUpperCase()
  console.log(usuario)
  return (
    <div className="p-4 sm:ml-64 w-auto h-full">
      Mis datos:
      <p>DNI/NIE: {nif}</p>
    </div>
  )
}
