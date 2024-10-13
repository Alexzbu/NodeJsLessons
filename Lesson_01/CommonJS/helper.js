function makeResponse(url) {
    if(url === '/ok') return 'OK'
    else if(url === '/hello') return 'HELLO'
    else return 'Hello World!!!!'
}


function run(){
    console.log('Hello from helper')
}

const isMainModule = !module.parent

if(isMainModule) run()
else exports.makeResponse = makeResponse