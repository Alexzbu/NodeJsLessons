import LocationController from '../controllers/locationContriller.mjs'
import LocationValidator from '../validators/LocationValidator.mjs'
import { ensureAuthenticated } from '../middleware/auth.mjs'
import { checkSchema } from 'express-validator'
import { Router } from 'express'
const router = Router()

router.get('/', LocationController.getLocations)

router.post('/add',
    // ensureAuthenticated,
    // checkSchema(LocationValidator.locationSchema),
    LocationController.createLocation
)

router.get('/add/:id?',
    ensureAuthenticated,
    LocationController.locationForm)

router.post('/add/:id?',
    ensureAuthenticated,
    checkSchema(LocationValidator.locationSchema),
    LocationController.updateLocation
)

router.get('/delete/:id',
    ensureAuthenticated,
    LocationController.deleteLocation)


export default router
