import path from 'node:path'
import { fileURLToPath } from 'node:url'

export function makeResponse(url) {
    if(url === '/ok') return 'OK'
    else if(url === '/hello') return 'HELLO'
    else return 'Hello World!!!!'
}

function run(){
    console.log('Hello from helper')
}

const isMainModule = 
            path.resolve(process.argv[1]) ===
            fileURLToPath(import.meta.url)

if(isMainModule) run()