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
      const { hour, date, patient } = body

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' })
      }

      if (!hour || !date || !patient) {
        return res.status(400).json({ error: 'This field is required' })
      }

      const { appointmentId } = req.query;

      if (!appointmentId) {
        return res.status(400).json({
          error: 'Appointment id is required'
        })
      }

      const appointment = await prismadb.appointment.updateMany({
        where: {
          id: appointmentId as string
        },
        data: {
          date,
          hour,
          patientId: patient,
        },
      });

      return res.status(200).json(appointment)
    }

    if (req.method === 'DELETE') {
      const { userId } = req.auth;
      const { appointmentId } = req.query

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' })
      }

      if (!appointmentId) {
        return res.status(400).json({ error: 'Appointment id is required' })
      }

      const deletedAppointment = await prismadb.appointment.delete({
        where: {
          id: appointmentId as string,
        },
      })

      return res.status(200).json(deletedAppointment)
    }
  } catch (error) {
    console.error(error);
  }
})
