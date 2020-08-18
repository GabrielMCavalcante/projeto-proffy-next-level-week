import { Request, Response } from "express"
import db from "../database/connection"

export default class ProfileController {
    static async index(req: Request, res: Response) {
        const userID = req.headers.userid as string

        if(!userID) 
            return res.status(400).json({ error: "ID do usuário não foi recebido." })

        const userData = await db("users")
            .select("name", "email", "password", "avatar", "whatsapp", "bio")
            .where("__id", "=", userID)
            .first()
        
        const classData = await db("classes")
            .select("subject", "cost")
            .where("__user_id", "=", userID)
            .first()

        return res.status(200).json({userData, classData})
    }
}