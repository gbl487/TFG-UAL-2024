import { Routes, Route } from 'react-router-dom'
import HomePage from './HomePage.jsx'
import MisDatos from './UserPanel/MisDatos.jsx'
import AdminContent from './UserPanel/AdminContent.jsx'
import ProtectedPanel from './core/ProtectedPanel.jsx'
import CrearTarjeta from './CrearTarjeta.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/misdatos"
        element={
          <ProtectedPanel>
            <MisDatos />
          </ProtectedPanel>
        }
      />
      <Route
        path="/citas"
        element={
          <ProtectedPanel>
            <div className="pl-64">Hola</div>
          </ProtectedPanel>
        }
      />
      <Route
        path="/contenido"
        element={
          <ProtectedPanel>
            <AdminContent />
          </ProtectedPanel>
        }
      />
      <Route
        path="/contenido/crear"
        element={
          <ProtectedPanel>
            <CrearTarjeta />
          </ProtectedPanel>
        }
      />
    </Routes>
  )
}
