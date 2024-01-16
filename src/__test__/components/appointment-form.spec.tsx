import { render, screen, fireEvent } from '@testing-library/react'

import { AppointmentForm } from '../../components/appointmentComponents/appointment-form'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '',
    };
  },
}))

describe('PatientForm', () => {
  it('It must be possible to register a appointment', () => {
    render(<AppointmentForm />)

    const form = screen.getByTestId('form-appointment')
    const inputDate = screen.getByTestId('input-date')
    const inputHour = screen.getByTestId('input-hour')

    fireEvent.submit(form)
  })
})
