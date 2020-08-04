import express from 'express'
import cors from 'cors'
import db from './database/connection'
import convertHourToMinutes from './utils/convertHourToMinutes'

const routes = express.Router()

routes.use(express.json())
routes.use(cors())

interface ScheduleItem { 
    week_day: number, 
    from: string, 
    to: string 
}

// ------------------ Temporário -----------------------------------
routes.get('/AllUsers', async (req, res) => {
    const response = await db('users').select('*')
    return res.json(response)
})

routes.get('/AllClasses', async (req, res) => {
    const response = await db('classes').select('*')
    return res.json(response)
})

routes.get('/AllSchedule', async (req, res) => {
    const response = await db('class_schedule').select('*')
    return res.json(response)
})

routes.get('/AllConnections', async (req, res) => {
    const response = await db('connections').select('*')
    return res.json(response)
})
// ------------------------------------------------------------

routes.get('/classes', (req, res) => {
    const queries = req.query
    console.log(queries)
    return res.json({ bruh_moment: 'confirmed' })
})

routes.post('/classes', async (req, res) => {
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
        })

        const user_id = insertedUsersIds[0]

        const insertedClassesIds = await trx('classes').insert({
            subject,
            cost,
            user_id
        })

        const class_id = insertedClassesIds[0]

        const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
            return {
                week_day: scheduleItem.week_day,
                from: convertHourToMinutes(scheduleItem.from),
                to: convertHourToMinutes(scheduleItem.to),
                class_id
            }
        })

        await trx('class_schedule').insert(classSchedule)

        await trx.commit()
        return res.status(201).json({ message: 'Success' })

    } catch (err) {
        await trx.rollback()
        return res.status(400).json({ message: 'Unexpected error occurred while creating class.' })
    }
})

export default routes