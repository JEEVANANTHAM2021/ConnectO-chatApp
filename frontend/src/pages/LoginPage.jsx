import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from 'lucide-react';
import AuthImagePattern from '../components/AuthImagePattern';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  }

  return (
    <div className='min-h-screen grid lg:grid-cols-2 bg-base-200'>

      {/* ── Left ── */}
      <div className='flex flex-col justify-center items-center p-6 sm:p-12 bg-base-100'>
        <div className='w-full max-w-sm space-y-8'>

          {/* Logo + heading */}
          <div className='space-y-5'>
            <div className='size-10 rounded-lg bg-base-content flex items-center justify-center'>
              <MessageSquare className='size-5 text-base-100' strokeWidth={2.5} />
            </div>
            <div className='space-y-1'>
              <h1 className='text-2xl font-bold tracking-tight'>Sign in</h1>
              <p className='text-sm text-base-content text-opacity-25'>
                New here?{' '}
                <Link to='/signup' className='text-base-content font-semibold underline underline-offset-2
                  decoration-base-content decoration-opacity-25 hover:decoration-base-content transition-all'>
                  Create an account
                </Link>
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-4'>

            {/* Email */}
            <div className='form-control gap-1.5'>
              <label className='label py-0'>
                <span className='e-label'>Email address</span>
              </label>
              <div className='relative'>
                <Mail className='absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-base-content text-opacity-30'
                  strokeWidth={1.8} />
                <input type='email' className='e-input pl-10'
                  placeholder='you@example.com'
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            {/* Password */}
            <div className='form-control gap-1.5'>
              <label className='label py-0'>
                <span className='e-label'>Password</span>
              </label>
              <div className='relative'>
                <Lock className='absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-base-content text-opacity-30'
                  strokeWidth={1.8} />
                <input type={showPassword ? "text" : "password"} className='e-input pl-10 pr-11'
                  placeholder='••••••••'
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button type='button' onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md
                    text-base-content text-opacity-30 hover:text-base-content hover:text-opacity-60 transition-colors'>
                  {showPassword ? <EyeOff className='size-4' strokeWidth={1.8} />
                    : <Eye className='size-4' strokeWidth={1.8} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button type='submit' disabled={isLoggingIn} className='e-btn-primary w-full mt-2'>
              {isLoggingIn ? <><Loader2 className='size-4 animate-spin' />Signing in...</> : 'Sign in'}
            </button>
          </form>

          {/* Divider */}
          <div className='flex items-center gap-3'>
            <div className='flex-1 h-px bg-base-content bg-opacity-10' />
            <span className='text-xs text-base-content text-opacity-30 font-medium'>or</span>
            <div className='flex-1 h-px bg-base-content bg-opacity-10' />
          </div>

          <p className='text-xs text-base-content text-opacity-35 text-center leading-relaxed'>
            By signing in, you agree to our{' '}
            <span className='underline decoration-base-content decoration-opacity-25 underline-offset-2 cursor-pointer'>
              Terms of Service
            </span>{' '}and{' '}
            <span className='underline decoration-base-content decoration-opacity-25 underline-offset-2 cursor-pointer'>
              Privacy Policy
            </span>.
          </p>
        </div>
      </div>

      {/* ── Right ── */}
      <AuthImagePattern title="Join Our Community"
        subtitle='Connect with friends, share moments, and stay in touch with you' />
    </div>
  )
}

export default LoginPage