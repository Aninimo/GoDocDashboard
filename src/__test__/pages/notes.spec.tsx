import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import NotePage from '../../pages/notes'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '',
    };
  },
}))

jest.mock('@clerk/nextjs/ssr', () => ({
  withServerSideAuth: jest.fn((handler) => handler),
}))

describe('NotePage', () => {
  it('renders page title correctly', () => {

    render(<NotePage notes={[]} />)

    expect(screen.getByText(/Your notes/i)).toBeInTheDocument();
  })

  test('allows user to add a note', async () => {
    render(<NotePage notes={[]} />)

    fireEvent.click(screen.getByText(/Add note/i))

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Enter title')).toBeInTheDocument()
    })
  })
})
