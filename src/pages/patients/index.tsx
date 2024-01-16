import { useState } from 'react'
import { useRouter } from 'next/router'
import { withServerSideAuth } from '@clerk/nextjs/ssr'
import { Pencil, Plus, Trash2 } from 'lucide-react'

import prismadb from '../../lib/prismadb'
import { PatientProps } from '../../interfaces'

interface Props{
  patients: PatientProps[];
}

export default function PatientPage({ patients }: Props){
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  
  const onDelete = async (patientId: string) => {
    try{
      setLoading(true)
      const response = await fetch(`/api/patients/${patientId}`,{
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

  return(
    <main className='p-4'>
      <div className='flex justify-between'>
        <h1 className='font-bold text-blue-500'>
          Patients
        </h1>
        <button 
          onClick={() => router.push(`/patients/new`)}
          className='flex gap-4 item-center text-blue-500'>
          <Plus/>
          add patient
        </button>      
      </div>
      <table className='w-full border rounded text-center mt-8'>
        <thead className='border'>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Weight</th>
            <th>Disease</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr 
              key={patient.id}
              className='border'
            >
              <td>{patient.name}</td>
              <th>{patient.gender}</th>
               <th>{patient.weight}</th>
              <td>{patient.disease}</td>
              <td className='flex items-center justify-center space-x-8'>
                <button onClick={() => router.push(`/patients/${patient.id}`)}
         >
                  <Pencil/>
                </button>
                <button 
                  onClick={() => onDelete(patient.id)}
                  className='text-red-500'
                >
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

export const getServerSideProps = withServerSideAuth(async ({ req, params }) => {
  const { userId } = req.auth
  
  const patients = await prismadb.patient.findMany({
    where:{
      userId: userId as string
    }
  })
  
  return{
    props:{
      patients: JSON.parse(JSON.stringify(patients))
    }
  }
})
