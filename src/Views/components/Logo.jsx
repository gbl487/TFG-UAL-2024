export default function Logo() {
  return (
    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
      <img
        src="/favicon_asiseg.svg"
        className="h-14 ml-5 my-2"
        alt="Asiseg Logo"
      />
      <span className="self-center text-2xl font-semibold whitespace-nowrap text-asiseg-blue">
        ASISEG
      </span>
    </a>
  )
}
