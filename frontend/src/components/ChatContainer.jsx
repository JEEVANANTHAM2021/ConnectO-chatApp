import { useChatStore } from "../store/useChatStore"
import { useEffect, useRef } from "react"
import ChatHeader from "./ChatHeader"
import MessageInput from "./MessageInput"
import MessageSkeleton from "./skeletons/MessageSkeleton"
import { useAuthStore } from "../store/useAuthStore"
import { formatMessageTime } from "../lib/utils"

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser, listenToMessages, unlistenToMessages } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    listenToMessages();
    return () => unlistenToMessages();
  }, [selectedUser._id, getMessages, listenToMessages, unlistenToMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages)
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />

      {/* Messages */}
      <div className='flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-4 bg-base-200 bg-opacity-30'>
        {messages.map((message) => {
          const isMine = message.senderId === authUser._id;
          return (
            <div key={message._id} ref={messageEndRef}
              className={`flex items-end gap-2.5 ${isMine ? 'flex-row-reverse' : 'flex-row'}`}>

              {/* Avatar */}
              <div className='chat-image avatar shrink-0 self-end'>
                <div className='size-7 rounded-full overflow-hidden ring-1 ring-base-content ring-opacity-10'>
                  <img
                    src={isMine
                      ? (authUser.profilePic || "/avatar.png")
                      : (selectedUser.profilePic || "/avatar.png")}
                    alt='profile pic'
                    className='object-cover w-full h-full'
                  />
                </div>
              </div>

              {/* Content */}
              <div className={`flex flex-col gap-1 max-w-[72%] sm:max-w-sm lg:max-w-md
                ${isMine ? 'items-end' : 'items-start'}`}>

                {message.image && (
                  <img src={message.image} alt="Attachment"
                    className='sm:max-w-[200px] rounded-2xl object-cover
                      border border-base-content border-opacity-10 shadow-sm'
                  />
                )}

                {message.text && (
                  <p className={isMine ? 'bubble-out' : 'bubble-in'}>
                    {message.text}
                  </p>
                )}

                <time className='text-[10px] text-base-content text-opacity-30 font-medium px-1'>
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  )
}

export default ChatContainer