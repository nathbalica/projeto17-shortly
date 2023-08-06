import { Router } from "express"
import { validateSchema } from "../middlewares/validateSchema.middlewares.js"
import { createUrls, getUrlById, getUrlByShortUrl, deleteUrl } from "../controllers/urls.controller.js"
import { validateAuth } from "../middlewares/users.middlewares.js"
import { urlSchema } from "../schemas/urls.schemas.js"


const urlsRouter = Router()

urlsRouter.post("/urls/shorten", validateSchema(urlSchema), validateAuth, createUrls)
urlsRouter.get("/urls/:id", getUrlById)
urlsRouter.get("/urls/open/:shortUrl", getUrlByShortUrl)
urlsRouter.delete("/urls/:id", validateAuth, deleteUrl)

export default urlsRouter