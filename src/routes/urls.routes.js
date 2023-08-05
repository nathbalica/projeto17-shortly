import { Router } from "express"
import { validateSchema } from "../middlewares/validateSchema.middlewares.js"
import { createUrls } from "../controllers/urls.controller.js"
import { validateAuth } from "../middlewares/users.middlewares.js"
import { urlSchema } from "../schemas/urls.schemas.js"


const urlsRouter = Router()

urlsRouter.post("/urls/shorten", validateSchema(urlSchema), validateAuth, createUrls)


export default urlsRouter