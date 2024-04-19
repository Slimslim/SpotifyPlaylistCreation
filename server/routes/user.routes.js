import { Router } from "express"
import * as userConroller from '../controllers/user.controller.js'

const router = Router()

router.post('/register', userConroller.register)

export default router;