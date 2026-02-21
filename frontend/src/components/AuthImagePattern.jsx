const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className='hidden lg:flex flex-col items-center justify-center bg-base-200 p-12 relative overflow-hidden'>

      {/* Faint dot grid */}
      <div className='absolute inset-0'
        style={{
          backgroundImage: `radial-gradient(circle, oklch(var(--bc)/0.10) 1px, transparent 1px)`,
          backgroundSize: '28px 28px'
        }}
      />

      {/* Big faint circle accents */}
      <div className='absolute -top-20 -left-20 size-80 rounded-full border-2 border-primary border-opacity-10' />
      <div className='absolute -bottom-16 -right-16 size-64 rounded-full border-2 border-primary border-opacity-10' />

      <div className='relative z-10 max-w-xs text-center space-y-8'>

        {/* WhatsApp-like phone mockup */}
        <div className='flex justify-center'>
          <div className='relative w-28 h-48 bg-base-100 rounded-3xl border-4 border-base-300
            shadow-xl flex flex-col overflow-hidden'>

            {/* Phone top bar */}
            <div className='h-8 bg-primary flex items-center px-3 gap-2 shrink-0'>
              <div className='size-5 rounded-full bg-primary-content bg-opacity-20 overflow-hidden'>
                <div className='w-full h-full bg-primary-content bg-opacity-30' />
              </div>
              <div className='flex-1 space-y-1'>
                <div className='h-1.5 w-12 rounded-full bg-primary-content bg-opacity-50' />
                <div className='h-1 w-8 rounded-full bg-primary-content bg-opacity-30' />
              </div>
            </div>

            {/* Chat bubbles in phone */}
            <div className='flex-1 bg-base-200 bg-opacity-50 p-2 space-y-2 flex flex-col justify-end'>
              <div className='self-start'>
                <div className='h-5 w-16 rounded-xl rounded-bl-sm bg-base-100 border border-base-300 shadow-sm' />
              </div>
              <div className='self-end'>
                <div className='h-5 w-12 rounded-xl rounded-br-sm bg-primary bg-opacity-60 shadow-sm' />
              </div>
              <div className='self-start'>
                <div className='h-5 w-14 rounded-xl rounded-bl-sm bg-base-100 border border-base-300 shadow-sm' />
              </div>
              <div className='self-end'>
                <div className='h-5 w-16 rounded-xl rounded-br-sm bg-primary bg-opacity-60 shadow-sm' />
              </div>
            </div>

            {/* Phone input bar */}
            <div className='h-7 bg-base-100 border-t border-base-200 flex items-center px-2 gap-1 shrink-0'>
              <div className='flex-1 h-3.5 rounded-full bg-base-200' />
              <div className='size-4 rounded-full bg-primary bg-opacity-60' />
            </div>
          </div>
        </div>

        {/* Text */}
        <div className='space-y-2'>
          <h2 className='text-xl font-bold text-base-content tracking-tight'>{title}</h2>
          <p className='text-sm text-base-content text-opacity-25 leading-relaxed'>{subtitle}</p>
        </div>

        {/* Dot row */}
        <div className='flex items-center justify-center gap-2'>
          {[0,1,2].map(i => (
            <span key={i}
              className={`rounded-full bg-primary bg-opacity-40 animate-pulse
                ${i === 1 ? 'size-2.5' : 'size-1.5'}`}
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default AuthImagePattern