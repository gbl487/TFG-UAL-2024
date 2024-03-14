import { useAuth } from 'src/Controllers/context/userContext'

export default function MisDatos() {
  const { usuario } = useAuth()
  const nif = usuario?.email.replace('@asiseg.com', '').toUpperCase()
  return (
    <>
      <div className="p-4 md:ml-64 w-auto h-full">
        Mis datos:
        <p>DNI/NIE: {nif}</p>
      </div>
    </>
  )
}
