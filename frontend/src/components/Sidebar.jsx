import { useEffect, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import SidebarSkeleton from './skeletons/SidebarSkeleton'
import { Search, Users, X } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore()
  const { onlineUsers } = useAuthStore()
  const [showOnlineOnly, setShowOnlineOnly] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  useEffect(() => { getUsers() }, [getUsers])

  const filteredUsers = users
    .filter(user => showOnlineOnly ? onlineUsers.includes(user._id) : true)
    .filter(user =>
      searchQuery.trim() === ''
        ? true
        : user.fullName.toLowerCase().includes(searchQuery.trim().toLowerCase())
    )

  const clearSearch = () => setSearchQuery('')

  if (isUsersLoading) return <SidebarSkeleton />

  return (
    <aside className='h-full w-full lg:w-80 lg:shrink-0 flex flex-col bg-base-100 lg:border-r lg:border-base-200'>

      {/* ── Header ── */}
      <div className='bg-base-200 bg-opacity-70 border-b border-base-200 shrink-0'>

        {/* Title row */}
        <div className='flex items-center justify-between px-4 py-3'>
          <div className='flex items-center gap-2.5'>
            <div className='size-8 rounded-full bg-primary bg-opacity-15 flex items-center justify-center shrink-0'>
              <Users className='size-4 text-primary' strokeWidth={2} />
            </div>
            <span className='font-bold text-sm text-base-content tracking-tight'>Chats</span>
          </div>

          {/* Online toggle */}
          <label className='flex items-center gap-2 cursor-pointer'>
            <input
              type='checkbox'
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className='toggle toggle-primary toggle-xs'
            />
            <span className='text-xs text-base-content text-opacity-50 font-medium'>Online</span>
          </label>
        </div>

        {/* Search bar */}
        <div className='px-3 pb-3'>
          <div className={`flex items-center gap-2 h-9 px-3 rounded-full bg-base-100 border
            transition-all duration-150
            ${isSearchFocused ? 'border-primary border-opacity-50 shadow-sm shadow-primary/10' : 'border-base-300'}`}>
            <Search
              className={`size-3.5 shrink-0 transition-colors
                ${isSearchFocused ? 'text-primary' : 'text-base-content text-opacity-30'}`}
              strokeWidth={2}
            />
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder='Search contacts...'
              className='flex-1 text-sm bg-transparent outline-none
                text-base-content placeholder:text-base-content placeholder:text-opacity-30'
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className='size-4 rounded-full bg-base-content/20 flex items-center justify-center
                  hover:bg-base-content/30 transition-colors shrink-0'
              >
                <X className='size-2.5 text-base-content text-opacity-60' strokeWidth={3} />
              </button>
            )}
          </div>
        </div>

        {/* Online count + result count */}
        <div className='flex items-center justify-between px-4 pb-2.5'>
          <div className='flex items-center gap-1.5'>
            {/* FIX: explicit green color so it always shows */}
            <span className='size-1.5 rounded-full bg-success inline-block' />
            <span className='text-[11px] text-base-content/40 font-medium'>
              {onlineUsers.length - 1} online
            </span>
          </div>
          {searchQuery.trim() && (
            <span className='text-[11px] text-base-content text-opacity-40 font-medium'>
              {filteredUsers.length} result{filteredUsers.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>

      {/* ── Contact list ── */}
      <div className='flex-1 overflow-y-auto'>
        {filteredUsers.map((user) => {
          const isActive = selectedUser?._id === user._id
          const isOnline = onlineUsers.includes(user._id)

          return (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full flex items-center gap-3 px-4 py-3
                border-b border-base-200/70 transition-colors duration-100 text-left
                ${isActive
                  ? 'bg-primary bg-opacity-10 border-l-2 border-l-primary'
                  : 'hover:bg-base-200 hover:bg-opacity-20 active:bg-base-200 border-l-2 border-l-transparent'
                }`}
            >
              {/* Avatar + green dot */}
              <div className='relative shrink-0'>
                <img
                  src={user.profilePic || 'avatar.png'}
                  alt={user.fullName}
                  className='size-12 rounded-full object-cover'
                />
                {/*
                  FIX: ring-2 ring-base-100 instead of border-2 border-base-100
                  ring is drawn outside the element so it always contrasts
                  regardless of whatever bg color is behind the dot
                */}
                {isOnline && (
                  <span className='absolute bottom-0.5 right-0.5 size-3.5 rounded-full
                    bg-success ring-2 ring-base-100' />
                )}
              </div>

              {/* Info */}
              <div className='flex flex-col flex-1 min-w-0'>
                <div className='flex items-center justify-between gap-2'>
                  <span className={`text-sm font-semibold truncate
                    ${isActive ? 'text-primary' : 'text-base-content'}`}>
                    {searchQuery.trim()
                      ? highlightMatch(user.fullName, searchQuery)
                      : user.fullName}
                  </span>
                  {/* Online badge pill */}
                  {isOnline && (
                    <span className='text-[10px] font-bold text-success bg-success bg-opacity-10
                      border border-success border-opacity-20 px-1.5 py-0.5 rounded-full shrink-0'>
                      online
                    </span>
                  )}
                </div>
                {/* FIX: always show status line with dot indicator */}
                <div className='flex items-center gap-1 mt-0.5'>
                  <span className={`size-1.5 rounded-full shrink-0
                    ${isOnline ? 'bg-success' : 'bg-base-content bg-opacity-20'}`}
                  />
                  <span className={`text-xs font-medium truncate
                    ${isOnline ? 'text-success' : 'text-base-content text-opacity-40'}`}>
                    {isOnline ? 'Tap to chat' : 'Last seen recently'}
                  </span>
                </div>
              </div>

              {/* Chevron — mobile tap hint */}
              <svg className='size-4 text-base-content text-opacity-20 shrink-0 lg:hidden'
                fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
              </svg>
            </button>
          )
        })}

        {/* Empty state */}
        {filteredUsers.length === 0 && (
          <div className='flex flex-col items-center justify-center py-20 gap-3 px-6'>
            <div className='size-16 rounded-full bg-base-200 flex items-center justify-center'>
              {searchQuery
                ? <Search className='size-6 text-base-content text-opacity-25' strokeWidth={1.5} />
                : <Users className='size-6 text-base-content text-opacity-25' strokeWidth={1.5} />
              }
            </div>
            <div className='text-center space-y-1'>
              <p className='text-sm text-base-content text-opacity-40 font-medium'>
                {searchQuery ? 'No contacts found' : 'No users online'}
              </p>
              <p className='text-xs text-base-content text-opacity-30'>
                {searchQuery ? `No results for "${searchQuery}"` : 'Check back later'}
              </p>
            </div>
            {searchQuery && (
              <button
                onClick={clearSearch}
                className='text-sm text-primary font-semibold hover:underline underline-offset-2 mt-1'>
                Clear search
              </button>
            )}
          </div>
        )}
      </div>
    </aside>
  )
}

// Highlights matched portion of a name
function highlightMatch(name, query) {
  const index = name.toLowerCase().indexOf(query.trim().toLowerCase())
  if (index === -1) return name
  return (
    <>
      {name.slice(0, index)}
      <mark className='bg-primary bg-opacity-20 text-primary rounded-sm px-0.5 not-italic'>
        {name.slice(index, index + query.trim().length)}
      </mark>
      {name.slice(index + query.trim().length)}
    </>
  )
}

export default Sidebar