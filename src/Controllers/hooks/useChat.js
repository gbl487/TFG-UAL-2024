import { collection, orderBy, query, where } from 'firebase/firestore'
import { db } from 'src/Model/Firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
export function useChat({ id }) {
  const q =
    id &&
    query(
      collection(db, 'Chats'),
      where('idPaciente', '==', id),
      orderBy('fechaCreacion', 'asc') // Ensure proper ordering here
    )
  console.log(q)
  console.log(id)
  const [chats, loading, error] = useCollectionData(q, { idField: 'id' })
  return { chats, loading, error }
}
