import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import { ArrowLeft, X } from 'lucide-react'

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore()
  const { onlineUsers } = useAuthStore()
  const isOnline = onlineUsers.includes(selectedUser._id)

  return (
    <div className='flex items-center justify-between px-3 sm:px-4 py-3
      bg-base-200 bg-opacity-70 border-b border-base-200 shrink-0'>

      <div className='flex items-center gap-2 sm:gap-3 min-w-0'>

        {/* ← Back arrow — mobile only, goes back to contact list */}
        <button
          onClick={() => setSelectedUser(null)}
          className='lg:hidden icon-btn shrink-0 -ml-1'
          aria-label='Back to contacts'
        >
          <ArrowLeft className='size-5 text-base-content text-opacity-60' strokeWidth={2.5} />
        </button>

        {/* Avatar + online dot */}
        <div className='relative shrink-0'>
          <img
            src={selectedUser.profilePic || 'avatar.png'}
            alt={selectedUser.fullName}
            className='size-16 sm:size-12 rounded-full object-cover'
          />
          {isOnline && (
            <span className='absolute bottom-0 right-0 size-2.5 rounded-full
              bg-success border-2 border-base-200' />
          )}
        </div>

        {/* Name + status */}
        <div className='min-w-0'>
          <h3 className='text-md sm:text-lg font-bold text-base-content truncate tracking-tight'>
            {selectedUser.fullName}
          </h3>
          <p className={`text-xs font-medium mt-0.5
            ${isOnline ? 'text-success' : 'text-base-content text-opacity-35'}`}>
            {isOnline ? 'Online' : 'Last seen recently'}
          </p>
        </div>
      </div>

      {/* ✕ Close — desktop only */}
      <button
        onClick={() => setSelectedUser(null)}
        className='icon-btn hidden lg:flex'
        aria-label='Close chat'
      >
        <X className='size-5' strokeWidth={2} />
      </button>
    </div>
  )
}

export default ChatHeader