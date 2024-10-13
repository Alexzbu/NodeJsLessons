import { appendFileSync, readFileSync, existsSync } from 'fs'

// Функція для збереження числа у файл
export function saveNumber(num) {
    appendFileSync(filePath, num + '\n')
  }
  
  // Функція для отримання всіх чисел з файлу
 export function getNumbers(filePath) {
    if (!existsSync(filePath)) return [] // Якщо файл не існує, повертаємо порожній масив
    const data = readFileSync(filePath, 'utf8') // Читаємо файл
    return data.split('\n').filter(Boolean).map(Number) // Перетворюємо текст на масив чисел
  }