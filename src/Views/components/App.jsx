import { Routes, Route } from 'react-router-dom'
import HomePage from './HomePage.jsx'
import MisDatos from './UserPanel/MisDatos.jsx'
import AdminContent from './UserPanel/AdminContent.jsx'
import CrearTarjeta from './UserPanel/CrearTarjeta.jsx'
import ProtectedRoute from './core/ProtectedRoute.jsx'
import UserPanel from './UserPanel/UserPanel.jsx'
import KeyGenerator from './UserPanel/KeyGenerator.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<ProtectedRoute />}>
        <Route
          path="/misdatos"
          element={
            <>
              <UserPanel />
              <MisDatos />
            </>
          }
        />
        <Route
          path="/citas"
          element={
            <>
              <UserPanel />
              <div>Mis citas</div>
            </>
          }
        />
        <Route
          path="/contenido"
          element={
            <>
              <UserPanel />
              <AdminContent />
            </>
          }
        />
        <Route
          path="/contenido/crear"
          element={
            <>
              <UserPanel />
              <CrearTarjeta />
            </>
          }
        />
        <Route
          path="/claves"
          element={
            <>
              <UserPanel />
              <KeyGenerator />
            </>
          }
        />
      </Route>
    </Routes>
  )
}
