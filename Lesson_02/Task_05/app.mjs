// Задача 5. Створити додаток з історією. У файлі json зберігаємо усі роути та кількість відвідувань. 
// У налаштуваннях settings.json зберігати який роут треба використати для перегляду історії та назву файлу де зберігається історія


import { createServer } from 'node:http'
import path from 'node:path'
import JsonData from './settings.json' assert { type: 'json' }
import{ readJsonFile, writeJsonFile } from './helper.mjs'


const server = createServer(async (req, res) => {
  const historyFilePath = path.resolve(JsonData.historyFile)

  let history = await readJsonFile(historyFilePath)

  const route = req.url

  if(route === '/favicon.ico') return

  if (route === JsonData.historyRoute) {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
    res.end(JSON.stringify(history, null, 2))
    return
  }

  if (history[route]) {
    history[route] += 1
  } else {
    history[route] = 1
  }

    await writeJsonFile(historyFilePath, history)


  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
  res.end(`Ви відвідуєте роут: ${route}\n`);
})

server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000')
  })
