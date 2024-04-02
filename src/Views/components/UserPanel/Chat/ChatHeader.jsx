import SideUserPanel from '../SideUserPanel'
import UserHeader from '../UserHeader'

export default function ChatHeader() {
  return (
    <div className="flex flex-1 flex-row">
      <SideUserPanel />
      <UserHeader />
    </div>
  )
}
