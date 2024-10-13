// Задача 2. Користувач через роут ‘/save_num/число’ може передати на сервер якесь число. Ці числа поступово треба зберігати у текстовому файлі numbers.txt. 
//Наприклад, використовуючи такий роут:http://localhost:3000/save_num/78  -  у файл треба додати число 78.
// А використовуючи роути  ‘/sum’ – знайти суму, ‘mult’ –знайти добуток. За роутом «/remove» файл треба видалити.


import { createServer } from 'node:http'
import { unlinkSync, existsSync } from 'fs'
import { getNumbers, saveNumber } from './helper.mjs'
const filePath = 'numbers.txt'


const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
  const path = req.url

  if (path.startsWith('/save_num/')) {
    const numStr = path.split('/')[2]
    const num = parseInt(numStr, 10)

    if (!isNaN(num)) {
      saveNumber(num);
      res.end(`Число ${num} збережено.`)
    } else {
      res.end('Невірне число.')
    }

  } else if (path === '/sum') {
    const numbers = getNumbers(filePath);
    const sum = numbers.reduce((acc, num) => acc + num, 0)
    res.end(`Сума: ${sum}`)

  } else if (path === '/mult') {
    const numbers = getNumbers(filePath);
    const mult = numbers.reduce((acc, num) => acc * num, 1)
    res.end(`Добуток: ${mult}`)

  } else if (path === '/remove') {
    if (existsSync(filePath)) {
      unlinkSync(filePath)
      res.end('Файл видалено.')
    } else {
      res.end('Файл не існує.')
    }

  } else {
    res.end('Не знайдено.')
  }
})

server.listen(3000, () => {
  console.log('Сервер запущено на http://localhost:3000')
})

