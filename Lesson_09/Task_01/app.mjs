import express from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import path from 'path'
import { fileURLToPath } from 'url'

import config from './config/default.mjs'
import productRoutes from './routes/products.mjs'
import loginRoutes from './routes/login.mjs'

import connectDB from './db/connectDB.mjs'

const app = express()
app.use(cookieParser(config.cookieSecret))
app.use(
  session({
    secret: config.sessionSecret,
    cookie: { maxAge: 10 * 60 * 1000 },
    resave: false,
    saveUninitialized: false,
  })
)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

connectDB()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.redirect('/products')
})

app.use('/login', loginRoutes)
app.use('/products', productRoutes)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app
