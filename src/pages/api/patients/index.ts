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
       const { name, gender, weight, disease } = body

       if (!userId) {
         throw new Error('Unauthenticated')
       }

       if (!name || !gender || !weight || !disease) {
         throw new Error('This field is required')
       }
       
       const patient = await prismadb.patient.create({
         data:{
           name,
           gender,
           weight,
           disease,
           userId
         }
       })
       return res.status(200).json(patient)
     }
  }catch (error) {
    console.log(error)
  }
})
