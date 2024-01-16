import { HeartHandshake } from 'lucide-react'

import { SidebarRoutes } from './sidebarRoutes'

export function Sidebar(){
  return(
    <div className='h-full flex flex-col overflow-y-auto '>
      <div className='flex flex-col items-center p-6'>
        <h1 className='font-bold'>
          Go Doc.
        </h1>
        <HeartHandshake 
          size={52}
        />
      </div>
      <div className='flex flex-col w-full'>
        <SidebarRoutes/>
      </div>
    </div>
  )
}
