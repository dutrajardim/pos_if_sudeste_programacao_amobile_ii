import { Request, Response } from 'express'
import db from '../database/connection'

/**
 * This function is responsible for return the count of connections
 * 
 * @param req parameters sent in the request
 * @param res object to help send the response
 */
export async function totalConnections(req: Request, res: Response) {
  const totalConnections = await db('connections').count('* as total')
  const { total } = totalConnections[0]
  res.status(200).json({ total })
}


/**
 * This function is responsible for create a new connection
 * 
 * @param req parameters sent in the request
 * @param res object to help send the response
 */
export async function create(req: Request, res: Response) {
  const { coach_id } = req.body
  await db('connections').insert({ coach_id })
  res.status(201).json({ message: 'Class created successfully' })
}