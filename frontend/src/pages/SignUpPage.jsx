import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';
import toast from 'react-hot-toast';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if(!formData.fullName.trim()) return toast.error("Full name is required");
    if(!formData.email.trim()) return toast.error("Email is required");
    if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if(!formData.password) return toast.error("Password is required");
    if(formData.password.length < 8) return toast.error("Password must be at least 8 characters");
    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if(success === true) signup(formData);
  };

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
              <h1 className='text-2xl font-bold tracking-tight'>Create account</h1>
              <p className='text-sm text-base-content text-opacity-45'>
                Already have one?{' '}
                <Link to='/login' className='text-base-content font-semibold underline underline-offset-2
                  decoration-base-content decoration-opacity-30 hover:decoration-base-content transition-all'>
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-4'>

            {/* Full Name */}
            <div className='form-control gap-1.5'>
              <label className='label py-0'>
                <span className='e-label'>Full name</span>
              </label>
              <div className='relative'>
                <User className='absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-base-content text-opacity-30'
                  strokeWidth={1.8} />
                <input type='text' className='e-input pl-10' placeholder='Jeeva'
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
            </div>

            {/* Email */}
            <div className='form-control gap-1.5'>
              <label className='label py-0'>
                <span className='e-label'>Email address</span>
              </label>
              <div className='relative'>
                <Mail className='absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-base-content text-opacity-30'
                  strokeWidth={1.8} />
                <input type='email' className='e-input pl-10' placeholder='you@example.com'
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
                  placeholder='Min. 8 characters'
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md
                    text-base-content text-opacity-30 hover:text-base-content hover:text-opacity-25 transition-colors'>
                  {showPassword ? <EyeOff className='size-4' strokeWidth={1.8} />
                    : <Eye className='size-4' strokeWidth={1.8} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button type='submit' disabled={isSigningUp} className='e-btn-primary w-full mt-2'>
              {isSigningUp ? <><Loader2 className='size-4 animate-spin' />Creating account...</> : 'Create account'}
            </button>
          </form>

          <p className='text-xs text-base-content/35 text-center leading-relaxed'>
            By creating an account, you agree to our{' '}
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

export default SignUpPage