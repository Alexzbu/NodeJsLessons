import ProductsController from '../controllers/productsController.mjs'
import { Router } from 'express'
const router = Router()

router.get('/', ProductsController.mainProducts)

router.post('/add', ProductsController.createProduct)

router.get('/add/:id?', ProductsController.productForm)

router.post('/add/:id?', ProductsController.updateProduct)

router.get('/delete/:id', ProductsController.deleteProduct)

router.get('/:id', ProductsController.productDetail)





export default router
