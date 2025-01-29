import CartController from '../controllers/cartController.mjs'
import { Router } from 'express'
const router = Router()

router.get('/', CartController.getProducts)


router.post('/add', CartController.addProduct)

// router.delete('/:id', CarsController.deleteCar)

// router.get('/details/:id', ProductController.procuctDetail)
// router.get('/props', ProductController.getProductProps)


export default router
