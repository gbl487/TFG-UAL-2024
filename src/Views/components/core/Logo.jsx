import { Link } from 'react-router-dom'
import { setSidebar } from 'src/Controllers/context/sidebar_context'

export default function Logo() {
  return (
    <Link
      to="/"
      onClick={() => setSidebar({ value: false })}
      className="flex items-center space-x-3 rtl:space-x-reverse"
    >
      <img
        src="/asiseg_logo.svg"
        className="h-14 ml-5 my-2"
        alt="Asiseg Logo"
      />
      <span className="self-center text-2xl font-semibold whitespace-nowrap text-asiseg-blue">
        ASISEG
      </span>
    </Link>
  )
}
