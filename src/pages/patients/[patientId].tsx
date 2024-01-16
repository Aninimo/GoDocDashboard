import { GetServerSidePropsContext } from 'next'

import { PatientForm } from '../../components/patientsComponents/patient-form'
import { PatientProps } from '../../interfaces'

import prismadb from '../../lib/prismadb'

interface PatientPageProps {
  patient: PatientProps;
}

export default function PatientPage({ patient }: PatientPageProps){
  return(
    <main className='p-4'>
      <PatientForm initialData={patient}/>
    </main>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const patientId = context.params?.patientId as string; 
  
  try{
     const patient = await prismadb.patient.findUnique({
      where: {
        id: patientId
      }
    })

    if (!patient) {
      return {
        props: {
          patient: null,
        }
      }
    }

    return{
      props: {
        patient: JSON.parse(JSON.stringify(patient))
      },
    }
  }catch (error){
    return{
      props:{
        patient: null
      }
    }
  }
}
