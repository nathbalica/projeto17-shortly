import { Router } from "express"
import { validateSchema } from "../middlewares/validateSchema.middlewares.js"
import { signUp, signIn } from "../controllers/users.controller.js"
import { signupSchema, signinSchema } from "../schemas/users.schemas.js"

const usersRouter = Router()

usersRouter.post("/signup", validateSchema(signupSchema), signUp)
usersRouter.post("/signin", validateSchema(signinSchema), signIn)

export default usersRouter