export default function AsisegLoader({ showLogo }) {
  return (
    <>
      <div className="flex flex-col justify-center ">
        {showLogo && (
          <img src="/asiseg_logo.svg" className="h-12 mb-1" alt="Asiseg Logo" />
        )}
        <span className="self-center loading loading-dots loading-lg text-primary"></span>
      </div>
    </>
  )
}
