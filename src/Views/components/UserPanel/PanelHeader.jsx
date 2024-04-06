import SideUserPanel from './SideUserPanel'
import UserHeader from './Header/UserHeader'

export default function PanelHeader() {
  return (
    <header className="h-20 w-full top-0 fixed z-10">
      <div className="flex flex-1 flex-row">
        <div className="fixed z-10">
          <SideUserPanel />
        </div>
        <UserHeader />
      </div>
    </header>
  )
}
