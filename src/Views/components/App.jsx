import { Routes, Route } from 'react-router-dom'
import HomePage from './Home/HomePage.jsx'
import MisDatos from './UserPanel/Mis datos/MisDatos.jsx'
import AdminContent from './UserPanel/Contenido/AdminContent.jsx'
import CrearTarjeta from './UserPanel/Contenido/CrearTarjeta.jsx'
import ProtectedRoute from './core/ProtectedRoute.jsx'
import UserPanel from './UserPanel/UserPanel.jsx'
import KeyGenerator from './UserPanel/KeyGenerator.jsx'
import MisCitas from './UserPanel/Citas/MisCitas.jsx'
import ModificarTarjeta from './UserPanel/Contenido/ModificarTarjeta.jsx'
import Modificar from 'src/pages/contenido/modificar.astro'
import Chat from './UserPanel/Chat/Chat.jsx'
import UserHeader from './UserPanel/Header/UserHeader.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<ProtectedRoute />}>
        <Route
          path="/misdatos"
          element={
            <>
              <MisDatos />
            </>
          }
        />
        <Route
          path="/citas"
          element={
            <>
              <MisCitas />
            </>
          }
        />
        <Route
          path="/contenido"
          element={
            <>
              <AdminContent />
            </>
          }
        />
        <Route
          path="/contenido/crear"
          element={
            <>
              <CrearTarjeta />
            </>
          }
        />
        <Route
          path="/contenido/modificar"
          element={
            <>
              <UserPanel />
              <UserHeader />
              <Modificar />
            </>
          }
        />
        <Route
          path="/contenido/modificar/:id"
          element={
            <>
              <ModificarTarjeta />
            </>
          }
        />
        <Route
          path="/chat"
          element={
            <>
              <Chat />
            </>
          }
        />
        <Route
          path="/claves"
          element={
            <>
              <KeyGenerator />
            </>
          }
        />
      </Route>
    </Routes>
  )
}
