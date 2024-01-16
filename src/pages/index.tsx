import { withServerSideAuth } from '@clerk/nextjs/ssr'

import { Card } from '../components/card'
import { Graph } from '../components/graph'
import { InfoDoctor } from '../components/infoDoctor'

import prismadb from '../lib/prismadb'
import { getGraph } from '../actions/get-graph'
import { PatientProps, AppointmentProps } from '../interfaces'

interface AppProps{
  patients: PatientProps[];
  appointments: AppointmentProps[];
  graph: any;
}

export default function App({ patients, appointments, graph }: AppProps){
  
  const totalConsutation = patients.length + appointments.length
  
  return(
    <main className='flex flex-col lg:flex-row gap-16 pt-8 p-4 md:flex-col'>
      <div className='w-full lg:w-1/2'>
        <Card/>
        <div className='mt-8'>
          <h2 className='font-bold mb-4'>
            Patient Active
          </h2>
          <Graph data={graph}/>
        </div>
        <h2 className='font-bold mb-4 mt-8'>
          Patient Active
        </h2>
        <table className='w-full border rounded text-center mt-8'>
          <thead className='border'>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Weight</th>
              <th>Disease</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <InfoDoctor
          totalPatients={patients.length} 
          totalAppointments={appointments.length}
          totalConsutation={totalConsutation}
        />
      </div>
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

  const graph = await getGraph(userId as string)
  
  const patients = await prismadb.patient.findMany({
    where:{
      userId: userId as string
    }
  })

  const appointments = await prismadb.appointment.findMany({
    where:{
      userId: userId as string
    }
  })
  
  return{
    props:{
      patients: JSON.parse(JSON.stringify(patients)),
      appointments: JSON.parse(JSON.stringify(appointments)),
      graph
    }
  }
})
