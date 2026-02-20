import { useChatStore } from '../store/useChatStore'
import Sidebar from '../components/Sidebar'
import NoChatSelected from '../components/NoChatSelected'
import ChatContainer from '../components/ChatContainer'

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className='min-h-screen bg-base-200 pt-14'>
      <div className='flex justify-center items-start p-2 sm:p-4 min-h-[calc(100vh-3.5rem)]'>
        <div className='w-full max-w-7xl h-[calc(100vh-4.5rem)] sm:h-[calc(100vh-5rem)]
          bg-base-100 border border-base-content border-opacity-10 rounded-2xl shadow-sm overflow-hidden flex'>
          <Sidebar />
          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
      </div>
    </div>
  )
}

export default HomePage