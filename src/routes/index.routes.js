import { Router } from "express"
import usersRouter from "./users.routes"
import urlsRouter from "./urls.routes"

const router = Router()

router.use(usersRouter)
router.use(urlsRouter)


export default router