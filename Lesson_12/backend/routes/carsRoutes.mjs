import CarsController from '../controllers/carsController.mjs'
import CarValidator from '../validators/CarValidator.mjs'
import upload from '../middleware/UploadManager.mjs'
import { checkSchema } from 'express-validator'
import { Router } from 'express'
const router = Router()

router.get('/', CarsController.getCars)

router.post('/add/:id?',
    upload.single('carImage'),
    checkSchema(CarValidator.carSchema),
    CarsController.createCar
)

router.delete('/:id', CarsController.deleteCar)

router.get('/details/:id', CarsController.carDetail)


export default router
