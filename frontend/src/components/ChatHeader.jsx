import { useChatStore } from "../store/useChatStore"
import { useAuthStore } from '../store/useAuthStore'
import { X } from 'lucide-react'

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className='px-4 sm:px-5 py-3.5 border-b border-base-content border-opacity-10 flex items-center justify-between shrink-0'>

      <div className='flex items-center gap-3 min-w-0'>
        {/* Avatar */}
        <div className='relative shrink-0'>
          <img src={selectedUser.profilePic || "avatar.png"} alt={selectedUser.fullName}
            className='size-9 rounded-full object-cover ring-2 ring-base-content ring-opacity-10' />
          {isOnline && <span className='online-dot absolute -bottom-px -right-px' />}
        </div>

        {/* Info */}
        <div className='min-w-0'>
          <h3 className='text-sm font-semibold text-base-content tracking-tight truncate'>
            {selectedUser.fullName}
          </h3>
          <p className={`text-xs font-medium mt-0.5
            ${isOnline ? 'text-emerald-500' : 'text-base-content text-opacity-30'}`}>
            {isOnline ? 'Active now' : 'Offline'}
          </p>
        </div>
      </div>

      {/* Close */}
      <button onClick={() => setSelectedUser(null)}
        className='size-8 rounded-lg flex items-center justify-center shrink-0
          text-base-content text-opacity-35 hover:text-base-content hover:text-opacity-70 hover:bg-base-content hover:bg-opacity-10
          transition-all duration-150'>
        <X className='size-4' strokeWidth={2} />
      </button>
    </div>
  )
}

export default ChatHeader