export function AsisegButton({ text, tipo }) {
  return (
    <div
      className={`btn ${
        tipo === 'ERROR' ? 'btn-error' : 'btn-primary'
      } text-white opacity-65 transition-opacity p-2 rounded-md mb-4`}
    >
      {text}
    </div>
  )
}
