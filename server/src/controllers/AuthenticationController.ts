import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import db from '../database/connection'

export default class AuthenticationController {
    static async create(req: Request, res: Response) {
        const { name, surname, email, password } = req.body

        const parsedName = String(name).concat(' ', String(surname))

        const newUser = {
            name: parsedName,
            email,
            password
        }


    }
}