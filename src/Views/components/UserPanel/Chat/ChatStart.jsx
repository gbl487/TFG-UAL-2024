export default function ChatStart({ username, fechaMensaje, contenido }) {
  return (
    <div className="flex justify-start">
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
        </div>
        <div className="chat-header flex flex-row w-full">
          <p className="flex justify-start">{username}</p>
          <time className="text-xs opacity-50 flex justify-end">
            {fechaMensaje}
          </time>
        </div>
        <div className="chat-bubble bg-asiseg-gray/80">{contenido}</div>
      </div>
    </div>
  )
}
