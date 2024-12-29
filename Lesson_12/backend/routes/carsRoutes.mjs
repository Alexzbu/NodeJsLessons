import CarsController from '../controllers/carsController.mjs'
import ImageManager from '../middleware/ImageManager.mjs'
import CarValidator from '../validators/CarValidator.mjs'
import upload from '../middleware/UploadManager.mjs'
import { ensureAuthenticated } from '../middleware/auth.mjs'
import { checkSchema } from 'express-validator'
import { Router } from 'express'
const router = Router()

router.get('/', CarsController.getCars)

router.post('/add',
    upload.single('carImage'),
    // ensureAuthenticated,
    // checkSchema(CarValidator.carSchema),
    CarsController.createCar
)

router.get('/add/:id?',
    ensureAuthenticated,
    CarsController.carForm)

router.post('/add/:id?',
    ensureAuthenticated,
    ImageManager.getUploadStorage().single('carImage'),
    checkSchema(CarValidator.carSchema),
    CarsController.updateCar
)

router.get('/delete/:id',
    ensureAuthenticated,
    CarsController.deleteCar)

router.get('/:id', CarsController.carDetail)


export default router
