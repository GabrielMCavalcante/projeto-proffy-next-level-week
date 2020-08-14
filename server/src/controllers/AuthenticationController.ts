import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import db from '../database/connection'
import authConfig from '../config/auth'
import sendMail from '../services/mail/sendmail'

function generateToken(id: string, expiresIn = 86400) {
    return jwt.sign({ id }, authConfig.secret, { expiresIn })
}

let tokenTimer: NodeJS.Timeout

export default class AuthenticationController {
    static async signup(req: Request, res: Response) {
        const { name, surname, email, password } = req.body

        const parsedName = String(name).concat(' ', String(surname))

        try {
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
                        if (err) return res.status(400).json({ error: 'Ocorreu um erro interno do servidor. Tente novamente mais tarde.' })

                        const newUser = {
                            __id: hashId,
                            name: parsedName,
                            email,
                            password: hashPassword
                        }

                        // Register user on database
                        const registerUser = await db('users').insert(newUser)

                        if (registerUser) return res.status(200).json({ status: 'OK' })
                        else return res.status(400).json({ error: 'Um erro desconhecido ocorreu ao cadastrar o usuário. Tente novamente mais tarde.' })
                    })
                })
            }
        } catch (err) {
            return res.status(400).json({ error: 'Um erro interno ocorreu: ' + err })
        }
    }

    static async signin(req: Request, res: Response) {
        const { email, password } = req.body

        try {
            // Finding user by email
            const fetchUserPassword: { password: string }[] = await db('users')
                .select('password').where('email', '=', email)

            if (fetchUserPassword.length === 0) {
                // User not found
                res.status(400).json({
                    error: 'Não foi encontrado nenhum usuário com o email informado.'
                })
            } else {
                // User found
                const fetchedPassword = fetchUserPassword[0].password

                // Comparing recieved password with stored one
                bcrypt.compare(password, fetchedPassword, async (err, same) => {
                    if (err) return res.status(400).json({ error: 'Ocorreu um erro interno no servidor. Tente novamente mais tarde.' })
                    else if (!same) return res.status(400).json({ error: 'Senha incorreta. Tente novamente' })
                    else {
                        // Passwords are equal, proceeding to signin user
                        const user = await
                            db('users')
                                .select('__id', 'name', 'avatar', 'email', 'whatsapp', 'bio')
                                .where('email', '=', email).first()

                        const token = generateToken(user.__id)

                        return res.status(200).json({ user, token })
                    }
                })
            }
        } catch (err) {
            return res.status(400).json({ error: 'Ocorreu um erro: ' + err })
        }
    }

    static async resetPassword(req: Request, res: Response) {
        const { email } = req.body

        try {
            // Verifying if user exists
            const user_id = await db('users')
                .select('__id').where('email', '=', email).first()

            if (!user_id)
                return res.status(400)
                    .json({ error: 'Nenhum usuário com este email foi encontrado.' })

            const userId = user_id.__id

            const recoveryToken = generateToken(email, 3600)

            const ref_user = await db('recovery_tokens')
                .select('user_id')
                .where('user_id', '=', userId)
                .first()

            if (ref_user) await db('recovery_tokens')
                .update({ token: recoveryToken })
                .where('user_id', '=', userId)
            else await db('recovery_tokens')
                .insert({ user_id: userId, token: recoveryToken })

            if (tokenTimer) clearTimeout(tokenTimer)

            tokenTimer = setTimeout(async () =>
                await db('recovery_tokens')
                    .delete('*')
                    .where('user_id', '=', userId),
                3600000)
            
            sendMail(email, recoveryToken)
                .then(() => res.status(200).json({ status: 'OK' }))
                .catch(err => res.status(400).json({ error: 'Um erro interno ocorreu: ' + err }))
        } catch (err) {
            return res.status(400).json({ error: 'Um erro interno ocorreu: ' + err })
        }
    }

    static async updatePassword(req: Request, res: Response) {
        const { token, new_password } = req.body
        try {
            // Verifying if there is a recovery token in database
            const ref_user = await db('recovery_tokens')
                .select('*')
                .where('token', '=', token)
                .first()

            if (ref_user) {
                // Verifying if given token is valid
                jwt.verify(token, authConfig.secret, async (err: any) => {
                    if (err)
                        return res.status(401).json({ error: 'Token inválido: ' + err })

                    const user_id = ref_user.user_id

                    // Encrypting password
                    bcrypt.genSalt(10, async (_, salt) => {
                        const hashPassword = await bcrypt.hash(new_password, salt)

                        // Updating user password
                        await db('users')
                            .where('__id', '=', user_id)
                            .update({
                                password: hashPassword
                            })

                        await db('recovery_tokens')
                            .delete('*')
                            .where('user_id', '=', user_id)

                        return res.status(200).json({ status: 'OK' })
                    })
                })
            } else return res.status(400).json({ error: 'Token de recuperação não encontrado.' })
        } catch (err) {
            return res.status(400).json({ error: 'Um erro interno ocorreu: ' + err })
        }
    }
}