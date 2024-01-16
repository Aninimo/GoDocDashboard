import { CalendarDays, Home, Settings, ScrollText ,UsersRound  } from 'lucide-react'

import { SidebarItem } from './sidebarItem'

const guestRoutes = [
  {
    icon: Home,
    label: 'Home',
    href: '/'
  },
  {
    icon: UsersRound,
    label: 'Patients',
    href: '/patients'
  },
  {
    icon: CalendarDays,
    label: 'Appointments',
    href: '/appointments'
  },
  {
    icon: ScrollText,
    label: 'Notes',
    href: '/notes'
  },
  {
    icon: Settings,
    label: 'Settings',
    href: '/user-profile'
  }
]

export function SidebarRoutes(){
  const routes = guestRoutes

  return(
    <div className='flex flex-col w-full'>
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}
