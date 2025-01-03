import LocationController from '../controllers/locationContriller.mjs'
import LocationValidator from '../validators/LocationValidator.mjs'
import { checkSchema } from 'express-validator'
import { Router } from 'express'
const router = Router()

router.get('/', LocationController.getLocations)

router.get('/:id', LocationController.getLocationById)

router.post('/add/:id?',
    checkSchema(LocationValidator.locationSchema),
    LocationController.createLocation
)

router.delete('/:id', LocationController.deleteLocation)


export default router
