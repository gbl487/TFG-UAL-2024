export default function ChatEnd({ username, fechaMensaje, contenido }) {
  return (
    <div className="flex justify-end">
      <div className="chat chat-end w-full">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
        </div>
        <div className="chat-header">
          {username}
          <time className="text-xs opacity-50">{fechaMensaje}</time>
        </div>
        <div className="chat-bubble bg-asiseg-blue/80">{contenido}</div>
        {/* Poner check de enviado */}
        <div className="chat-footer opacity-50">Seen at 12:46</div>
      </div>
    </div>
  )
}
