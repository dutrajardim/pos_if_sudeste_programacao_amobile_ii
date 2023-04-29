import { Request, Response } from 'express'
import db from '../database/connection'
import convertHourToMinutes from '../utils/convertHourToMinutes'

// types
interface scheduleItem {
  week_day: number
  from: string
  to: string
}

interface queryFilters {
  subject?: string
  week_day?: string
  time?: string
}

// controllers

/**
 * This function is used to list all classes
 * 
 * @param req parameters sent in the request
 * @param res object to help send the response
 */
export async function list(req: Request, res: Response) {
  const { subject, week_day, time } = req.query as queryFilters

  if (!week_day || !subject || !time)
    return res.status(400).json({ error: 'Missing filters to search classes' })

  const timeInMinutes = convertHourToMinutes(time)

  const classes = await db('classes')
    .where('classes.subject', '=', subject)
    .where('class_schedule.week_day', '=', week_day)
    .where('class_schedule.from', '<=', timeInMinutes)
    .where('class_schedule.to', '>', timeInMinutes)
    .join('coaches', 'classes.coach_id', '=', 'coaches.id')
    .join('class_schedule', 'classes.id', '=', 'class_schedule.class_id')
    .select(['classes.*', 'coaches.*', 'class_schedule.*'])

  res.json(classes)
}

/**
 * This function is used to store a new class
 * 
 * @param req parameters sent in the request
 * @param res object to help send the response
 */
export async function create(req: Request, res: Response) {
  const { name, avatar, whatsapp, bio, subject, cost, schedule } = req.body

  const trx = await db.transaction()

  try {

    const insertedCoachesIds = await trx('coaches').insert({ name, avatar, whatsapp, bio })
    const coach_id = insertedCoachesIds[0]

    const insertedClassesIds = await trx('classes').insert({ subject, cost, coach_id })
    const class_id = insertedClassesIds[0]

    const classShedule = schedule.map((scheduleItem: scheduleItem) => ({
      class_id,
      week_day: scheduleItem.week_day,
      from: convertHourToMinutes(scheduleItem.from),
      to: convertHourToMinutes(scheduleItem.to),
    }))

    await trx('class_schedule').insert(classShedule)

    await trx.commit()
    res.status(201).json({ message: 'Class created successfully' })

  } catch (e) {

    console.log(e)
    await trx.rollback()
    res.status(400).json({ error: 'Unexpected error while creating new class' })
  }
}