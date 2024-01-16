import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { withServerSideAuth } from '@clerk/nextjs/ssr'
import { format } from 'date-fns'
import { Pencil, Plus, Trash2 } from 'lucide-react'

import prismadb from '../../lib/prismadb'
import { AppointmentProps } from '../../interfaces'

interface Props {
  appointments: AppointmentProps[];
}

export default function Appointments({ appointments }: Props) {
  const[loading,setLoading] = useState(false)
  
  const router = useRouter()
  const params = router.query

  const onDelete = async (appointmentId: string) => {
    try{
      setLoading(true)
      const response = await fetch(`/api/appointments/${appointmentId}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      window.location.reload()
    }catch (error) {
      alert(error)
    }finally {
      setLoading(false)
    }
  }

  return (
    <main className='p-4'>
      <div className='flex justify-between'>
        <h1 className='font-bold text-blue-400'>
          Appointments
        </h1>
        <Link href='/appointments/create' className='flex gap-4 text-blue-400'>
          Add appointment
          <Plus />
        </Link>
      </div>
      <table className='w-full border rounded text-center mt-8'>
        <thead className='border'>
          <tr>
            <th>Patient</th>
            <th>Date</th>
            <th>Hour</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr 
              key={appointment.id}
              className='border'
            >
              <td>
                {appointment.patient.name}
              </td>
              <td>{format(new Date(appointment.date),'dd/MM/yyyy')}</td>
              <td>{appointment.hour}</td>
              <td className='flex items-center justify-center space-x-8'>
                <button onClick={() => router.push(`/appointments/${appointment.id}`)}>
                  <Pencil/>
                </button>
                <button 
                  onClick={() => onDelete(appointment.id)}
                  className='text-red-500'>
                  <Trash2/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}

export const getServerSideProps = withServerSideAuth(async ({ req, res }) => {
  const { userId } = req.auth

  if (!userId) {
    res.writeHead(302, { Location: '/sign-in' })
    res.end();
    return { props: {} }
  }

  const appointments = await prismadb.appointment.findMany({
    where: {
      userId: userId as string,
    },
    include: {
      patient: true, 
    },
  })

  return {
    props: {
      appointments: JSON.parse(JSON.stringify(appointments))
    }
  }
})
