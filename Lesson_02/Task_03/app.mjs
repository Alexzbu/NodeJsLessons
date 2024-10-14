// Задача 3. Через параметри запиту передають операцію (add, subtract, mult) і числа (розділені дефісами), які треба опрацювати. 
// Знайти результат і повернути користувачу. Наприклад при запиті:
// http://localhost:3000/add/12-4-23-45   - треба знайти суму чисел 12,4,23,45


import { createServer } from 'node:http'

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })

  const path = req.url

  const segments = path.split('/')
  if (segments.length < 3) {
    res.end('Невірний формат URL.')
    return;
  }

  const numStr = segments[2]

  const numArray = numStr.split('-').map(Number)

  if (numArray.some(isNaN)) {
    res.end('Невірне число.')
    return;
  }

  if (path.startsWith('/add/')) {
    const sum = numArray.reduce((acc, num) => acc + num, 0)
    res.end(`Сума: ${sum}`)

  } else if (path.startsWith('/subtract/')) {
    const diff = numArray.reduce((acc, num) => acc - num)
    res.end(`Різниця: ${diff}`)

  } else if (path.startsWith('/mult/')) {
    const mult = numArray.reduce((acc, num) => acc * num, 1)
    res.end(`Добуток: ${mult}`)

  } else {
    res.end('Невірний запит.')
  }
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000')
})
