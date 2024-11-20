import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

import carRoutes from './routes/car/cars.mjs'
import locationRoutes from './routes/location/locations.mjs'

import connectDB from './db/connectDB.mjs'

const app = express()
const __filename = fileURLToPath(import.meta.url) 
const __dirname = path.dirname(__filename)

connectDB()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'))
})

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'))
})

app.use('/cars', carRoutes)
app.use('/locations', locationRoutes)

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
