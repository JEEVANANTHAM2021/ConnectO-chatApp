import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import AuthImagePattern from '../components/AuthImagePattern'
import toast from 'react-hot-toast'

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' })
  const { signup, isSigningUp } = useAuthStore()

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error('Full name is required')
    if (!formData.email.trim()) return toast.error('Email is required')
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error('Invalid email format')
    if (!formData.password) return toast.error('Password is required')
    if (formData.password.length < 8) return toast.error('Password must be at least 8 characters')
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const success = validateForm()
    if (success === true) signup(formData)
  }

  return (
    <div className='min-h-screen grid lg:grid-cols-2 bg-base-100'>

      {/* ── Form side ── */}
      <div className='flex flex-col justify-center items-center p-6 sm:p-10'>
        <div className='w-full max-w-sm space-y-7'>

          {/* Logo */}
          <div className='text-center space-y-3'>
            <div className='size-16 rounded-full bg-primary mx-auto
              flex items-center justify-center shadow-lg shadow-primary/25'>
              <MessageSquare className='size-8 text-primary-content' strokeWidth={2} />
            </div>
            <div>
              <h1 className='text-2xl font-bold tracking-tight text-base-content'>
                Create Account
              </h1>
              <p className='text-sm text-base-content/45 mt-1'>Join LocalGossip for free</p>
            </div>
          </div>

          <div className='h-px bg-base-200' />

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-4'>

            {/* Full Name */}
            <div className='space-y-1.5'>
              <label className='section-label'>Full name</label>
              <div className='relative'>
                <User className='absolute left-3.5 top-1/2 -translate-y-1/2 size-4
                  text-base-content/30 pointer-events-none' strokeWidth={1.8} />
                <input type='text' className='auth-input pl-10'
                  placeholder='Jeeva'
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            {/* Email */}
            <div className='space-y-1.5'>
              <label className='section-label'>Email address</label>
              <div className='relative'>
                <Mail className='absolute left-3.5 top-1/2 -translate-y-1/2 size-4
                  text-base-content/30 pointer-events-none' strokeWidth={1.8} />
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
                  text-base-content/30 pointer-events-none' strokeWidth={1.8} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className='auth-input pl-10 pr-11'
                  placeholder='Min. 8 characters'
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

            <button type='submit' disabled={isSigningUp} className='auth-btn mt-2'>
              {isSigningUp
                ? <><Loader2 className='size-4 animate-spin' /> Creating account...</>
                : 'Create Account'}
            </button>
          </form>

          {/* Footer */}
          <p className='text-center text-sm text-base-content/45'>
            Already have an account?{' '}
            <Link to='/login' className='font-semibold text-primary hover:underline underline-offset-2'>
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* ── Pattern side ── */}
      <AuthImagePattern
        title='Join our community!'
        subtitle='Connect with friends, share moments, and stay in touch.'
      />
    </div>
  )
}

export default SignUpPage