import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className='h-full w-16 lg:w-64 shrink-0 flex flex-col border-r border-base-content border-opacity-10'>

      {/* Header */}
      <div className='px-3 lg:px-4 py-4 border-b border-base-content border-opacity-10'>
        <div className='flex items-center gap-2.5'>
          <div className='size-7 rounded-md bg-base-content bg-opacity-8 flex items-center justify-center shrink-0'>
            <Users className='size-3.5 text-base-content text-opacity-30' strokeWidth={2} />
          </div>
          <div className='skeleton h-3.5 w-20 rounded hidden lg:block' />
        </div>
        <div className='hidden lg:flex items-center justify-between mt-3.5'>
          <div className='skeleton h-3 w-28 rounded' />
          <div className='skeleton h-3 w-8 rounded' />
        </div>
      </div>

      {/* Contacts */}
      <div className='flex-1 overflow-y-auto py-2 px-2 space-y-0.5'>
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className='flex items-center gap-3 px-3 py-2.5 rounded-xl'>
            <div className='skeleton size-9 rounded-full shrink-0 mx-auto lg:mx-0' />
            <div className='hidden lg:flex flex-col gap-1.5 flex-1 min-w-0'>
              <div className='skeleton h-3 w-28 rounded' />
              <div className='skeleton h-2.5 w-16 rounded' />
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default SidebarSkeleton