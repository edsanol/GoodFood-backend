import { Router } from 'express'
import {
  registerRestaurants,
  restaurantLogin,
  listRestaurants,
  destroyRestaurants,
  showOneRestaurant,
  updateRestaurant,
  tokenRevalidate
} from '../controllers/restaurant.controller'
import { validateJWT } from '../middlewares/validate-jwt'
const router = Router()

router.route('/register').post(registerRestaurants)
router.route('/login').post(restaurantLogin)
router.route('/renew').get(validateJWT, tokenRevalidate)
router.route('/').get(listRestaurants)
router.route('/:id').get(showOneRestaurant)
router.route('/:id').put(validateJWT, updateRestaurant)
router.route('/:id').delete(validateJWT, destroyRestaurants)

export default router
