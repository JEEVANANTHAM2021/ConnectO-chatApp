import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom';
import { LogOut, MessageSquare, Settings, User } from 'lucide-react';

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  return (
    <header className='fixed w-full top-0 z-40 bg-base-100 bg-opacity-90 backdrop-blur-xl border-b border-base-content border-opacity-10'>
      <div className='container mx-auto px-4 sm:px-6 h-14 max-w-7xl flex items-center justify-between'>

        {/* Brand */}
        <Link to='/' className='flex items-center gap-2.5 group'>
          <div className='size-8 rounded-lg bg-base-content flex items-center justify-center
            group-hover:opacity-80 transition-opacity'>
            <MessageSquare className='size-4 text-base-100' strokeWidth={2.5} />
          </div>
          <span className='font-semibold text-sm tracking-tight hidden sm:block'>
            LocalGossip
          </span>
        </Link>

        {/* Actions */}
        <nav className='flex items-center gap-0.5'>
          <Link to='/settings' className='e-btn-ghost rounded-lg'>
            <Settings className='size-3.5' strokeWidth={2} />
            <span className='hidden sm:inline'>Settings</span>
          </Link>

          {authUser && (
            <>
              <Link to='/profile' className='e-btn-ghost rounded-lg'>
                <User className='size-3.5' strokeWidth={2} />
                <span className='hidden sm:inline'>Profile</span>
              </Link>

              <button onClick={logout}
                className='e-btn-ghost rounded-lg hover:text-red-500 hover:bg-red-500 hover:bg-opacity-10'>
                <LogOut className='size-3.5' strokeWidth={2} />
                <span className='hidden sm:inline'>Logout</span>
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar