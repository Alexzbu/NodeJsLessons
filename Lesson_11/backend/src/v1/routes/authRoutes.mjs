import express from 'express'

import AuthController from '../controllers/authController.mjs'
import UserController from '../controllers/userController.mjs'

const router = express.Router()

router.post('/signup/:id?', UserController.createUser)
router.post('/login', AuthController.login)

export default router
