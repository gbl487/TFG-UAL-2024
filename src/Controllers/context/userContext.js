import { atom } from 'nanostores'
// import { Usuario } from '../../Model/Usuario'
// import { auth } from '../../Model/Firebase'

export const user = atom(null)

// export const FirebaseUser = atom(new Usuario({ authState: auth }))

export const setUser = ({ value }) => {
  user.set(value)
}
