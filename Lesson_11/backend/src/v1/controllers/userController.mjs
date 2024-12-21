import UsersDBService from '../models/user/UsersDBService.mjs'
import { validationResult } from 'express-validator'

class UserController {
  static async usersList(req, res) {
    try {
      const filters = {}
      for (const key in req.query) {
        if (req.query[key]) filters[key] = req.query[key]
      }

      const dataList = await UsersDBService.getList(filters)
      res.status(200).json({
        users: dataList,
        user: req.user
      })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async createUser(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const errorMessages = []
      errors.array().forEach(error => {
        errorMessages.push({ message: error.msg })
      })
      return res.status(400).json(errorMessages)
    }

    try {
      const userData = req.body
      if (req.params.id) {
        await UsersDBService.update(req.params.id, userData)
      } else {
        await UsersDBService.create(userData)
      }
      res.status(200).json({ success: true })
    } catch (err) {
      res.status(500)
    }
  }

  static async deleteUser(req, res) {
    try {
      await UsersDBService.deleteById(req.body.id)
      res.status(200).json({ success: true })
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to delete user' })
    }
  }
}

export default UserController
