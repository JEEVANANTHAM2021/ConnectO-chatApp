import { Send } from 'lucide-react'
import { THEMES } from '../constants'
import { useThemeStore } from '../store/useThemeStore'

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
]

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore()

  return (
    <div className='min-h-screen bg-base-200 pt-14'>
      <div className='max-w-4xl mx-auto px-4 py-6 sm:py-10 space-y-4'>

        {/* Heading */}
        <div className='px-1 mb-2'>
          <h1 className='text-lg font-bold text-base-content'>Settings</h1>
          <p className='text-sm text-base-content text-opacity-40 mt-0.5'>Customize your experience</p>
        </div>

        {/* Theme card */}
        <div className='bg-base-100 rounded-2xl border border-base-200 overflow-hidden shadow-sm'>
          <div className='px-5 py-4 border-b border-base-200 flex items-center justify-between'>
            <div>
              <h2 className='text-sm font-bold text-base-content'>Theme</h2>
              <p className='text-xs text-base-content text-opacity-40 mt-0.5'>
                Choose how LocalGossip looks for you
              </p>
            </div>
            <span className='section-label capitalize'>{theme}</span>
          </div>

          <div className='p-4 sm:p-5'>
            <div className='grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-9 gap-2'>
              {THEMES.map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`group flex flex-col items-center gap-1.5 p-2 rounded-xl
                    transition-all duration-150 cursor-pointer
                    ${theme === t
                      ? 'bg-primary bg-opacity-10 ring-2 ring-primary ring-offset-1 ring-offset-base-100'
                      : 'hover:bg-base-200'
                    }`}
                >
                  {/* Swatch */}
                  <div
                    className='h-7 w-full rounded-lg overflow-hidden border border-base-300 shadow-sm'
                    data-theme={t}
                  >
                    <div className='w-full h-full grid grid-cols-4 gap-px p-1'>
                      <div className='rounded-sm bg-primary' />
                      <div className='rounded-sm bg-secondary' />
                      <div className='rounded-sm bg-accent' />
                      <div className='rounded-sm bg-neutral' />
                    </div>
                  </div>
                  {/* Name */}
                  <span className={`text-[9px] sm:text-[10px] font-semibold truncate w-full text-center
                    ${theme === t ? 'text-primary' : 'text-base-content text-opacity-40'}`}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview card */}
        <div className='bg-base-100 rounded-2xl border border-base-200 overflow-hidden shadow-sm'>
          <div className='px-5 py-4 border-b border-base-200'>
            <h3 className='text-sm font-bold text-base-content'>Preview</h3>
            <p className='text-xs text-base-content text-opacity-40 mt-0.5'>See how your selected theme looks</p>
          </div>

          <div className='p-4 sm:p-5'>
            <div className='max-w-sm mx-auto rounded-2xl border border-base-200 overflow-hidden shadow-sm'>

              {/* Mock chat header */}
              <div className='flex items-center gap-3 px-4 py-3 bg-base-200 bg-opacity-70 border-b border-base-200'>
                <div className='relative'>
                  <div className='size-9 rounded-full bg-primary flex items-center justify-center
                    text-primary-content font-bold text-sm'>
                    DJ
                  </div>
                  <span className='absolute bottom-0 right-0 size-2.5 rounded-full
                    bg-success border-2 border-base-200' />
                </div>
                <div>
                  <p className='text-sm font-bold text-base-content'>DJ</p>
                  <p className='text-xs text-success font-medium'>Online</p>
                </div>
              </div>

              {/* Mock messages */}
              <div
                className='p-4 space-y-2.5 min-h-[140px] bg-base-100'
                style={{
                  backgroundImage: `radial-gradient(circle, oklch(var(--bc)/0.05) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px',
                }}
              >
                {PREVIEW_MESSAGES.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isSent ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={message.isSent ? 'msg-out' : 'msg-in'}>
                      <p>{message.content}</p>
                      <p className={`text-[10px] mt-1 text-right
                        ${message.isSent ? 'text-primary-content text-opacity-55' : 'text-base-content text-opacity-35'}`}>
                        12:00 PM
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mock input */}
              <div className='flex items-center gap-2 px-3 py-2.5
                bg-base-200 bg-opacity-70 border-t border-base-200'>
                <div className='flex-1 h-9 rounded-full bg-base-100 border border-base-300
                  flex items-center px-4'>
                  <span className='text-xs text-base-content text-opacity-30'>Type a message</span>
                </div>
                <div className='send-btn size-9'>
                  <Send className='size-3.5' strokeWidth={2} />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SettingsPage