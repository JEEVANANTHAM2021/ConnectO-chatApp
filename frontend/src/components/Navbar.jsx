import { useState, useRef, useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'
import { LogOut, MessageSquare, Menu, Settings, User, X } from 'lucide-react'

const Navbar = () => {
  const { logout, authUser } = useAuthStore()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  // Close when clicking outside the dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className='fixed w-full top-0 z-40 bg-primary shadow-md'>
      <div className='container mx-auto px-4 h-14 max-w-6xl flex items-center justify-between'>

        {/* Brand */}
        <Link to='/' className='flex items-center gap-2.5 hover:opacity-80 transition-opacity'>
          <div className='size-8 rounded-full bg-primary-content/20 flex items-center justify-center'>
            <MessageSquare className='size-4 text-primary-content' strokeWidth={2.5} />
          </div>
          <span className='font-bold text-primary-content text-base tracking-tight'>
            LocalGossip
          </span>
        </Link>

        {/* ── Desktop nav (sm and above) ── */}
        <div className='hidden sm:flex items-center'>
          <Link to='/settings'
            className='flex items-center gap-1.5 h-9 px-3 rounded-lg text-sm font-medium
              text-primary-content/70 hover:text-primary-content hover:bg-primary-content/10
              transition-all duration-150'>
            <Settings className='size-4' strokeWidth={2} />
            <span>Settings</span>
          </Link>

          {authUser && (
            <>
              <Link to='/profile'
                className='flex items-center gap-1.5 h-9 px-3 rounded-lg text-sm font-medium
                  text-primary-content/70 hover:text-primary-content hover:bg-primary-content/10
                  transition-all duration-150'>
                <User className='size-4' strokeWidth={2} />
                <span>Profile</span>
              </Link>

              <button onClick={logout}
                className='flex items-center gap-1.5 h-9 px-3 rounded-lg text-sm font-medium
                  text-primary-content/70 hover:text-primary-content hover:bg-primary-content/10
                  transition-all duration-150'>
                <LogOut className='size-4' strokeWidth={2} />
                <span>Logout</span>
              </button>
            </>
          )}
        </div>

        {/* ── Mobile hamburger (below sm) ── */}
        <div className='sm:hidden relative' ref={menuRef}>

          {/* Toggle button */}
          <button
            onClick={() => setMenuOpen(prev => !prev)}
            className='size-9 rounded-lg flex items-center justify-center
              text-primary-content/80 hover:text-primary-content
              hover:bg-primary-content/10 transition-all duration-150'
            aria-label='Open menu'
          >
            {menuOpen
              ? <X className='size-5' strokeWidth={2.5} />
              : <Menu className='size-5' strokeWidth={2.5} />
            }
          </button>

          {/* Dropdown */}
          {menuOpen && (
            <div className='absolute right-0 top-[calc(100%+8px)] w-52
              bg-base-100 rounded-2xl shadow-2xl border border-base-200
              overflow-hidden z-50'>

              {/* User info header — shown only when logged in */}
              {authUser && (
                <div className='flex items-center gap-3 px-4 py-3 border-b border-base-200
                  bg-base-200/50'>
                  <img
                    src={authUser.profilePic || '/avatar.png'}
                    alt={authUser.fullName}
                    className='size-8 rounded-full object-cover shrink-0'
                  />
                  <div className='min-w-0'>
                    <p className='text-sm font-semibold text-base-content truncate'>
                      {authUser.fullName}
                    </p>
                    <p className='text-xs text-base-content/40 truncate'>{authUser.email}</p>
                  </div>
                </div>
              )}

              {/* Settings */}
              <Link to='/settings' onClick={closeMenu}
                className='flex items-center gap-3 px-4 py-3 text-sm font-medium
                  text-base-content/70 hover:text-base-content hover:bg-base-200
                  transition-colors duration-100 border-b border-base-200'>
                <div className='size-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0'>
                  <Settings className='size-3.5 text-primary' strokeWidth={2} />
                </div>
                Settings
              </Link>

              {/* Profile */}
              {authUser && (
                <Link to='/profile' onClick={closeMenu}
                  className='flex items-center gap-3 px-4 py-3 text-sm font-medium
                    text-base-content/70 hover:text-base-content hover:bg-base-200
                    transition-colors duration-100 border-b border-base-200'>
                  <div className='size-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0'>
                    <User className='size-3.5 text-primary' strokeWidth={2} />
                  </div>
                  Profile
                </Link>
              )}

              {/* Logout */}
              {authUser && (
                <button
                  onClick={() => { logout(); closeMenu() }}
                  className='w-full flex items-center gap-3 px-4 py-3 text-sm font-medium
                    text-error/80 hover:text-error hover:bg-error/8
                    transition-colors duration-100'>
                  <div className='size-7 rounded-lg bg-error/10 flex items-center justify-center shrink-0'>
                    <LogOut className='size-3.5 text-error' strokeWidth={2} />
                  </div>
                  Logout
                </button>
              )}
            </div>
          )}
        </div>

      </div>
    </header>
  )
}

export default Navbar