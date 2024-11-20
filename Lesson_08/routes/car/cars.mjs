import CarsController from '../../controllers/car/carsController.mjs'
import ImageManager from '../../utils/ImageManager.mjs'
import CarValidator from '../../validators/car/CarValidator.mjs'
import { checkSchema } from 'express-validator'
import { Router } from 'express'
const router = Router()

router.get('/', CarsController.getCars)

router.post('/add',
    ImageManager.getUploadStorage().single('carImage'),
    checkSchema(CarValidator.carSchema),
    CarsController.createCar
)

router.get('/add/:id?', CarsController.carForm)

router.post('/add/:id?',
    ImageManager.getUploadStorage().single('carImage'),
    checkSchema(CarValidator.carSchema),
    CarsController.updateCar
)

router.get('/delete/:id', CarsController.deleteCar)

router.get('/:id', CarsController.carDetail)





export default router
