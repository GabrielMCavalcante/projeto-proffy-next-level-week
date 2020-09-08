import express from "express"
import cors from "cors"

// Controllers
import ClassesController from "./controllers/ClassesController"
import ConnectionsController from "./controllers/ConnectionsController"
import AuthenticationController from "./controllers/AuthenticationController"
import ProfileController from "./controllers/ProfileController"

// Middlewares
import AuthMiddleware from "./middlewares/auth"

const routes = express.Router()

routes.use(express.json())
routes.use(cors())

// Users
routes.post("/auth/signup", AuthenticationController.signup)
routes.post("/auth/signin", AuthenticationController.signin)
routes.post("/auth/password/reset", AuthenticationController.resetPassword)
routes.put("/auth/password/reset/update", AuthenticationController.updatePassword)

// Profile
routes.get("/get-profile", AuthMiddleware, ProfileController.index)
routes.put("/update-profile", AuthMiddleware, ProfileController.update)
routes.delete("/remove-class", AuthMiddleware, ProfileController.delete)

// Classes
routes.get("/classes", AuthMiddleware, ClassesController.index)
routes.post("/classes", AuthMiddleware, ClassesController.create)

// Connections
routes.get("/connections", AuthMiddleware, ConnectionsController.index)
routes.post("/connections", AuthMiddleware, ConnectionsController.create)

export default routes