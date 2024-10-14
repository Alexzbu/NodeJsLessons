// Задача 4. Розробити серверну частину додатку, який за відповідними маршрутами (“/”, “/coffee”, “/music”) повертає створені HTML документи 
// (розмістіть їх там же, де і додаток), що описують: інформацію про себе, інфорімацію про улюблену кав’ярню,  
// інформацію про улюблений музичний гурт.


import { createServer } from 'node:http'
import { createReadStream } from 'fs'

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })

  const path = req.url;

  if(path === '/') {

    createReadStream('./index.html').pipe(res)
  }

  if(path === '/coffee') {

    createReadStream('./coffee.html').pipe(res)
  }

  if(path === '/music') {

    createReadStream('./music.html').pipe(res)
  }

})

  server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000')
  })