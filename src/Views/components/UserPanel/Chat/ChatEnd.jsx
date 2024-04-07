import { CheckIcon } from '@icons/Icons'

export default function ChatEnd({ username, fechaMensaje, contenido }) {
  return (
    <div className="flex justify-end">
      <div className="chat chat-end w-full">
        <div className="chat-header flex w-auto flex-row items-center gap-x-5">
          <p className="mr-2">{username}</p>
        </div>
        <div className="chat-bubble bg-asiseg-blue/70 flex flex-col pb-1">
          <p>{contenido}</p>
          <time className="chat chat-footer text-xs text-gray-800 flex justify-end">
            {fechaMensaje}
          </time>
        </div>
        <div className="chat-footer opacity-50">
          <CheckIcon />
        </div>
      </div>
    </div>
  )
}
