import { Router } from 'express'

const router = Router()

let products = [
  { name: 'Товар 1', price: 100 },
  { name: 'Товар 2', price: 200 }
]

router.get('/', (req, res) => {
  res.render('products', { products })
})

export default router 
export  { products }  
