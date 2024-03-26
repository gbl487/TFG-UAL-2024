import { Routes, Route } from 'react-router-dom'
import HomePage from './Home/HomePage.jsx'
import MisDatos from './UserPanel/MisDatos.jsx'
import AdminContent from './UserPanel/AdminContent.jsx'
import CrearTarjeta from './UserPanel/CrearTarjeta.jsx'
import ProtectedRoute from './core/ProtectedRoute.jsx'
import UserPanel from './UserPanel/UserPanel.jsx'
import KeyGenerator from './UserPanel/KeyGenerator.jsx'
import MisCitas from './UserPanel/MisCitas/MisCitas.jsx'
import ModificarTarjeta from './UserPanel/ModificarTarjeta.jsx'
import Modificar from 'src/pages/contenido/modificar.astro'

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
              <MisCitas />
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
          path="/contenido/modificar"
          element={
            <>
              <UserPanel />
              <Modificar />
            </>
          }
        />
        <Route
          path="/contenido/modificar/:id"
          element={
            <>
              <UserPanel />
              <ModificarTarjeta />
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
