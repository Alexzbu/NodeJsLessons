import express from 'express'

import AuthController from '../controllers/authController.mjs'
import UserController from '../controllers/userController.mjs'
import { checkSchema } from 'express-validator'
import UserValidator from '../../../validators/userValidator.mjs'

const router = express.Router()

router.post('/signup/:id?',
   checkSchema(UserValidator.userSchema),
   UserController.createUser)
router.post('/login',
   checkSchema(UserValidator.userSchema),
   AuthController.login)

export default router
