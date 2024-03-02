import { atom } from 'nanostores'
import { auth } from '../../Model/Firebase'
import { useEffect } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { useStore } from '@nanostores/react'

// export const FirebaseUser = atom(new Usuario({ authState: auth }))
export const usuarioAtom = atom()

export const useAuth = () => {
  // Usar useStore para acceder al estado y acciones relacionadas con la autenticación
  const usuario = useStore(usuarioAtom)

  const setUser = ({ value }) => {
    usuarioAtom.set(value)
  }

  const crearUsuario = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const newUser = userCredential.user
      setUser({ value: newUser })
      return newUser
    } catch (error) {
      console.error('Error al crear usuario:', error)
      throw error
    }
  }

  const iniciarSesion = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      const signedInUser = userCredential.user
      setUser({ value: signedInUser })
      return signedInUser
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
      throw error
    }
  }

  const cerrarSesion = async () => {
    try {
      await auth.signOut()
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
      throw error
    }
  }

  async function registrarUsuario({ confirmation, otp, dni_nie }) {
    let error
    let usuario
    await confirmOtp({
      confirmation,
      otp,
    }).then((result) => {
      // Se ha creado correctamente el usuario
      if (result.errorResult.code === 'auth/invalid-verification-code') {
        error = 'INVALID_CODE'
      }
      console.log(result)
      usuario = result.usuario
    })
    return { usuario, dni_nie, error }
  }

  async function confirmOtp({ confirmation, otp }) {
    let usuario
    let errorResult

    try {
      await confirmation
        .confirm(otp)
        .then((result) => {
          // setUser({ value: result.user })
          console.log(result)
        })
        .catch((error) => (errorResult = error))
    } catch (error) {
      errorResult = error
    }
    return { usuario, errorResult }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // El usuario está autenticado
        setUser({ value: authUser })
      } else {
        // El usuario no está autenticado
        setUser({ value: null })
      }
    })
    // Cleanup function
    return () => {
      unsubscribe()
    }
  }, [])

  return {
    usuario,
    crearUsuario,
    registrarUsuario,
    confirmOtp,
    iniciarSesion,
    cerrarSesion,
  }
}
