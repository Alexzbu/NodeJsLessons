import UserService from '../services/userService.mjs'
import { prepareToken } from '../utils/jwtHelpers.mjs'
import bcrypt from 'bcrypt'

class AuthController {

  static async login(req, res) {
    if (!req.body.username) {
      return res.status(401).json({ username: 'Email is required' })
    }
    if (!req.body.password) {
      return res.status(401).json({ password: 'Password is required' })
    }

    try {
      const user = await UserService.getUserByName(
        req.body.username,
      )

      if (!user) {
        return res.status(401).json({ password: 'Incorrect username or password.' })
      }

      const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
      if (!isPasswordValid) {
        return res.status(401).json({ password: 'Incorrect username or password.' })
      }
      const token = prepareToken(
        {
          id: user._id,
          username: user.username,
        },
        req.headers
      )
      res.status(200).json({
        result: 'Authorized',
        token,
      })
    } catch (err) {
      res.status(401).json({ error: 'Login error' })
    }
  }
}

export default AuthController
