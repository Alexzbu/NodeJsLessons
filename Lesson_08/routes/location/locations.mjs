import LocationController from '../../controllers/location/locationContriller.mjs'
import LocationValidator from '../../validators/location/LocationValidator.mjs'
import { checkSchema } from 'express-validator'
import { Router } from 'express'
const router = Router()

router.get('/', LocationController.getLocations)

router.post('/add',
    checkSchema(LocationValidator.locationSchema),
    LocationController.createLocation
)

router.get('/add/:id?', LocationController.locationForm)

router.post('/add/:id?',
    checkSchema(LocationValidator.locationSchema),
    LocationController.updateLocation
)

router.get('/delete/:id', LocationController.deleteLocation)

// router.get('/:id', CarsController.carDetail)





export default router
