import React, { useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore';
import { Send, X, Image } from 'lucide-react';
import toast from 'react-hot-toast';

const MessageInput = () => {
  const [text, setText] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => { setImagePreview(reader.result); };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    try {
      await sendMessage({ text: text.trim(), image: imagePreview });
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.log("Failed to send message:", error);
    }
  };

  const canSend = text.trim() || imagePreview;

  return (
    <div className='px-4 sm:px-5 py-3.5 border-t border-base-content border-opacity-10 bg-base-100 shrink-0'>

      {/* Image preview */}
      {imagePreview && (
        <div className='mb-3 flex items-center gap-3'>
          <div className='relative'>
            <img src={imagePreview} alt='Preview'
              className='size-14 object-cover rounded-xl border border-base-content border-opacity-10 shadow-sm'
            />
            <button onClick={removeImage} type='button'
              className='absolute -top-1.5 -right-1.5 size-5 rounded-full flex items-center justify-center
                bg-base-content text-base-100 shadow hover:opacity-75 transition-opacity'>
              <X className='size-3' strokeWidth={2.5} />
            </button>
          </div>
          <span className='text-xs text-base-content text-opacity-35 font-medium'>Image attached</span>
        </div>
      )}

      {/* Input row */}
      <form onSubmit={handleSendMessage} className='flex items-center gap-2'>

        {/* Attach image */}
        <input type="file" accept='image/*' className='hidden' ref={fileInputRef} onChange={handleImageChange} />
        <button type='button' onClick={() => fileInputRef.current?.click()}
          className={`size-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-150
            ${imagePreview
              ? 'bg-base-content text-base-100'
              : 'text-base-content text-opacity-40 hover:text-base-content hover:text-opacity-70 hover:bg-base-content hover:bg-opacity-5'
            }`}>
          <Image className='size-4' strokeWidth={1.8} />
        </button>

        {/* Text field */}
        <input type="text"
          className='e-input flex-1 rounded-xl h-10 sm:h-11'
          placeholder='Message...'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Send */}
        <button type='submit' disabled={!canSend}
          className={`size-9 sm:size-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-150
            ${canSend
              ? 'bg-base-content text-base-100 hover:opacity-80 active:scale-95'
              : 'bg-base-content bg-opacity-10 text-base-content text-opacity-25 cursor-not-allowed'
            }`}>
          <Send className='size-4' strokeWidth={2} />
        </button>
      </form>
    </div>
  )
}

export default MessageInput