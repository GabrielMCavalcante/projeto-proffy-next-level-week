import path from 'path'
import dotenv from 'dotenv'
dotenv.config({path: path.resolve(__dirname, '.env')})
import express from 'express'
import routes from './routes'

const app = express()
const PORT = 3333

app.use(routes)

app.listen(PORT, () => console.log('Server started @PORT=' + PORT))