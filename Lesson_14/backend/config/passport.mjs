import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcrypt'
import UserService from '../services/userService.mjs'


passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await UserService.getUserByName({username})
      if (!user) {
        return done(null, false, { message: 'Incorrect username or password.' })
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect username or password.' })
      }
      return done(null, user)
    } catch (error) {
      return done(error)
    }
  })
)

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserService.getUserById(id)
    done(null, user)
  } catch (error) {
    done(error)
  }
})

export default passport
