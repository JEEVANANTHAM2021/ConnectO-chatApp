import { useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import { Image, Loader2, Send, X } from 'lucide-react'
import toast from 'react-hot-toast'

const MessageInput = () => {
  const [text, setText] = useState('')
  const [imagePreview, setImagePreview] = useState(null)
  const [isSending, setIsSending] = useState(false)
  const fileInputRef = useRef(null)
  const { sendMessage } = useChatStore()

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => { setImagePreview(reader.result) }
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setImagePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!text.trim() && !imagePreview) return
    if (isSending) return

    setIsSending(true)
    try {
      await sendMessage({ text: text.trim(), image: imagePreview })
      setText('')
      setImagePreview(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
    } catch (error) {
      console.log('Failed to send message:', error)
      toast.error('Failed to send. Try again.')
    } finally {
      setIsSending(false)
    }
  }

  const canSend = (text.trim() || imagePreview) && !isSending

  return (
    <div className='px-4 sm:px-4 py-3 bg-base-200 bg-opacity-70 border-t border-base-200 shrink-0'>

      {/* Image preview strip */}
      {imagePreview && (
        <div className='mb-3 flex items-center gap-3'>
          <div className='relative'>
            <img
              src={imagePreview}
              alt='Preview'
              className='size-14 object-cover rounded-xl border border-base-300 shadow-sm'
            />
            {!isSending && (
              <button
                onClick={removeImage}
                type='button'
                className='absolute -top-1.5 -right-1.5 size-5 rounded-full
                  bg-base-content text-base-100 flex items-center justify-center
                  hover:opacity-75 transition-opacity shadow-md'
              >
                <X className='size-3' strokeWidth={3} />
              </button>
            )}
          </div>
          {isSending && (
            <span className='text-xs text-base-content text-opacity-40 flex items-center gap-1.5 font-medium'>
              <Loader2 className='size-3.5 animate-spin text-primary' />
              Sending image...
            </span>
          )}
        </div>
      )}

      {/* Input row */}
      <form onSubmit={handleSendMessage} className='flex items-center gap-2'>

        {/* Image attach */}
        <input
          type='file'
          accept='image/*'
          className='hidden'
          ref={fileInputRef}
          onChange={handleImageChange}
        />
        <button
          type='button'
          onClick={() => fileInputRef.current?.click()}
          disabled={isSending}
          className={`icon-btn transition-all ${imagePreview ? 'text-primary bg-primary bg-opacity-10' : ''}`}
        >
          <Image className='size-5' strokeWidth={1.8} />
        </button>

        {/* Text */}
        <input
          type='text'
          className='chat-input'
          placeholder='Type a message'
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isSending}
        />

        {/* Send */}
        <button type='submit' disabled={!canSend} className='send-btn'>
          {isSending
            ? <Loader2 className='size-4 animate-spin' />
            : <Send className='size-4' strokeWidth={2} />}
        </button>
      </form>
    </div>
  )
}

export default MessageInput