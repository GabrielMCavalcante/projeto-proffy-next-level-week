import { Request, Response } from "express"
import db from "../database/connection"
import commonErrors from "../utils/commonErrorResponses"
import convertHourToMinutes from "../utils/convertHourToMinutes"

interface ScheduleItem {
    week_day: { value: number },
    from: string,
    to: string
}

export default class ProfileController {
    static async index(req: Request, res: Response) {
        const userID = req.headers.userid as string

        if (!userID)
            return res.status(400).json({ error: "ID do usuário não foi recebido." })

        const trx = await db.transaction()

        try {
            const userData = await trx("users")
                .select("name", "email", "avatar", "whatsapp", "bio")
                .where("__id", "=", userID)
                .first()

            const classData = await trx("classes")
                .select("subject", "cost")
                .where("__user_id", "=", userID)

            let scheduleData: any[] = []

            if (classData.length !== 0) {
                const { id } = await trx("classes")
                    .select("id")
                    .where("__user_id", "=", userID)
                    .first()

                scheduleData = await trx("class_schedule")
                    .select("week_day", "from", "to")
                    .where("__class_id", "=", id)
            }

            const profileData = {
                ...userData,
                ...classData[0],
                schedule: [...scheduleData]
            }

            await trx.commit()
            return res.status(200).json(profileData)
        } catch (err) {
            await trx.rollback()
            return commonErrors.internalServerError(res)
        }
    }

    static async update(req: Request, res: Response) {
        const {
            bio,
            cost,
            avatar,
            subject,
            schedule,
            whatsapp
        } = req.body

        const userID = req.headers.userid as string

        if (!userID) return res.status(400).json({ error: "ID do usuário não recebido." })

        const trx = await db.transaction()

        try {
            // Updating user data
            await trx("users")
                .where("__id", "=", userID)
                .update({
                    bio,
                    avatar,
                    whatsapp
                })

            if (subject) {
                const fetchedClassIds = await trx("classes")
                    .select("id")
                    .where("__user_id", "=", userID)
                    .distinct()

                if (fetchedClassIds.length !== 0 && fetchedClassIds.length === 1) {
                    // Updating class data
                    await trx("classes")
                        .where("__user_id", "=", userID)
                        .update({
                            cost,
                            subject
                        })

                    const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                        return {
                            __class_id: fetchedClassIds[0].id,
                            __user_id: userID,
                            week_day: scheduleItem.week_day.value,
                            from: convertHourToMinutes(scheduleItem.from),
                            to: convertHourToMinutes(scheduleItem.to)
                        }
                    })

                    // Updating schedule data
                    await trx("class_schedule").where("__user_id", "=", userID).del()
                    await trx("class_schedule").insert(classSchedule)
                }
            }

            await trx.commit()
            return res.status(200).json({ status: "Perfil atualizado com sucesso." })
        } catch (err) {
            await trx.rollback()
            return commonErrors.internalServerError(res)
        }
    }

    static async delete(req: Request, res: Response) {
        const { userid }  = req.headers

        try {
            await db("classes")
                .where("__user_id", "=", userid as string)
                .del()

            return res.status(200).json({ message: "Classe deletada com sucesso." })
        } 
        catch(error) {
            console.log(error.message)
            return res.status(500).json({ error })
        }
    }
}