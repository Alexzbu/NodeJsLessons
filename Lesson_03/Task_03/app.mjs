// Розробити програму з такими функціональними можливостями:
// обробка статичних маршрутів:
// “/”  Вітання користувача
// “/goals”  Ваші цілі
// обробка статичних файлів:
// about  містить тему та умову задачі
// news  містить перелік важливі новини (для Вас)
// обробка параметрів запитів:
// /info/:myLinks  у залежності від значення параметра повертає сторінку з :
// «sites» -  адресами улюблених сайтів
// «films» -  адреси улюблених онлайн кінотеатрі
// «me» - або інформацію про себе


import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/goals', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'goals.html'))
})

app.get('/info/:myLinks', (req, res) => {
  const { myLinks } = req.params

  if (myLinks === 'sites') {
    res.sendFile(path.join(__dirname, 'views', 'sites.html'))
  } else if (myLinks === 'films') {
    res.sendFile(path.join(__dirname, 'views', 'films.html'))
  } else if (myLinks === 'me') {
    res.sendFile(path.join(__dirname, 'views', 'me.html'))
  } else {
    res.status(404).send('<h1>404 - Сторінку не знайдено</h1>')
  }
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Сервер працює на порту ${PORT}`)
})
