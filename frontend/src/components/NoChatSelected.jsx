import { MessageSquare } from 'lucide-react'

const NoChatSelected = () => {
  return (
    <div
      className='flex-1 flex flex-col items-center justify-center p-8 bg-base-100'
      style={{
        backgroundImage: `radial-gradient(circle, oklch(var(--bc)/0.05) 1px, transparent 1px)`,
        backgroundSize: '22px 22px',
      }}
    >
      <div className='text-center max-w-xs space-y-5'>

        {/* Concentric circles icon — WA style */}
        <div className='flex justify-center'>
          <div className='size-24 rounded-full bg-primary bg-opacity-10 flex items-center justify-center'>
            <div className='size-16 rounded-full bg-primary bg-opacity-15 flex items-center justify-center'>
              <div className='size-10 rounded-full bg-primary bg-opacity-20 flex items-center justify-center'>
                <MessageSquare className='size-5 text-primary' strokeWidth={2} />
              </div>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className='space-y-2'>
          <h2 className='text-lg font-bold text-base-content tracking-tight'>
            LocalGossip Web
          </h2>
          <p className='text-sm text-base-content text-opacity-40 leading-relaxed'>
            Select a contact on the left to start a conversation
          </p>
        </div>

        {/* Tip card */}
        <div className='mt-4 px-4 py-3 rounded-2xl bg-base-200 border border-base-300'>
          <p className='text-xs text-base-content text-opacity-40 leading-relaxed'>
            💬 Your messages stay between you and your contacts
          </p>
        </div>
      </div>
    </div>
  )
}

export default NoChatSelected