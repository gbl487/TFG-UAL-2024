import {
  CalendarIcon,
  ChatIcon,
  EditIcon,
  SignOutIcon,
  UserIcon,
} from '@icons/Icons'
import { useAuth } from 'src/Controllers/context/userContext'

export function PanelContent() {
  const { cerrarSesion } = useAuth()
  const handleLogout = () => {
    cerrarSesion()
  }
  return (
    <div className="h-full px-3 overflow-y-auto ">
      <ul className="space-y-2 font-medium text-black">
        <li>
          <a href="/misdatos">
            <div className="flex items-center p-2 0 rounded-lg hover:bg-gray-200 group cursor-pointer">
              <UserIcon />
              <span className="ms-3">Mis datos</span>
            </div>
          </a>
        </li>
        <li>
          <a href="/administrarcitas">
            <div className="flex items-center p-2  rounded-lg hover:bg-gray-200 group cursor-pointer">
              <CalendarIcon />
              <span className="ms-3">Administrar citas</span>
            </div>
          </a>
        </li>
        <li>
          <a href="/administrarcontenido">
            <div className="flex items-center p-2  rounded-lg hover:bg-gray-200 group cursor-pointer">
              <EditIcon />
              <span className="ms-3">Administrar contenido</span>
            </div>
          </a>
        </li>
        <li>
          <div className="flex items-center p-2  rounded-lg hover:bg-gray-200 group cursor-pointer">
            <ChatIcon />
            <span className="ms-3">Chat</span>
          </div>
        </li>
        <li onClick={handleLogout}>
          <div className="flex items-center p-2  rounded-lg hover:bg-gray-200 group cursor-pointer">
            <SignOutIcon />
            <span className="ms-3">Cerrar sesión</span>
          </div>
        </li>
      </ul>
    </div>
  )
}
