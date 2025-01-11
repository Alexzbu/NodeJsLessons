import CategoryController from '../../controllers/propsControllers/categoryContriller.mjs'
// import LocationValidator from '../validators/LocationValidator.mjs'
import { checkSchema } from 'express-validator'
import { Router } from 'express'
const router = Router()

router.get('/', CategoryController.getCategorys)

// router.get('/:id', LocationController.getLocationById)

router.post('/add/:id?/',
    // checkSchema(LocationValidator.locationSchema),
    CategoryController.createCategory
)

// router.delete('/:id', LocationController.deleteLocation)


export default router
