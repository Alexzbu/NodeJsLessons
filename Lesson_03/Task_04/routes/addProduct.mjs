import { Router } from 'express'
import { products } from './products.mjs'

const router = Router()

router.get('/', (req, res) => {
  res.render('addProduct')
})

router.post('/', (req, res) => {
  const { name, price } = req.body
  if (name && price) {
    products.push({ name, price })
  }
  res.redirect('/products')
})

export default router
