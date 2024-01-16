import { withServerSideAuth } from '@clerk/nextjs/ssr';

import { AppointmentForm } from '../../components/appointmentComponent/appointment-form'
import prismadb from '../../lib/prismadb';
import { AppointmentProps, PatientProps } from '../../interfaces';

interface Props {
  appointment: AppointmentProps;
  patients: PatientProps[];
}

export default function AppointmentEdit({ appointment, patients }: Props){
  return (
    <>
      <AppointmentForm
        initialData={appointment}
        patients={patients}
      />
    </>
  );
}

export const getServerSideProps = withServerSideAuth(async ({ req, res, params }) => {
  const { userId } = req.auth
  const appointmentId = params?.appointmentId as string
   
  try {
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
  } catch (error) {
    console.log(error);
    return {
      props: {
        appointment: null,
        patients: null,
      },
    };
  }
})
