import UsersDBService from '../models/user/UsersDBService.mjs'
import { prepareToken } from '../../../utils/jwtHelpers.mjs'

class AuthController {

  static async login(req, res) {

    if (!req.body.username) {
      return res.status(401).json([{ message: 'Email is required' }])
    }
    if (!req.body.password) {
      return res.status(401).json([{ message: 'Password is required' }])
    }

    try {
      const user = await UsersDBService.findOne({
        username: req.body.username,
      })

      if (!user) {
        return res.status(401).json([{ message: 'Incorrect username or password.' }])
      }

      if (!await user.validPassword(req.body.password)) {
        return res.status(401).json([{ message: 'Incorrect username or password.' }])
      }
      const token = prepareToken(
        {
          id: user._id,
          username: user.username,
        },
        req.headers
      )
      res.json({
        result: 'Authorized',
        token,
      })
    } catch (err) {
      res.status(401).json({ error: 'Login error' })
    }
  }
}

export default AuthController
