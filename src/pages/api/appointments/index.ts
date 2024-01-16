import type { NextApiRequest, NextApiResponse } from 'next'
import { requireAuth, RequireAuthProp} from '@clerk/nextjs/api'

import prismadb from '../../../lib/prismadb'

export default requireAuth(async (
  req: RequireAuthProp<NextApiRequest>,
  res: NextApiResponse
): Promise<void> => {
  try{
     if(req.method === 'POST'){
       const { userId } = req.auth
       const { body } = req
       const { date, hour, patient } = body

       if (!userId) {
         throw new Error('Unauthenticated')
       }

       if (!date || !hour || !patient) {
         throw new Error('This field is required')
       }
       
       const appointment = await prismadb.appointment.create({
         data:{
           date,
           hour,
           patient: {
             connect: {
               id: patient,
             },
           },
           userId
         }
       })
       return res.status(200).json(appointment)
     }
  }catch (error) {
    console.log(error)
  }
})
