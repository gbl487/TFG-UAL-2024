import ChatEnd from './ChatEnd'
import ChatStart from './ChatStart'

export default function Chat() {
  return (
    <div className="flex justify-center">
      <div className="p-4 md:ml-64 mt-10 md:mt-0 h-screen w-[1000px] bg-gray-200">
        <ChatStart
          username={'Gabu'}
          fechaMensaje={'20/03/24 12:45'}
          contenido={' You were the Chosen One!'}
        />

        <ChatEnd
          username={'Gabu'}
          fechaMensaje={'20/03/24 12:45'}
          contenido={' You were the Chosen One!'}
        />
      </div>
    </div>
  )
}
