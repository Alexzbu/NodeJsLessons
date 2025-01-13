import ProductController from '../controllers/productController.mjs'
import CarValidator from '../validators/CarValidator.mjs'
import upload from '../middleware/UploadManager.mjs'
import { checkSchema } from 'express-validator'
import { Router } from 'express'
const router = Router()

router.get('/', ProductController.getProducts)


router.post('/add/:id?',
    upload.single('productImage'),
    // checkSchema(CarValidator.carSchema),
    ProductController.createProduct
)

// router.delete('/:id', CarsController.deleteCar)

router.get('/details/:id', ProductController.procuctDetail)


export default router
