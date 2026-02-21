import { Search, Users } from 'lucide-react'

const SidebarSkeleton = () => {
  return (
    <aside className='h-full w-full lg:w-80 lg:shrink-0 flex flex-col bg-base-100 lg:border-r lg:border-base-200'>

      {/* Header */}
      <div className='bg-base-200 bg-opacity-70 border-b border-base-200 shrink-0'>

        {/* Title row */}
        <div className='flex items-center justify-between px-4 py-3'>
          <div className='flex items-center gap-2.5'>
            <div className='size-8 rounded-full bg-primary bg-opacity-15 flex items-center justify-center shrink-0'>
              <Users className='size-4 text-primary' strokeWidth={2} />
            </div>
            <div className='skeleton h-4 w-12 rounded' />
          </div>
          <div className='skeleton h-4 w-20 rounded' />
        </div>

        {/* Search skeleton */}
        <div className='px-3 pb-3'>
          <div className='flex items-center gap-2 h-9 px-3 rounded-full bg-base-100 border border-base-300'>
            <Search className='size-3.5 text-base-content text-opacity-20 shrink-0' strokeWidth={2} />
            <div className='skeleton h-3 w-32 rounded' />
          </div>
        </div>

        {/* Count row */}
        <div className='flex items-center gap-1.5 px-4 pb-2.5'>
          <div className='skeleton h-2.5 w-16 rounded' />
        </div>
      </div>

      {/* Contact skeletons — full width rows */}
      <div className='flex-1 overflow-y-auto'>
        {Array(8).fill(null).map((_, i) => (
          <div key={i}
            className='flex items-center gap-3 px-4 py-3 border-b border-base-200 border-opacity-70'>

            {/* Avatar */}
            <div className='skeleton size-12 rounded-full shrink-0' />

            {/* Info */}
            <div className='flex flex-col gap-2 flex-1 min-w-0'>
              <div className='flex items-center justify-between'>
                <div className='skeleton h-3.5 w-28 rounded' />
                <div className='skeleton h-3 w-10 rounded-full' />
              </div>
              <div className='skeleton h-2.5 w-24 rounded' />
            </div>

            {/* Chevron */}
            <div className='skeleton size-4 rounded lg:hidden' />
          </div>
        ))}
      </div>
    </aside>
  )
}

export default SidebarSkeleton