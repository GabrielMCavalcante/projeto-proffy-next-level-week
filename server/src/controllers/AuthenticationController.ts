import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import db from '../database/connection'
import authConfig from '../config/auth'

function generateToken(id: string, expiresIn = 86400) {
    return jwt.sign({ id }, authConfig.secret, { expiresIn })
}

export default class AuthenticationController {
    static async signup(req: Request, res: Response) {
        const { name, surname, email, password } = req.body

        const parsedName = String(name).concat(' ', String(surname))

        // Verifying if user email already exists in database
        const response = await db('users').select('*').where('email', '=', email)
        if (response.length > 0) {
            // Email already exists
            return res.status(400).json({ error: 'Este email já foi cadastrado.' })
        } else {
            // Email doesnt exists
            bcrypt.genSalt(10, async (_, salt) => {
                const hashPassword = await bcrypt.hash(password, salt)

                // Generate user id
                const limit = String(email).length > String(password).length
                    ? String(email).length
                    : String(password).length

                let userId = ''

                for (let i = 0; i < limit; i++) {
                    if (email.charAt(i)) {
                        userId += email.charAt(i)
                        if (password.charAt(i))
                            userId += password.charAt(i)
                    } else userId += password.charAt(i)
                }

                bcrypt.hash(userId, 5, async (err, hashId) => {
                    if(err) return res.status(400).json({ error: 'Ocorreu um erro interno do servidor. Tente novamente mais tarde.' })
                    
                    const newUser = {
                        __id: hashId,
                        name: parsedName,
                        email,
                        password: hashPassword
                    }

                    const token = generateToken(newUser.__id)

                    // Register user on database
                    const registerUser = await db('users').insert(newUser)

                    if (registerUser) res.status(200).json({ newUser, token })
                    else res.status(400).json({ error: 'Um erro desconhecido ocorreu ao cadastrar o usuário. Tente novamente mais tarde.' })
                })
            })
        }
    }

    static async signin(req: Request, res: Response) {
        const { email, password } = req.body

        // Finding user by email
        const fetchUserPassword: { password: string }[] = await db('users').select('password').where('email', '=', email)

        if (fetchUserPassword.length === 0) {
            // User not found
            res.status(400).json({ error: 'Não foi encontrado nenhum usuário com o email informado.' })
        } else {
            // User found
            const fetchedPassword = fetchUserPassword[0].password

            // Comparing recieved password with stored one
            bcrypt.compare(password, fetchedPassword, async (err, same) => {
                if (err) return res.status(400).json({ error: 'Ocorreu um erro interno no servidor. Tente novamente mais tarde.' })
                else if (!same) return res.status(400).json({ error: 'Senha incorreta. Tente novamente' })
                else {
                    // Passwords are equal, proceeding to signin user
                    const user = await db('users').select('*').where('email', '=', email).first()
                    
                    const token = generateToken(user.__id)

                    return res.status(200).json({ user, token })
                }
            })
        }

    }
}