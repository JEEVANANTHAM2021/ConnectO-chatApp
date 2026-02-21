import { useChatStore } from '../store/useChatStore'
import { useEffect, useRef } from 'react'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import MessageSkeleton from './skeletons/MessageSkeleton'
import { useAuthStore } from '../store/useAuthStore'
import { formatMessageTime } from '../lib/utils'

const ChatContainer = () => {
  const {
    messages, getMessages, isMessagesLoading,
    selectedUser, listenToMessages, unlistenToMessages
  } = useChatStore()
  const { authUser } = useAuthStore()
  const messageEndRef = useRef(null)

  useEffect(() => {
    // Guard: don't run if selectedUser is null (e.g. user pressed back)
    if (!selectedUser?._id) return

    getMessages(selectedUser._id)
    listenToMessages()
    return () => unlistenToMessages()
  }, [selectedUser?._id, getMessages, listenToMessages, unlistenToMessages])
  //           ↑ optional chaining so React doesn't crash reading ._id on null

  useEffect(() => {
    if (messageEndRef.current && messages)
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Extra safety: if selectedUser is somehow null, render nothing
  if (!selectedUser) return null

  if (isMessagesLoading) {
    return (
      <div className='flex-1 flex flex-col overflow-auto bg-base-100'>
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    )
  }

  return (
    <div className='flex-1 flex flex-col overflow-auto bg-base-100'>
      <ChatHeader />

      {/* Messages — subtle WhatsApp-like tiled background */}
      <div
        className='flex-1 overflow-y-auto px-3 sm:px-5 py-4 space-y-1.5 bg-base-200 bg-opacity-40'
        style={{
          backgroundImage: `radial-gradient(circle, oklch(var(--bc)/0.05) 1px, transparent 1px)`,
          backgroundSize: '22px 22px',
        }}
      >
        {messages.map((message) => {
          const isMine = message.senderId === authUser._id

          return (
            <div
              key={message._id}
              ref={messageEndRef}
              className={`flex items-end gap-3 ${isMine ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Small avatar */}
              <img
                src={isMine
                  ? (authUser.profilePic || '/avatar.png')
                  : (selectedUser.profilePic || '/avatar.png')}
                alt='avatar'
                className='size-10 rounded-full object-cover shrink-0 self-end opacity-80'
              />

              {/* Bubble + time */}
              <div className={`flex flex-col gap-1 ${isMine ? 'items-end' : 'items-start'}`}>

                {/* Image attachment */}
                {message.image && (
                  <img
                    src={message.image}
                    alt='Attachment'
                    className='max-w-[200px] sm:max-w-[240px] rounded-2xl object-cover
                      border border-base-content border-opacity-10 shadow-sm mb-0.5'
                  />
                )}

                {/* Text bubble */}
                {message.text && (
                  <div className={isMine ? 'msg-out' : 'msg-in'}>
                    <p>{message.text}</p>
                    <p className={`text-[10px] mt-1 text-right leading-none
                      ${isMine ? 'text-primary-content text-opacity-55' : 'text-base-content text-opacity-35'}`}>
                      {formatMessageTime(message.createdAt)}
                    </p>
                  </div>
                )}

                {/* Time for image-only messages */}
                {message.image && !message.text && (
                  <span className='text-[10px] text-base-content text-opacity-35 px-1'>
                    {formatMessageTime(message.createdAt)}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <MessageInput />
    </div>
  )
}

export default ChatContainer