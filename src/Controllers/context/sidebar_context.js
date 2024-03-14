import { atom } from 'nanostores'

export const sidebar = atom(false)

export const setSidebar = ({ value }) => {
  sidebar.set(value)
}
