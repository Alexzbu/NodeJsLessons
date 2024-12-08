import dotenv from 'dotenv'
import { cookie } from 'express-validator'
dotenv.config()

export default Object.freeze({
   databaseName: process.env.DATABASE_NAME,
   databaseUrl: process.env.MONGODB_URL,
   mongoURI: `${process.env.MONGODB_URL}${process.env.DATABASE_NAME}`,
   sessionSecret: process.env.SESSION_SECRET,
   cookieSecret: process.env.COOKIE_SECRET,
   port: process.env.PORT,
})