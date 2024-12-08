import ProductsController from '../controllers/productsController.mjs'
import { Router } from 'express'
const router = Router()

router.get('/', ProductsController.getProducts)

router.get('/add', ProductsController.ProductForm)

router.post('/add', ProductsController.addProduct)

router.get('/delete/:id', ProductsController.deleteProduct)



export default router