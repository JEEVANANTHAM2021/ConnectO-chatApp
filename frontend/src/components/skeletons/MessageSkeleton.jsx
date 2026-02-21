const MessageSkeleton = () => {
  return (
    <div className='flex-1 overflow-y-auto px-3 sm:px-5 py-4 space-y-3 bg-base-200 bg-opacity-40'>
      {Array(6).fill(null).map((_, i) => {
        const isMine = i % 2 !== 0
        return (
          <div key={i}
            className={`flex items-end gap-2 ${isMine ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className='skeleton size-6 rounded-full shrink-0' />
            <div className={`flex flex-col gap-1 ${isMine ? 'items-end' : 'items-start'}`}>
              <div className={`skeleton rounded-2xl h-10
                ${i % 3 === 0 ? 'w-32 sm:w-40' : i % 3 === 1 ? 'w-44 sm:w-56' : 'w-24 sm:w-32'}`}
              />
              <div className='skeleton h-2 w-10 rounded' />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default MessageSkeleton