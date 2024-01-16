import { UserButton, useUser } from '@clerk/nextjs'

interface Props{
  totalPatients: number;
  totalAppointments: number;
  totalConsutation: number;
}

export function InfoDoctor({ 
  totalPatients, 
  totalAppointments,
  totalConsutation
}: Props) {
  const { user } = useUser();
 
  return (
    <div className='flex flex-col items-center justify-center bg-gray-200 p-4'>
      <div className='flex flex-col justify-center items-center text-center'>
        <UserButton/>
        <h2 className='font-bold mt-4'>
          {user?.fullName}
        </h2>
      </div>
      <div className='flex items-center text-center gap-8 mt-4 mb-8'>
        <div className='flex flex-col'>
          <strong>{totalAppointments}</strong>
          <span> Appointments </span>
        </div>
        <div className='flex flex-col'>
          <strong>{totalPatients}</strong>
          <span> Total Patients </span>
        </div>
      </div>
      
      <div className='flex gap-20 mt-12'>
        <div className='flex flex-col text-center'>
          <strong>
            {totalConsutation}
          </strong>
          <span>
            Total Consutations
          </span>
        </div>       
      </div>
    </div>
  );
}
