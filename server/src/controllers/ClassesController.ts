import { Request, Response } from "express"
import db from "../database/connection"
import convertHourToMinutes from "../utils/convertHourToMinutes"
import commonErrors from "../utils/commonErrorResponses"

interface ScheduleItem {
    week_day: { value: number },
    from: string,
    to: string
}

const MAX_RESULTS_PER_PAGE = 10

export default class ClassesController {
    static async index(req: Request, res: Response) {
        const { subject, week_day, from, to, page = "1" } = req.query

        const convertedFrom = convertHourToMinutes(String(from))
        const convertedTo = convertHourToMinutes(String(to))

        try {
            const sql = `select 
            users.__id AS id,
            users.name,
            users.bio,
            users.avatar,
            classes.subject,
            classes.cost,
            JSON_ARRAY(
                GROUP_CONCAT(
                    JSON_OBJECT(
                        'week_day', 
                            class_schedule.week_day, 
                        'from', 
                            class_schedule.'from',
                        'to',
                            class_schedule.'to'
                    )
                )
            ) as schedule
            from users
            join classes
            on classes.__user_id = users.__id
            join class_schedule
            on class_schedule.__class_id = classes.id
            group by users.name`

            const search = await db.raw(sql)

            // Parses schedule string into an array of one string
            const parsedSearch = search.map((s: any) => ({
                ...s,
                schedule: JSON.parse(s.schedule)
            }))

            // Parses string into two separate objects
            const secondParsedSearch = parsedSearch.map((s: any) => ({
                ...s,
                schedule: s.schedule[0].replace(/\}\,/g, "}  ,").split('  ,').map((si: any) => {
                    return JSON.parse(si)
                })
            }))

            // Applies user filters
            const finalParsedSearch = secondParsedSearch.filter((s: any) => {
                let returnSearchItem = true

                if (subject) returnSearchItem = s.subject === subject

                if (returnSearchItem && week_day) {
                    for (let i = 0; i < s.schedule.length; i++) {
                        returnSearchItem = s.schedule[i].week_day == week_day
                        if (returnSearchItem) break
                    }
                }

                if (returnSearchItem && from) {
                    for (let i = 0; i < s.schedule.length; i++) {
                        returnSearchItem = s.schedule[i].from === convertedFrom
                        if (returnSearchItem) {
                            if (week_day) {
                                returnSearchItem = s.schedule[i].week_day === Number(String(week_day))
                                if (returnSearchItem) break
                            } else break
                        }
                    }
                }

                if (returnSearchItem && to) {
                    for (let i = 0; i < s.schedule.length; i++) {
                        returnSearchItem = s.schedule[i].to === convertedTo
                        if (returnSearchItem) {
                            if (week_day) {
                                returnSearchItem = s.schedule[i].week_day === Number(String(week_day))
                                if (returnSearchItem) break
                            } else break
                        }
                    }
                }

                if (returnSearchItem) return s
            })

            const startIndex = (parseInt(String(page)) - 1) * MAX_RESULTS_PER_PAGE
            const endIndex = parseInt(String(page)) * MAX_RESULTS_PER_PAGE

            // Applies pagination slice
            const results = finalParsedSearch.slice(startIndex, endIndex)

            const resultsInfo: { results: any[], next?: number, prev?: number, total: number } = {
                results,
                total: search.length
            }

            // Verifies if there is a next / previous page
            if (endIndex < finalParsedSearch.length)
                resultsInfo.next = parseInt(String(page)) + 1

            if (startIndex > 0)
                resultsInfo.prev = parseInt(String(page)) - 1

            return res.status(200).json({ resultsInfo })
        } catch (err) {
            return commonErrors.internalServerError(res)
        }
    }

    static async create(req: Request, res: Response) {

        const userID = req.headers.userid as string

        if (!userID) return res.status(400).json({ error: "ID do usuário não recebido." })

        const {
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = req.body

        const trx = await db.transaction()

        try {
            await trx("users")
                .where("__id", "=", userID)
                .update({ whatsapp, bio })

            const insertedClassesIds = await trx("classes").insert({
                subject,
                cost,
                __user_id: userID
            })

            const __class_id = insertedClassesIds[0]

            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    __class_id,
                    __user_id: userID,
                    week_day: scheduleItem.week_day.value,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to)
                }
            })

            await trx("class_schedule").insert(classSchedule)

            await trx.commit()
            return res.status(201).json({ message: "Aula criada com sucesso." })

        } catch (err) {
            await trx.rollback()
            return commonErrors.internalServerError(res)
        }
    }

    static async indexFavourites(req: Request, res: Response) {
        const { page = "1", getAll = false } = req.query
        const userid = req.headers.userid

        const sql = `select 
        users.__id AS id,
        users.name,
        users.bio,
        users.avatar,
        classes.subject,
        classes.cost,
        JSON_ARRAY(
            GROUP_CONCAT(
                JSON_OBJECT(
                    'week_day', 
                        class_schedule.week_day, 
                    'from', 
                        class_schedule.'from',
                    'to',
                        class_schedule.'to'
                )
            )
        ) as schedule
        from users
        join classes
        on classes.__user_id = users.__id
        join class_schedule
        on class_schedule.__class_id = classes.id
        join favourites
        on favourites.user_id = "${userid}"
        where favourites.favourite_id = users.__id
        group by users.name`

        try {
            const search = await db.raw(sql)

            // Parses schedule string into an array of one string
            const parsedSearch = search.map((s: any) => ({
                ...s,
                schedule: JSON.parse(s.schedule)
            }))

            // Parses string into two separate objects
            const finalParsedSearch = parsedSearch.map((s: any) => ({
                ...s,
                schedule: s.schedule[0].replace(/\}\,/g, "}  ,").split('  ,').map((si: any) => {
                    return JSON.parse(si)
                })
            }))

            const startIndex = !getAll 
                ? (parseInt(String(page)) - 1) * MAX_RESULTS_PER_PAGE
                : 0
            const endIndex = !getAll 
                ? parseInt(String(page)) * MAX_RESULTS_PER_PAGE
                : finalParsedSearch.length

            // Applies pagination slice
            const results = finalParsedSearch.slice(startIndex, endIndex)

            const resultsInfo: { results: any[], next?: number, prev?: number, total: number } = {
                results,
                total: search.length
            }

            // Verifies if there is a next / previous page
            if (endIndex < finalParsedSearch.length)
                resultsInfo.next = parseInt(String(page)) + 1

            if (startIndex > 0)
                resultsInfo.prev = parseInt(String(page)) - 1

            return res.status(200).json({ resultsInfo })
        } catch (err) {
            return commonErrors.internalServerError(res)
        }
    }

    static async createFavourite(req: Request, res: Response) {
        const userid = req.headers.userid
        const teacherid = req.headers.teacherid

        try {
            await db("favourites").insert({
                user_id: userid,
                favourite_id: teacherid
            })

            return res.status(201).json({ message: "Favorito adicionado com sucesso." })
        } catch (err) {
            return commonErrors.internalServerError(res)
        }
    }

    static async deleteFavourite(req: Request, res: Response) {
        const { teacherid, userid } = req.headers

        try {
            await db("favourites")
                .where("favourite_id", "=", teacherid as any)
                .andWhere("user_id", "=", userid as any)
                .del()

            return res.status(200).json({ message: "Favorito deletado com sucesso." })
        } catch (error) {
            return res.status(500).json({ error })
        }
    }
}