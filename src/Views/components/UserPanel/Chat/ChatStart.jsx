export default function ChatStart({ username, fechaMensaje, contenido }) {
  return (
    <div className="flex justify-start">
      <div className="chat chat-start">
        {/* <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
        </div> */}
        <div className="chat-header ml-1">{username}</div>
        <div className="chat-bubble bg-asiseg-gray/50 flex flex-col pb-1">
          <p>{contenido}</p>
          <time className="chat chat-footer text-xs text-gray-800 flex justify-end">
            {fechaMensaje}
          </time>
        </div>
      </div>
    </div>
  )
}
