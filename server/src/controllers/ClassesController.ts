import { Request, Response } from 'express'
import db from '../database/connection'
import convertHourToMinutes from '../utils/convertHourToMinutes'

interface ScheduleItem {
    week_day: { value: number },
    from: string,
    to: string
}

export default class ClassesController {
    static async index(req: Request, res: Response) {
        const { subject, week_day, from, to } = req.query

        const timeFrom = convertHourToMinutes(String(from))
        const timeTo = convertHourToMinutes(String(to))

        const search = await db('classes')
            .whereExists(function () {
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`__class_id` = `classes`.`id`')
                    .where('week_day', 'like', week_day ? week_day : '%' as any)
                    .where('from', '>=', from ? from !== 'null' ? timeFrom : 0 : 0)
                    .where('to', '<=', to ? to !== 'null' ? timeTo : 1440 : 1440)
            })
            .join('users', 'users.__id', '=', '__user_id')
            .select('*')
            .where('subject', 'like', subject ? subject : '%' as any)

        return res.status(200).json({ search })
    }

    static async create(req: Request, res: Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = req.body

        const trx = await db.transaction()

        try {
            const insertedUsersIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio_header: bio.bio_header,
                bio_content: bio.bio_content
            }) // REMOVER DEPOIS

            const __user_id = insertedUsersIds[0]

            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                __user_id
            })

            const __class_id = insertedClassesIds[0]

            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    week_day: scheduleItem.week_day.value,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to),
                    __class_id
                }
            })

            await trx('class_schedule').insert(classSchedule)

            await trx.commit()
            return res.status(201).json({ message: 'Success' })

        } catch (err) {
            await trx.rollback()
            return res.status(400).json({ message: 'Unexpected error occurred while creating class.' })
        }
    }
}