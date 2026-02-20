import React, { useEffect, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import SidebarSkeleton from './skeletons/SidebarSkeleton';
import { Users } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => { getUsers() }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter(user => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className='h-full w-16 lg:w-64 shrink-0 flex flex-col border-r border-base-content border-opacity-10'>

      {/* Header */}
      <div className='px-3 lg:px-4 py-4 border-b border-base-content border-opacity-10'>
        <div className='flex items-center gap-2.5'>
          <div className='size-7 rounded-md bg-base-content bg-opacity-10 flex items-center justify-center shrink-0'>
            <Users className='size-3.5 text-base-content text-opacity-50' strokeWidth={2} />
          </div>
          <span className='hidden lg:block text-sm font-semibold tracking-tight'>Messages</span>
        </div>

        {/* Online filter */}
        <div className='hidden lg:flex items-center justify-between mt-3.5'>
          <label className='flex items-center gap-2 cursor-pointer group'>
            <div className='relative'>
              <input type="toggle" checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className='sr-only peer'
              />
              <div className='w-8 h-4 rounded-full bg-base-content bg-opacity-15 peer-checked:bg-base-content peer-checked:bg-opacity-10
                transition-colors duration-200 cursor-pointer'
                onClick={() => setShowOnlineOnly(!showOnlineOnly)}
              />
              <div className={`absolute top-0.5 size-3 rounded-full bg-base-100 shadow transition-all duration-200
                ${showOnlineOnly ? 'left-[18px]' : 'left-0.5'}`}
                onClick={() => setShowOnlineOnly(!showOnlineOnly)}
              />
            </div>
            <span className='text-xs text-base-content text-opacity-40 group-hover:text-base-content group-hover:text-opacity-60 transition-colors'>
              Online only
            </span>
          </label>
          <span className='text-[10px] font-semibold px-1.5 py-0.5 rounded-md
            bg-base-content bg-opacity-10 text-base-content text-opacity-40'>
            {onlineUsers.length - 1}
          </span>
        </div>
      </div>

      {/* List */}
      <div className='flex-1 overflow-y-auto py-2 px-2'>
        {filteredUsers.map((user) => {
          const isActive = selectedUser?._id === user._id;
          const isOnline = onlineUsers.includes(user._id);
          return (
            <button key={user._id} onClick={() => setSelectedUser(user)}
              className={`sidebar-row w-full ${isActive ? 'active' : ''}`}>

              {/* Avatar */}
              <div className='relative mx-auto lg:mx-0 shrink-0'>
                <img src={user.profilePic || "avatar.png"} alt={user.name}
                  className={`size-9 rounded-full object-cover ring-2 transition-all
                    ${isActive ? 'ring-base-content/25' : 'ring-transparent'}`}
                />
                {isOnline && (
                  <span className='online-dot absolute bottom-0 right-0' />
                )}
              </div>

              {/* Info */}
              <div className='hidden lg:flex flex-col min-w-0 flex-1'>
                <span className={`text-sm font-medium truncate leading-tight
                  ${isActive ? 'text-base-content' : 'text-base-content text-opacity-75'}`}>
                  {user.fullName}
                </span>
                <span className={`text-xs mt-0.5 font-medium
                  ${isOnline ? 'text-emerald-500' : 'text-base-content text-opacity-30'}`}>
                  {isOnline ? 'Active now' : 'Offline'}
                </span>
              </div>
            </button>
          );
        })}

        {filteredUsers.length === 0 && (
          <p className='text-center text-xs text-base-content text-opacity-30 py-10 px-4'>
            No users online
          </p>
        )}
      </div>
    </aside>
  )
}

export default Sidebar