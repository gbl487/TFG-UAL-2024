import {
  CalendarIcon,
  ChatIcon,
  EditIcon,
  SignOutIcon,
  UserIcon,
} from '@icons/Icons'
import { useAuth } from 'src/Controllers/context/userContext'
import { Link } from 'react-router-dom'
import { setSidebar } from 'src/Controllers/context/sidebar_context'
export function PanelContent() {
  const { cerrarSesion } = useAuth()
  const handleLogout = () => {
    cerrarSesion()
  }
  return (
    <div className="h-full px-3 overflow-y-auto ">
      <ul className="space-y-2 font-medium text-black">
        <li>
          <Link to="/misdatos" onClick={() => setSidebar({ value: false })}>
            <div className="flex items-center p-2 0 rounded-lg hover:bg-gray-200 group cursor-pointer">
              <UserIcon />
              <span className="ms-3">Mis datos</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/citas" onClick={() => setSidebar({ value: false })}>
            <div className="flex items-center p-2  rounded-lg hover:bg-gray-200 group cursor-pointer">
              <CalendarIcon />
              <span className="ms-3">Administrar citas</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/contenido" onClick={() => setSidebar({ value: false })}>
            <div className="flex items-center p-2  rounded-lg hover:bg-gray-200 group cursor-pointer">
              <EditIcon />
              <span className="ms-3">Administrar contenido</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/chat" onClick={() => setSidebar({ value: false })}>
            <div className="flex items-center p-2  rounded-lg hover:bg-gray-200 group cursor-pointer">
              <ChatIcon />
              <span className="ms-3">Chat</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/claves" onClick={() => setSidebar({ value: false })}>
            <div className="flex items-center p-2 0 rounded-lg hover:bg-gray-200 group cursor-pointer">
              <UserIcon />
              <span className="ms-3">Claves de registro</span>
            </div>
          </Link>
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
