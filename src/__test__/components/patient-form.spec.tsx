import { render, screen, fireEvent } from '@testing-library/react'

import { PatientForm } from '../../components/patientsComponents/patient-form'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '',
    };
  },
}))

describe('PatientForm', () => {
  it('It must be possible to register a patient', () => {
    render(<PatientForm />)

    const form = screen.getByTestId('form-patient')
    const inputName = screen.getByTestId('input-name')
    const inputGender = screen.getByTestId('input-gender')
    const inputWeight = screen.getByTestId('input-weight')
    const inputDisease = screen.getByTestId('input-disease')
    fireEvent.submit(form)
  })
})
