import { Router } from 'express'
import UserController from '../controllers/userController.mjs'
import AuthController from '../controllers/authController.mjs'
import UserValidator from '../validators/userValidator.mjs'
import { checkSchema } from 'express-validator'

const router = Router()

router.post('/signup/:id?',
  // checkSchema(UserValidator.userSchema),
  UserController.createUser)
router.post('/login',
  checkSchema(UserValidator.userSchema),
  AuthController.login)

export default router
