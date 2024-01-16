import { withServerSideAuth } from '@clerk/nextjs/ssr'

import { AppointmentFormCreate } from '../../components/appointmentComponent/appointment-form-create'
import prismadb from '../../lib/prismadb'
import { AppointmentProps, PatientProps } from '../../interfaces'

interface Props {
  appointment: AppointmentProps;
  patients: PatientProps[];
}

export default function CreateAppointment({ appointment, patients }: Props){
  return(
    <div>
      <AppointmentFormCreate 
        initialData={appointment}
        patients={patients}/>
    </div>
  )
}

export const getServerSideProps = withServerSideAuth(async ({ req, res, params }) => {
  const { userId } = req.auth
  
  const appointmentId = params?.context as string;

  try{
    const patients = await prismadb.patient.findMany({
      where: {
        userId: userId as string
      },
    });

    if (!appointmentId) {
      return {
        props: {
          appointment: null,
          patients: JSON.parse(JSON.stringify(patients)),
        },
      };
    }

    const appointment = await prismadb.appointment.findUnique({
      where: {
        id: appointmentId
      },
    });
    
    if (!appointment) {
      return {
        props: {
          appointment: null,
          patients: JSON.parse(JSON.stringify(patients)),
        },
      };
    }

    return {
      props: {
        appointment: JSON.parse(JSON.stringify(appointment)),
        patients: JSON.parse(JSON.stringify(patients)),
      },
    };
  }catch (error) {
    console.log(error);
    return {
      props: {
        appointment: null,
        patients: null,
      },
    };
  }
})
