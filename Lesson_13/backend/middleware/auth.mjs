import { parseBearer } from '../utils/jwtHelpers.mjs'

// Функція для налаштування аутентифікації та авторизації
const auth = (app) => {
  // Middleware для налаштування заголовків CORS
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    )
    next() // Передача обробки наступному middleware
  })

  // Middleware для перевірки аутентифікації та авторизації
  app.use((req, res, next) => {
    // Відкриті шляхи, які не потребують авторизації
    const openPathes = [
      /^\/api\/auth\/login$/,
      /^\/api\/auth\/signup$/,
      /^\/api\/products$/,
      /^\/api\/products\/props(\?.*)?$/,
      /^\/api\/props\/[a-z]+$/,
      /^\/api\/products\/details$/,
      /^\/api\/products\/details\/[0-9a-fA-F]{24}$/,
      /^\/api\/locations$/
    ]

    const isOpenPath = openPathes.some((pattern) => pattern.test(req.path))
    // Перевірка, чи шлях потребує авторизації
    if (!isOpenPath) {
      try {
        // Парсинг токена та додавання користувача до запиту
        req.user = parseBearer(req.headers.authorization, req.headers)
      } catch (err) {
        // Якщо авторизація не вдалася, повертається статус 401
        return res.status(401).json({ result: 'Access Denied' })
      }
    }
    next() // Передача обробки наступному middleware
  })
}

// Експорт функції auth як модуля за замовчуванням
export default auth
