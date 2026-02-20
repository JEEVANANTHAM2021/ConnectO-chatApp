import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Camera, Mail, User } from 'lucide-react';

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className='min-h-screen bg-base-200 pt-14'>
      <div className='max-w-xl mx-auto px-4 py-8 sm:py-12 space-y-4'>

        {/* Page heading */}
        <div className='mb-6 px-1'>
          <h1 className='text-xl font-bold tracking-tight'>Profile</h1>
          <p className='text-sm text-base-content text-opacity-45 mt-0.5'>Manage your account details</p>
        </div>

        {/* Avatar card */}
        <div className='e-card p-6 sm:p-7'>
          <div className='flex flex-col sm:flex-row items-center sm:items-start gap-5'>

            {/* Avatar */}
            <div className='relative shrink-0'>
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt='profile'
                className='size-20 sm:size-24 rounded-2xl object-cover
                  ring-2 ring-base-content ring-opacity-10 shadow-sm'
              />
              <label htmlFor='avatar-upload'
                className={`absolute -bottom-2 -right-2 size-8 rounded-lg flex items-center justify-center
                  border-2 border-base-100 shadow-md cursor-pointer transition-all duration-200
                  ${isUpdatingProfile
                    ? 'bg-base-content bg-opacity-40 cursor-not-allowed animate-pulse'
                    : 'bg-base-content hover:opacity-80'
                  }`}>
                <Camera className='size-3.5 text-base-100' strokeWidth={2} />
                <input type='file' id='avatar-upload' className='hidden'
                  accept='image/*' onChange={handleImageUpload} disabled={isUpdatingProfile}
                />
              </label>
            </div>

            {/* Info */}
            <div className='flex-1 text-center sm:text-left'>
              <h2 className='text-lg font-semibold tracking-tight'>{authUser?.fullName}</h2>
              <p className='text-sm text-base-content text-opacity-30 mt-0.5'>{authUser?.email}</p>
              <p className={`text-xs font-medium mt-3 flex items-center justify-center sm:justify-start gap-1.5
                ${isUpdatingProfile ? 'text-base-content text-opacity-50' : 'text-base-content text-opacity-30'}`}>
                {isUpdatingProfile
                  ? <><span className='loading loading-dots loading-xs' /> Uploading photo...</>
                  : 'Click the camera icon to update your photo'}
              </p>
            </div>
          </div>
        </div>

        {/* Details card */}
        <div className='e-card overflow-hidden'>
          <div className='px-6 py-4 border-b border-base-content border-opacity-10'>
            <h3 className='e-label'>Account details</h3>
          </div>

          <div className='divide-y divide-base-content divide-opacity-10'>
            {/* Full Name */}
            <div className='px-6 py-4 flex items-center gap-3'>
              <div className='size-8 rounded-lg bg-base-content bg-opacity-10 flex items-center justify-center shrink-0'>
                <User className='size-3.5 text-base-content text-opacity-40' strokeWidth={1.8} />
              </div>
              <div className='flex-1 min-w-0'>
                <p className='e-label'>Full name</p>
                <p className='text-sm font-medium text-base-content mt-0.5 truncate'>
                  {authUser?.fullName}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className='px-6 py-4 flex items-center gap-3'>
              <div className='size-8 rounded-lg bg-base-content bg-opacity-10 flex items-center justify-center shrink-0'>
                <Mail className='size-3.5 text-base-content text-opacity-40' strokeWidth={1.8} />
              </div>
              <div className='flex-1 min-w-0'>
                <p className='e-label'>Email address</p>
                <p className='text-sm font-medium text-base-content mt-0.5 truncate'>
                  {authUser?.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Account info card */}
        <div className='e-card overflow-hidden'>
          <div className='px-6 py-4 border-b border-base-content border-opacity-10'>
            <h3 className='e-label'>Account information</h3>
          </div>
          <div className='divide-y divide-base-content divide-opacity-10'>
            <div className='px-6 py-4 flex items-center justify-between'>
              <span className='text-sm text-base-content text-opacity-50'>Member since</span>
              <span className='text-sm font-semibold text-base-content'>
                {authUser.createdAt?.split("T")[0]}
              </span>
            </div>
            <div className='px-6 py-4 flex items-center justify-between'>
              <span className='text-sm text-base-content/50'>Account status</span>
              <span className='inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600
                bg-emerald-500 bg-opacity-10 border border-emerald-500 border-opacity-20 px-2.5 py-1 rounded-lg'>
                <span className='size-1.5 rounded-full bg-emerald-500 animate-pulse inline-block' />
                Active
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ProfilePage