import { useRouter } from 'next/router'
import { useState } from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { PatientProps } from '../../interfaces'

interface Props {
  initialData: PatientProps;
}

const formSchema = z.object({
  name: z.string().min(1),
  gender: z.string().min(1),
  weight: z.string().min(1),
  disease: z.string().min(1)
})


export function PatientForm({ initialData }: Props) {
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const params = router.query

  const action = initialData ? 'Save changes' : 'Create'

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      gender: '',
      weight: '',
      disease: ''
    },
  })

  const onSubmit = async (data: PatientProps) => {
    setLoading(true);
    try {
      const url = initialData
        ? `/api/patients/${params.patientId}`
        : `/api/patients`

      const method = initialData ? 'PATCH' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const responseData = await response.json()

      router.push({
        pathname: `/patients`,
        query: { formData: responseData },
      });
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='p-4'>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex gap-72 border border-blue-400 rounded p-4'>
        <div className='flex flex-col'>
          <input
            type='text'
            disabled={loading}
            placeholder='Name'
            {...form.register('name')}
            className='w-56 border p-2 rounded mb-4'
          />

          <input
            type='text'
            disabled={loading}
            placeholder='Gender'
            {...form.register('gender')}
            className='w-56 border p-2 rounded mb-4'
          />

          <input
            type='text'
            disabled={loading}
            placeholder='Weight'
            {...form.register('weight')}
            className='w-56 border p-2 rounded mb-4'
          />

          <input
            type='text'
            disabled={loading}
            placeholder='Disease'
            {...form.register('disease')}
            className='w-56 border p-2 rounded mb-4'
          />
          <button
            type='submit'
            disabled={loading}
            className='w-56 bg-blue-500 text-white rounded p-2 px-16 mt-8 hover:bg-blue-600'
          >
            {action}
          </button>
        </div>
        <div className='mt-16'>
          <img 
            src='https://cdn-icons-png.flaticon.com/128/3034/3034882.png'
            className='w-52'      
          />
        </div>
      </form>
    </div>
  )
}
