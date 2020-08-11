import express from 'express'
import cors from 'cors'
import ClassesController from './controllers/ClassesController'
import ConnectionsController from './controllers/ConnectionsController'
import AuthenticationController from './controllers/AuthenticationController'

const routes = express.Router()

routes.use(express.json())
routes.use(cors())

// Users
routes.post('/auth/signup', AuthenticationController.signup)
routes.post('/auth/signin', AuthenticationController.signin)

// Classes
routes.get('/classes', ClassesController.index)
routes.post('/classes', ClassesController.create)

// Connections
routes.get('/connections', ConnectionsController.index)
routes.post('/connections', ConnectionsController.create)

export default routes