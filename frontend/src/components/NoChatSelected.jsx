import { MessageSquare } from 'lucide-react'

const NoChatSelected = () => {
  return (
    <div className='flex-1 flex flex-col items-center justify-center p-8 bg-base-200 bg-opacity-30'>
      <div className='text-center space-y-4 max-w-xs'>

        {/* Icon */}
        <div className='flex justify-center mb-6'>
          <div className='size-16 sm:size-18 rounded-2xl bg-base-content bg-opacity-5
            border border-base-content border-opacity-10 flex items-center justify-center
            animate-bounce shadow-sm'>
            <MessageSquare className='size-7 sm:size-8 text-base-content text-opacity-40' strokeWidth={1.5} />
          </div>
        </div>

        {/* Text */}
        <div className='space-y-2'>
          <h2 className='text-lg font-semibold tracking-tight text-base-content'>
            Welcome to LocalGossips
          </h2>
          <p className='text-sm text-base-content text-opacity-40 leading-relaxed'>
            Select a conversation from the sidebar to start chatting
          </p>
        </div>

        {/* Subtle dots */}
        <div className='flex items-center justify-center gap-3 pt-2'>
          <div className='h-px w-8 bg-base-content bg-opacity-10' />
          {[0, 1, 2].map(i => (
            <span key={i}
              className='size-1 rounded-full bg-base-content bg-opacity-20 animate-pulse inline-block'
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
          <div className='h-px w-8 bg-base-content bg-opacity-10' />
        </div>

      </div>
    </div>
  )
}

export default NoChatSelected