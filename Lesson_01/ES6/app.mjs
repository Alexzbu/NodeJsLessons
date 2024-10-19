// server.js
import { createServer } from 'node:http'

import { makeResponse } from './helper.mjs'

const server = createServer((req, res) => {
res.writeHead(200, { 'Content-Type': 'text/plain' })

const resText = makeResponse(req.url)
res.end(resText);
});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
console.log('Listening on 127.0.0.1:3000');
});

// run with `node server.js`

