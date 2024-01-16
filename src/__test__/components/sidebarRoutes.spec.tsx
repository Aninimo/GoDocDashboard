import { render, screen } from '@testing-library/react'

import { SidebarRoutes } from '../../components/sidebarRoutes'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '',
    };
  },
}))

describe('SidebarRoutes', () => {
  it('renders sidebar items correctly', () => {
     render(<SidebarRoutes />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Patients')).toBeInTheDocument()
    expect(screen.getByText('Appointments')).toBeInTheDocument()
    expect(screen.getByText('Notes')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })
})
