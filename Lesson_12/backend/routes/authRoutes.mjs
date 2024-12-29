import { Router } from 'express'
import UserController from '../controllers/userController.mjs'
import UserValidator from '../validators/userValidator.mjs'
import { checkSchema } from 'express-validator'
import passport from 'passport'

const router = Router()

router.get('/register', UserController.registerForm)

router.post('/register', 
  checkSchema(UserValidator.userSchema),
  UserController.createUser)

router.get('/login', UserController.loginForm)

router.post('/login', (req, res, next) => {
    next()
  },
  passport.authenticate('local', {
    successRedirect: '/cars',
    failureRedirect: '/auth/login',
    failureFlash: true,
  }),
  function (req, res) {
    res.redirect('/')
  }
)

export default router
