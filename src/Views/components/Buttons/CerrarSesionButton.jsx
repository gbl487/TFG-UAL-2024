import { SignOutIcon } from '@Icons/Icons'
import { userSignOut } from 'src/Controllers/utils/Usuario'
export function CerrarSesionButton() {
  return (
    <li>
      <button
        onClick={userSignOut()}
        className="flex items-center p-2 rounded-lg hover:bg-gray-100 group cursor-pointer"
      >
        <SignOutIcon />
        <span className="ms-3">Cerrar sesión</span>
      </button>
    </li>
  )
}
