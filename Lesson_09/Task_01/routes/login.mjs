import LoginController from '../controllers/loginController.mjs'
import { Router } from 'express'
const router = Router()

router.get('/', LoginController.login)

router.post('/', LoginController.checkLogin)

  

export default router
