import React from 'react'

const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className='flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-5'>
      {skeletonMessages.map((_, idx) => {
        const isMine = idx % 2 !== 0;
        return (
          <div key={idx}
            className={`flex items-end gap-2.5 ${isMine ? 'flex-row-reverse' : 'flex-row'}`}>

            {/* Avatar skeleton */}
            <div className='skeleton size-7 rounded-full shrink-0' />

            {/* Bubble skeleton */}
            <div className={`flex flex-col gap-1.5 ${isMine ? 'items-end' : 'items-start'}`}>
              <div className={`skeleton rounded-2xl h-10
                ${idx % 3 === 0 ? 'w-36 sm:w-44' : idx % 3 === 1 ? 'w-52 sm:w-64' : 'w-28 sm:w-36'}`}
              />
              <div className='skeleton h-2.5 w-12 rounded' />
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default MessageSkeleton