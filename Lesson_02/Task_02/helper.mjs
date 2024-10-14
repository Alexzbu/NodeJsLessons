import { appendFileSync, readFileSync, existsSync } from 'fs'


export function saveNumber(num) {
    appendFileSync(filePath, num + '\n')
  }
  
 
 export function getNumbers(filePath) {
    if (!existsSync(filePath)) return [] 
    const data = readFileSync(filePath, 'utf8')
    return data.split('\n').filter(Boolean).map(Number)
  }