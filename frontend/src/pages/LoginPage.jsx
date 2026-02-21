import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from 'lucide-react'
import AuthImagePattern from '../components/AuthImagePattern'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const { login, isLoggingIn } = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    login(formData)
  }

  return (
    <div className='min-h-screen grid lg:grid-cols-2 bg-base-100'>

      {/* ── Form side ── */}
      <div className='flex flex-col justify-center items-center p-6 sm:p-10'>
        <div className='w-full max-w-sm space-y-7'>

          {/* Logo */}
          <div className='text-center space-y-3'>
            <div className='size-16 rounded-full bg-primary mx-auto
              flex items-center justify-center shadow-lg shadow-primary/15'>
              <MessageSquare className='size-8 text-primary-content' strokeWidth={2} />
            </div>
            <div>
              <h1 className='text-2xl font-bold tracking-tight text-base-content'>
                LocalGossip
              </h1>
              <p className='text-sm text-base-content text-opacity-45 mt-1'>Sign in to your account</p>
            </div>
          </div>

          {/* Divider */}
          <div className='h-px bg-base-200' />

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-4'>

            {/* Email */}
            <div className='space-y-1.5'>
              <label className='section-label'>Email address</label>
              <div className='relative'>
                <Mail className='absolute left-3.5 top-1/2 -translate-y-1/2 size-4
                  text-base-content text-opacity-30 pointer-events-none' strokeWidth={1.8} />
                <input type='email' className='auth-input pl-10'
                  placeholder='you@example.com'
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password */}
            <div className='space-y-1.5'>
              <label className='section-label'>Password</label>
              <div className='relative'>
                <Lock className='absolute left-3.5 top-1/2 -translate-y-1/2 size-4
                  text-base-content text-opacity-30 pointer-events-none' strokeWidth={1.8} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className='auth-input pl-10 pr-11'
                  placeholder='••••••••'
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button type='button' onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 icon-btn size-7'>
                  {showPassword
                    ? <EyeOff className='size-4' strokeWidth={1.8} />
                    : <Eye className='size-4' strokeWidth={1.8} />}
                </button>
              </div>
            </div>

            <button type='submit' disabled={isLoggingIn} className='auth-btn mt-2'>
              {isLoggingIn
                ? <><Loader2 className='size-4 animate-spin' /> Signing in...</>
                : 'Sign in'}
            </button>
          </form>

          {/* Footer */}
          <p className='text-center text-sm text-base-content text-opacity-45'>
            Don't have an account?{' '}
            <Link to='/signup' className='font-semibold text-primary hover:underline underline-offset-2'>
              Create account
            </Link>
          </p>
        </div>
      </div>

      {/* ── Pattern side ── */}
      <AuthImagePattern
        title='Welcome back!'
        subtitle='Sign in to catch up with your chats and stay connected with friends.'
      />
    </div>
  )
}

export default LoginPage