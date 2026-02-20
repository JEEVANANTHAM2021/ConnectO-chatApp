import React from 'react'

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className='hidden lg:flex flex-col items-center justify-center
      bg-base-200 relative overflow-hidden p-12 mt-10'>

      {/* Grid texture background */}
      <div className='absolute inset-0 opacity-40'
        style={{
          backgroundImage: `linear-gradient(oklch(var(--bc)/0.06) 1px, transparent 1px),
                            linear-gradient(90deg, oklch(var(--bc)/0.06) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Large circle accent */}
      <div className='absolute -top-24 -right-24 size-96 rounded-full
        border border-base-content border-opacity-10 opacity-60' />
      <div className='absolute -bottom-16 -left-16 size-72 rounded-full
        border border-base-content border-opacity-10 opacity-60' />

      <div className='relative z-10 max-w-sm text-center'>

        {/* Grid of tiles */}
        <div className='grid grid-cols-3 gap-2.5 mb-12'>
          {[...Array(9)].map((_, i) => (
            <div key={i}
              className={`aspect-square rounded-xl border transition-all duration-700
                ${i % 2 === 0
                  ? 'bg-base-content bg-opacity-10 border-base-content border-opacity-10 animate-pulse'
                  : 'bg-base-100 bg-opacity-6 border-base-content border-opacity-6'
                }`}
              style={{ animationDuration: `${3 + i * 0.4}s`, animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>

        {/* Text */}
        <h2 className='text-2xl font-bold tracking-tight text-base-content mb-3'>{title}</h2>
        <p className='text-sm text-base-content text-opacity-40 leading-relaxed'>{subtitle}</p>

        {/* Bottom row dots */}
        <div className='flex items-center justify-center gap-2 mt-10'>
          <div className='h-px w-12 bg-base-content bg-opacity-15' />
          {[0, 1, 2].map(i => (
            <div key={i}
              className='size-1.5 rounded-full bg-base-content bg-opacity-30 animate-pulse'
              style={{ animationDelay: `${i * 0.4}s` }}
            />
          ))}
          <div className='h-px w-12 bg-base-content bg-opacity-15' />
        </div>
      </div>
    </div>
  )
}

export default AuthImagePattern