import express from 'express'
import routes from './routes'

const app = express()
const PORT = 8080

app.use(routes)

app.listen(PORT, () => console.log('Server started @PORT=' + PORT))