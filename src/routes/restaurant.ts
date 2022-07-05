import { Router } from 'express'
import { registerRestaurants, restaurantLogin, listRestaurants, destroyRestaurants } from '../controllers/restaurant.controller'
import { validateJWT } from '../middlewares/validate-jwt'
const router = Router()

router.route('/register').post(registerRestaurants)
router.route('/login').post(restaurantLogin)
router.route('/').get(listRestaurants)
router.route('/:id').delete(validateJWT, destroyRestaurants)

export default router
