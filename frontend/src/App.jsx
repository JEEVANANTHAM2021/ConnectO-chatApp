import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from "./components/Navbar"
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import Login from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'
import {Toaster} from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore'
import IntroPage from './pages/IntroPage'



const App = () => {
    const {authUser, checkAuth, isCheckingAuth, onlineUsers} = useAuthStore();

    console.log(onlineUsers);
    
    const { theme } = useThemeStore();

    useEffect(() => {
      checkAuth()
    }, [checkAuth]);

    console.log({authUser});

    if(isCheckingAuth && !authUser) return (

      <div className='flex items-center justify-center h-screen'>
        <Loader className= 'size-10 animate-spin' />
      </div>
    )
    

  return (
    <div data-theme={theme}>
      {authUser && <Navbar />}

      <Routes>
        {/* Intro Page */}
        <Route path="/" element={!authUser ? <IntroPage /> : <Navigate to="/chat" />} />

        {/* Auth Pages */}
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/chat" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/chat" />} />

        {/* Protected Chat */}
        <Route path="/chat" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/settings" element={authUser ? <SettingsPage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App
