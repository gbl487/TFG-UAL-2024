import { Routes, Route } from 'react-router-dom'
import HomePage from './Home/HomePage.jsx'
import MisDatos from './UserPanel/MisDatos.jsx'
import AdminContent from './UserPanel/Contenido/AdminContent.jsx'
import CrearTarjeta from './UserPanel/Contenido/CrearTarjeta.jsx'
import ProtectedRoute from './core/ProtectedRoute.jsx'
import UserPanel from './UserPanel/UserPanel.jsx'
import KeyGenerator from './UserPanel/KeyGenerator.jsx'
import MisCitas from './UserPanel/Citas/MisCitas.jsx'
import ModificarTarjeta from './UserPanel/Contenido/ModificarTarjeta.jsx'
import Modificar from 'src/pages/contenido/modificar.astro'
import Chat from './UserPanel/Chat/Chat.jsx'
import UserHeader from './UserPanel/UserHeader.jsx'

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
              <UserHeader />
              <MisDatos />
            </>
          }
        />
        <Route
          path="/citas"
          element={
            <>
              <UserPanel />
              <UserHeader />
              <MisCitas />
            </>
          }
        />
        <Route
          path="/contenido"
          element={
            <>
              <UserPanel />
              <UserHeader />
              <AdminContent />
            </>
          }
        />
        <Route
          path="/contenido/crear"
          element={
            <>
              <UserPanel />
              <UserHeader />
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
              <UserPanel />
              <UserHeader />
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
              <UserPanel />
              <UserHeader />
              <KeyGenerator />
            </>
          }
        />
      </Route>
    </Routes>
  )
}
