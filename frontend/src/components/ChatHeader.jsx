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

        {/* ← Back arrow — mobile only */}
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
            className='size-9 sm:size-10 rounded-full object-cover'
          />
          {/* 
            FIX: use ring instead of border so the dot is always visible
            regardless of the background color behind it 
          */}
          {isOnline && (
            <span className='absolute bottom-0 right-0 size-3 rounded-full
              bg-success ring-2 ring-base-200' />
          )}
        </div>

        {/* Name + status text */}
        <div className='min-w-0'>
          <h3 className='text-sm font-bold text-base-content truncate tracking-tight'>
            {selectedUser.fullName}
          </h3>
          {/* FIX: always render status line, color changes based on isOnline */}
          <div className='flex items-center gap-1 mt-0.5'>
            <p className={`text-xs font-medium
              ${isOnline ? 'text-success' : 'text-base-content text-opacity-25'}`}>
              {isOnline ? 'Online' : 'Last seen recently'}
            </p>
          </div>
        </div>
      </div>

      {/* ✕ Close — desktop only */}
      <button
        onClick={() => setSelectedUser(null)}
        className='icon-btn hidden lg:flex'
        aria-label='Close chat'
      >
        <X className='size-4' strokeWidth={2} />
      </button>
    </div>
  )
}

export default ChatHeader