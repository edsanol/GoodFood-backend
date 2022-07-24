import { Router } from 'express'
import { validateJWT } from '../middlewares/validate-jwt'
import { createFood, showAllFoods, showOneFood, updateFood, deleteFood, showAllFoodsByRestaurant } from '../controllers/food.controller';

const router = Router()

router.route('/').post(validateJWT, createFood)
router.route('/').get(validateJWT, showAllFoods)
router.route('/restaurant').get(validateJWT, showAllFoodsByRestaurant)
router.route('/:id').get(validateJWT, showOneFood)
router.route('/:id').put(validateJWT, updateFood)
router.route('/:id').delete(validateJWT, deleteFood)

export default router
