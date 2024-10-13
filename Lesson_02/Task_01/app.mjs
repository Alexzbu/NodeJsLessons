// Задача 1. У консольний додаток передають через параметр пенсійний вік. Наприклад
// node app.mjs –-pension=65
// Потім питаємо у терміналі користувача скільки йому років (використати “readline”) і кажемо чи він є пенсіонером.

import readline from 'readline'

const urlSearchString = process.argv.slice(2).join('&')
const args = new URLSearchParams(urlSearchString)
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('How old are you? ', (answer) => {

    args.get('--pension') <= answer ? console.log('You are pensioner') : console.log('You are still young')

    rl.close()
})