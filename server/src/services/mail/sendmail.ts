import { createTransport } from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const transport = createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
})

export default async function sendMail(receiverMail: string, token: string) {
    const message = {
        from: process.env.MAIL_USER,
        to: receiverMail,
        subject: "Proffy - Recuperação de senha",
        text: `Você recebeu este email para acessar o link de recuperação de sua senha no 
        Proffy. Para recuperar sua senha, acesse o link a seguir: 
        http://192.168.100.12:3000/auth/password/reset/${token}
        Não foi você? Apenas ignore este email.
        `,
        html: `
            <h2>Recuperação de senha Proffy</h2>
            <p>Você recebeu este email para acessar o link de recuperação de sua senha no 
            Proffy.</p>

            <p>Para recuperar sua senha, acesse o link abaixo:</p>
            <p>http://192.168.100.12:3000/auth/password/reset/${token}</p> 
            
            <span>Não foi você? Apenas ignore este email.</span>
        `
    }

    return await transport.sendMail(message)
}