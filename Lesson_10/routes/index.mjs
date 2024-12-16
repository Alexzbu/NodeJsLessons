import { Router } from 'express'
import carsRoutes from './carsRoutes.mjs'
import locationsRoutes from './locationsRoutes.mjs'
import authRoutes from './authRoutes.mjs'



const router = Router()

router.get('/', (req, res) => {
   res.render('index', {user: req.user})
})

router.use('/cars', carsRoutes)
router.use('/locations', locationsRoutes)
router.use('/auth', authRoutes)

router.get('/logout', (req, res) => {
   req.logout((err) => {
     if (err) {
       return next(err)
     }
     res.redirect('/')
   })
 })

export default router