import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Camera, Mail, User } from 'lucide-react'

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore()
  const [selectedImg, setSelectedImg] = useState(null)

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = async () => {
      const base64Image = reader.result
      setSelectedImg(base64Image)
      await updateProfile({ profilePic: base64Image })
    }
  }

  return (
    <div className='min-h-screen bg-base-200 pt-14'>
      <div className='max-w-lg mx-auto px-4 py-6 sm:py-10 space-y-3'>

        {/* Page heading */}
        <div className='px-1 mb-2'>
          <h1 className='text-lg font-bold text-base-content'>Profile</h1>
          <p className='text-sm text-base-content text-opacity-40 mt-0.5'>Your personal information</p>
        </div>

        {/* Avatar card — WA banner style */}
        <div className='bg-base-100 rounded-2xl border border-base-200 overflow-hidden shadow-sm'>
          {/* Green banner */}
          <div className='h-20 bg-gradient-to-r from-primary/80 to-primary/60' />

          <div className='px-5 sm:px-6 pb-6'>
            {/* Avatar overlapping banner */}
            <div className='-mt-10 mb-4 flex items-end justify-between'>
              <div className='relative'>
                <img
                  src={selectedImg || authUser.profilePic || '/avatar.png'}
                  alt='profile'
                  className='size-20 rounded-full object-cover border-4 border-base-100 shadow-md'
                />
                <label
                  htmlFor='avatar-upload'
                  className={`absolute bottom-0.5 right-0.5 size-7 rounded-full
                    flex items-center justify-center border-2 border-base-100
                    shadow cursor-pointer transition-all duration-150
                    ${isUpdatingProfile
                      ? 'bg-base-300 cursor-not-allowed animate-pulse'
                      : 'bg-primary hover:opacity-85 active:scale-95'
                    }`}
                >
                  <Camera className='size-3.5 text-primary-content' strokeWidth={2} />
                  <input
                    type='file'
                    id='avatar-upload'
                    className='hidden'
                    accept='image/*'
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>

              {/* Active badge */}
              <div className='mb-1 flex items-center gap-1.5 px-3 py-1.5 rounded-full
                bg-success bg-opacity-25 border border-success border-opacity-25'>
                <span className='size-1.5 rounded-full bg-success animate-pulse' />
                <span className='text-xs font-semibold text-success'>Active</span>
              </div>
            </div>

            <h2 className='text-lg font-bold text-base-content'>{authUser?.fullName}</h2>
            <p className='text-sm text-base-content text-opacity-45 mt-0.5'>{authUser?.email}</p>
            <p className={`text-xs mt-2.5 flex items-center gap-1.5
              ${isUpdatingProfile ? 'text-primary' : 'text-base-content text-opacity-30'}`}>
              {isUpdatingProfile
                ? <><span className='loading loading-dots loading-xs' /> Uploading photo...</>
                : 'Tap the camera icon to change your photo'}
            </p>
          </div>
        </div>

        {/* Info card */}
        <div className='bg-base-100 rounded-2xl border border-base-200 overflow-hidden shadow-sm'>
          <div className='px-5 py-3 border-b border-base-200'>
            <span className='section-label'>Personal info</span>
          </div>

          <div className='info-row'>
            <div className='size-9 rounded-full bg-primary bg-opacity-10 flex items-center justify-center shrink-0'>
              <User className='size-4 text-primary' strokeWidth={1.8} />
            </div>
            <div className='flex-1 min-w-0'>
              <p className='section-label mb-0.5'>Full name</p>
              <p className='text-sm font-semibold text-base-content truncate'>
                {authUser?.fullName}
              </p>
            </div>
          </div>

          <div className='info-row'>
            <div className='size-9 rounded-full bg-primary bg-opacity-10 flex items-center justify-center shrink-0'>
              <Mail className='size-4 text-primary' strokeWidth={1.8} />
            </div>
            <div className='flex-1 min-w-0'>
              <p className='section-label mb-0.5'>Email address</p>
              <p className='text-sm font-semibold text-base-content truncate'>
                {authUser?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Account card */}
        <div className='bg-base-100 rounded-2xl border border-base-200 overflow-hidden shadow-sm'>
          <div className='px-5 py-3 border-b border-base-200'>
            <span className='section-label'>Account</span>
          </div>
          <div className='flex items-center justify-between px-5 py-4 border-b border-base-200'>
            <span className='text-sm text-base-content text-opacity-55'>Member since</span>
            <span className='text-sm font-bold text-base-content'>
              {authUser.createdAt?.split('T')[0]}
            </span>
          </div>
          <div className='flex items-center justify-between px-5 py-4'>
            <span className='text-sm text-base-content text-opacity-55'>Account status</span>
            <span className='flex items-center gap-1.5 text-xs font-bold text-success'>
              <span className='size-2 rounded-full bg-success animate-pulse' />
              Active
            </span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ProfilePage