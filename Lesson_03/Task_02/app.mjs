// Задача 2. Розробити серверну частину додатку, 
// який за відповідними маршрутами (“/”, “/coffee”, “/music”) повертає створені HTML документи.



import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/coffee', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'coffee.html'))
})

app.get('/music', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'music.html'))
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Сервер працює на порту ${PORT}`)
})
