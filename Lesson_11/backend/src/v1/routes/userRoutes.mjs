import express from 'express'
import UserController from '../controllers/userController.mjs'
import UserValidator from '../../../validators/userValidator.mjs'

import { checkSchema } from 'express-validator'
// import UploadManager from '../utils/UploadManager.mjs'

const router = express.Router()

router.get('/', UserController.usersList)

router.post('/add/:id?',
  // UploadManager.single('userImg'),
  checkSchema(UserValidator.userSchema),
  // UserValidator.checkFile,
  UserController.createUser
)

router.delete('/', UserController.deleteUser)

export default router
