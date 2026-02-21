import { useChatStore } from '../store/useChatStore'
import Sidebar from '../components/Sidebar'
import NoChatSelected from '../components/NoChatSelected'
import ChatContainer from '../components/ChatContainer'

const HomePage = () => {
  const { selectedUser } = useChatStore()

  return (
    <div className='min-h-screen bg-base-300 pt-14'>

      {/* ── Mobile layout: full screen, show ONE panel at a time ── */}
      <div className='flex h-[calc(100vh-3.5rem)] lg:hidden overflow-hidden bg-base-100'>
        {/* Sidebar fills screen when no chat selected */}
        <div className={`w-full h-full flex-col
          ${selectedUser ? 'hidden' : 'flex'}`}>
          <Sidebar />
        </div>

        {/* Chat fills screen when contact selected */}
        <div className={`w-full h-full flex-col
          ${selectedUser ? 'flex' : 'hidden'}`}>
          <ChatContainer />
        </div>
      </div>

      {/* ── Desktop layout: side by side ── */}
      <div className='hidden lg:flex justify-center items-start
        p-3 min-h-[calc(100vh-3.5rem)]'>
        <div className='w-full max-w-6xl h-[calc(100vh-5rem)]
          flex overflow-hidden rounded-xl shadow-2xl border border-base-300'>
          <Sidebar />
          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
      </div>

    </div>
  )
}

export default HomePage