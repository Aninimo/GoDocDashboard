import type { NextApiRequest, NextApiResponse } from 'next'
import { requireAuth, RequireAuthProp} from '@clerk/nextjs/api'

import prismadb from '../../../lib/prismadb'

export default requireAuth(async (
  req: RequireAuthProp<NextApiRequest>,
  res: NextApiResponse
): Promise<void> => {
  try {
    if (req.method === 'PATCH') {
      const { userId } = req.auth;
      const { body } = req
      const { name, gender, weight, disease } = body

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' })
      }

      if (!name || !gender || !weight || !disease) {
        return res.status(400).json({ error: 'This field is required' })
      }

      const { patientId } = req.query;

      if (!patientId) {
        return res.status(400).json({
          error: 'Patient id is required'
        })
      }

      const patient = await prismadb.patient.updateMany({
        where: {
          id: patientId as string,
          userId,
        },
        data: {
          name,
          gender,
          weight,
          disease
        },
      });

      return res.status(200).json(patient)
    }

    if (req.method === 'DELETE') {
      const { userId } = req.auth;
      const { patientId } = req.query

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' })
      }

      if (!patientId) {
        return res.status(400).json({ error: 'Patient id is required' })
      }

      const deletedPatient = await prismadb.patient.delete({
        where: {
          id: patientId as string,
        },
      })

      return res.status(200).json(deletedPatient)
    }
  } catch (error) {
    console.error(error);
  }
})
