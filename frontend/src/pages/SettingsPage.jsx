import { Send } from "lucide-react";
import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore"

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className='min-h-screen bg-base-200 pt-14'>
      <div className='max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-4'>

        {/* Heading */}
        <div className='mb-6 px-1'>
          <h1 className='text-xl font-bold tracking-tight'>Settings</h1>
          <p className='text-sm text-base-content text-opacity-40 mt-0.5'>Customize your experience</p>
        </div>

        {/* Theme card */}
        <div className='e-card overflow-hidden'>
          <div className='px-6 py-4 border-b border-base-content border-opacity-10 flex items-center justify-between'>
            <div>
              <h2 className='text-sm font-semibold tracking-tight'>Theme</h2>
              <p className='text-xs text-base-content/40 mt-0.5'>
                Choose a theme for your chat interface
              </p>
            </div>
            <span className='e-label'>{theme}</span>
          </div>

          <div className='p-5 sm:p-6'>
            <div className='grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-9 gap-2'>
              {THEMES.map((t) => (
                <button key={t} onClick={() => setTheme(t)}
                  className={`group flex flex-col items-center gap-1.5 p-2 rounded-xl
                    transition-all duration-150 cursor-pointer
                    ${theme === t
                      ? 'bg-base-content bg-opacity-10 ring-1 ring-base-content ring-opacity-10'
                      : 'hover:bg-base-content hover:bg-opacity-5'
                    }`}>
                  <div className='relative h-7 w-full rounded-lg overflow-hidden border border-base-content border-opacity-10'
                    data-theme={t}>
                    <div className='absolute inset-0 grid grid-cols-4 gap-px p-1'>
                      <div className='rounded-sm bg-primary' />
                      <div className='rounded-sm bg-secondary' />
                      <div className='rounded-sm bg-accent' />
                      <div className='rounded-sm bg-neutral' />
                    </div>
                  </div>
                  <span className={`text-[9px] sm:text-[10px] font-medium truncate w-full text-center
                    ${theme === t ? 'text-base-content' : 'text-base-content text-opacity-40'}`}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview card */}
        <div className='e-card overflow-hidden'>
          <div className='px-6 py-4 border-b border-base-content border-opacity-10'>
            <h3 className='text-sm font-semibold tracking-tight'>Preview</h3>
            <p className='text-xs text-base-content text-opacity-40 mt-0.5'>See how the selected theme looks</p>
          </div>

          <div className='p-5 sm:p-6'>
            <div className='max-w-sm mx-auto'>
              <div className='border border-base-content border-opacity-10 rounded-2xl overflow-hidden shadow-sm'>

                {/* Mock header */}
                <div className='px-4 py-3 border-b border-base-content border-opacity-10 bg-base-100 flex items-center gap-3'>
                  <div className='relative'>
                    <div className='size-8 rounded-full bg-primary flex items-center justify-center
                      text-primary-content font-bold text-xs'>DJ</div>
                    <span className='online-dot absolute -bottom-px -right-px' />
                  </div>
                  <div>
                    <p className='text-sm font-semibold text-base-content'>DJ</p>
                    <p className='text-xs text-emerald-500 font-medium'>Active now</p>
                  </div>
                </div>

                {/* Mock messages */}
                <div className='p-4 space-y-3 min-h-[160px] bg-base-200/40'>
                  {PREVIEW_MESSAGES.map((message) => (
                    <div key={message.id}
                      className={`flex items-end gap-2 ${message.isSent ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={message.isSent ? 'bubble-out' : 'bubble-in'}>
                        <p className='text-sm'>{message.content}</p>
                        <p className={`text-[10px] mt-1
                          ${message.isSent ? 'text-base-100 text-opacity-50' : 'text-base-content text-opacity-40'}`}>
                          12:00 PM
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mock input */}
                <div className='px-4 py-3 border-t border-base-content border-opacity-10 bg-base-100 flex gap-2'>
                  <input type="text" readOnly value="This is a preview"
                    className='e-input flex-1 h-9 text-sm pointer-events-none'
                  />
                  <button className='size-9 rounded-xl bg-base-content text-base-100 flex items-center justify-center shrink-0'>
                    <Send className='size-3.5' strokeWidth={2} />
                  </button>
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