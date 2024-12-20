import UsersDBService from '../models/user/UsersDBService.mjs'
import TypesDBService from '../models/type/TypesDBService.mjs'
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

  static async getUserById(req, res) {
    try {
      const id = req.params.id

      const user = await UsersDBService.getById(id)
      res.status(200).json(
        user.username
      )
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async registerForm(req, res) {
    try {
      const id = req.params.id
      let user = null
      if (id) {
        user = await UsersDBService.getById(id)
      }
      const types = await TypesDBService.getList()

      res.status(200).json({
        errors: [],
        data: user,
        user: req.user,
      })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async registerUser(req, res) {
    const errors = validationResult(req)
    const data = req.body
    const types = await TypesDBService.getList()

    if (!errors.isEmpty()) {
      if (req.params.id) data.id = req.params.id
      return res.status(400).json({
        errors: errors.array(),
        data,
        types,
        user: req.user,
      })
    }

    try {
      const dataObj = req.body
      if (req.file) dataObj.img = req.file.filename

      if (req.params.id) {
        await UsersDBService.update(req.params.id, dataObj)
      } else {
        await UsersDBService.create(dataObj)
      }

      res.status(200).json({ message: 'User registered successfully' })
    } catch (err) {
      res.status(500).json({
        errors: [{ msg: err.message }],
        data,
        types,
        user: req.user,
      })
    }
  }

  static async createUser(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const user = req.body
      const errorMessages = {}
      errors.array().forEach(error => {
        if (!errorMessages[error.path]) {
          errorMessages[error.path] = []
        }
        errorMessages[error.path].push(error.msg)
      })
      return res.status(400).json({
        user,
        errors: errorMessages,
      })
    }

    try {
      const userData = req.body
      console.log(req.params.id)
      console.log(userData.username)
      if (req.params.id) {
        // await UsersDBService.update(req.params.id, userData)
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
