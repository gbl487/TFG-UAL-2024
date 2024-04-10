import { atom } from 'nanostores'
import { auth } from '../../Model/Firebase'
import { useEffect } from 'react'
import {
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { useStore } from '@nanostores/react'
import {
  crearUsuario,
  getRol,
  registrarUsuarioFirebase,
} from 'src/Model/Usuario'

// export const FirebaseUser = atom(new Usuario({ authState: auth }))
export const usuarioAtom = atom()

export const rolAtom = atom()

export const useAuth = () => {
  // Usar useStore para acceder al estado y acciones relacionadas con la autenticación
  const usuario = useStore(usuarioAtom)

  const rolUsuario = useStore(rolAtom)

  const setUser = ({ value }) => {
    usuarioAtom.set(value)
  }

  const setRol = ({ value }) => {
    rolAtom.set(value)
  }

  const registrarUsuario = async (username, password, remember) => {
    let email = username + '@asiseg.com'

    let result
    const { uid_usuario, usuarioValido, errorUsuario } =
      await registrarUsuarioFirebase({
        email: email,
        password: password,
        remember: remember,
      })
    if (usuarioValido) {
      const { result } = await crearUsuario({
        uid: uid_usuario,
        username: username,
        remember,
      })
      return { result }
    } else {
      result = errorUsuario
    }
    return { result }
  }

  const iniciarSesion = async (email, password, remember) => {
    let errorUsuario = ''
    let usuarioValido = false
    remember
      ? await setPersistence(auth, browserLocalPersistence)
      : await setPersistence(auth, browserSessionPersistence)
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        usuarioValido = true
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-login-credentials')
          errorUsuario = 'INVALID_CREDENTIAL'
        if (error.code === 'auth/too-many-requests')
          errorUsuario = 'TOO_MANY_REQUESTS'
        usuarioValido = false
      })
    return { usuarioValido, errorUsuario }
  }

  const cerrarSesion = async () => {
    try {
      await auth.signOut()
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
      throw error
    }
  }

  // async function registrarUsuario({ confirmation, otp, dni_nie }) {
  //   let error
  //   let usuario
  //   await confirmOtp({
  //     confirmation,
  //     otp,
  //   }).then((result) => {
  //     // Se ha creado correctamente el usuario
  //     if (result.errorResult.code === 'auth/invalid-verification-code') {
  //       error = 'INVALID_CODE'
  //     }
  //     console.log(result)
  //     usuario = result.usuario
  //   })
  //   return { usuario, dni_nie, error }
  // }

  // async function confirmOtp({ confirmation, otp }) {
  //   let usuario
  //   let errorResult

  //   try {
  //     await confirmation
  //       .confirm(otp)
  //       .then((result) => {
  //         // setUser({ value: result.user })
  //         console.log(result)
  //       })
  //       .catch((error) => (errorResult = error))
  //   } catch (error) {
  //     errorResult = error
  //   }
  //   return { usuario, errorResult }
  // }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        // El usuario está autenticado
        setUser({ value: authUser })
        const rol = await getRol({ id: authUser.uid })
        setRol({ value: rol })
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
    rolUsuario,
    registrarUsuario,
    // confirmOtp,
    iniciarSesion,
    cerrarSesion,
  }
}
