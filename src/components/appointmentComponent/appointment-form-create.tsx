import { useState } from 'react'
import { useRouter } from 'next/router'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { AppointmentProps, PatientProps } from '../../interfaces'

interface Props {
  initialData: AppointmentProps;
  patients: PatientProps[];
}

const formSchema = z.object({
  date: z.string().min(1),
  hour: z.string().min(1),
  patient: z.string().min(1)
})

export function AppointmentFormCreate({ initialData, patients }: Props){
  const[loading,setLoading] = useState(false)

  const router = useRouter()
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      date: '',
      hour: '',
      patient: ''
    },
  })
  
  const onSubmit = async (data: AppointmentProps) => {
   setLoading(true);
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const responseData = await response.json()

      router.push({
        pathname: `/appointments`,
        query: { formData: responseData },
      });
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false);
    }
  }

  return(
    <div className='p-4'>
      <form 
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex gap-64 border border-blue-400 rounded p-4'>
        <div>
          <div className='flex flex-col'>
            <label>Date</label>
            <input
              type='date'
              disabled={loading}
              placeholder='Date'
              {...form.register('date')}
              className='w-44'
            />
          </div>
          <div className='flex flex-col mt-8'>
            <label>Hour</label>
            <input
              type='time'
              disabled={loading}
              placeholder='Hour'
              {...form.register('hour')}
              className='w-44'
            />
          </div>
          <div className='flex flex-col mt-8'>
            <label>Patients</label>
            <select {...form.register('patient')}>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name}
                </option>
             ))}
            </select>
          </div>
          <button 
            type='submit'
            disabled={loading}
            className='bg-blue-500 text-white rounded p-2 px-16 mt-8 hover:bg-blue-600'
          >
            Create
          </button>
        </div>
        <div className='mt-12'>
          <img src='https://cdn-icons-png.flaticon.com/128/1791/1791587.png'/>
        </div>
      </form>
    </div>
  )
}
