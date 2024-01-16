import { render } from '@testing-library/react'

import PatientPage from '../../pages/patients/[patientId]';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '',
    };
  },
}))

describe('PatientPageId', () => {
  it('renders PatientPage with patient data', async () => {
    const patientData = { 
      id: '1', 
      name: 'John Doe', 
      age: 30, 
      gender: 'Male', 
      disease: 'Diabetes'
    }
    
    render(<PatientPage patient={patientData} />)
  })
})
