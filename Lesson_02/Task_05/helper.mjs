import { readFile, writeFile } from 'node:fs/promises';

export async function readJsonFile(historyFilePath) {
    try {
      const data = await readFile(historyFilePath, 'utf8')
      return JSON.parse(data);
    } catch (err) {
      console.error(`Помилка читання файлу ${historyFilePath}:`, err)
      return {};
    }
  }
  
 export async function writeJsonFile(historyFilePath, data) {
    try {
      await writeFile(historyFilePath, JSON.stringify(data, null, 2))
    } catch (err) {
      console.error(`Помилка запису у файл ${historyFilePath}:`, err)
    }
  }