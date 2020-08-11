import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'
import authConfig from '../config/auth'

export = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    // Verifying if authorization header doesn´t exist
    if (!authHeader)
        return res.status(401).json({ error: 'Nenhum token informado.' })

    const splittedHeader = authHeader.split(' ')

    // Verifying if header doesn´t have two parts
    if (splittedHeader.length !== 2)
        return res.status(401).json({ error: 'Token mal formatado.' })

    const [scheme, token] = splittedHeader

    // Verifying if scheme doesn´t exist or if it´s different from 'Bearer'
    if (!/^Bearer$/i.test(scheme))
        return res.status(401).json({ error: 'Token mal formatado.' })

    // Verifying if the token wasn´t given
    if (!token)
        return res.status(401).json({ error: 'Nenhum token informado.' })

    // Verifying if the given token is valid
    jwt.verify(token, authConfig.secret, err => {
        if(err) return res.status(401).json({ error: 'Token inválido.' })
        
        return next()
    })
}   