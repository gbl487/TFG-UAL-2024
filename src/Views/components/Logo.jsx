export default function Logo() {
  return (
    <div className="flex justify-start sm:justify-center ml-5">
      <a href="/">
        <picture>
          <img
            alt="logo"
            src="/Logo.svg"
            className="min-w-40 w-40 sm:w-48 lg:w-60 "
          />
        </picture>
      </a>
    </div>
  )
}
