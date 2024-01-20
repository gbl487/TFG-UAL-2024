import { Dialog } from 'primereact/dialog'
import { useStore } from '@nanostores/react'
import { registerModal } from 'src/Controllers/context/registerContext'
export function RegisterModal() {
  const $registerModal = useStore(registerModal)

  const setVisible = () => {
    registerModal.set(false)
  }
  return (
    <Dialog
      header="Header"
      visible={$registerModal}
      className="w-4/6"
      onHide={() => {
        setVisible()
      }}
    >
      <p className="mb-5 text-justify">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </Dialog>
  )
}
