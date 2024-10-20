// Задача 4. З використанням роутерів та шаблонізаторів розробити інтернет магазин з такими сторінками:
// 1) about – як статична сторінка (розмістити у public)
// 2) сторінка додавання продукту (поки лише відображаємо поля для заповнення інформації)
// 3) сторінка відображення продуктів (у формі таблиці і списку)
// 4) головна – знаходяться посилання на сторінки about і products і addproducts

import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import productRoutes from './routes/products.mjs'
import addProductRoutes from './routes/addProduct.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))

app.use('/products', productRoutes)
app.use('/addproduct', addProductRoutes)

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.render('index')
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Сервер працює на порту ${PORT}`)
})
