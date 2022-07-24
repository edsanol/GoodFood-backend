import { Router } from 'express'
import { validateJWT } from '../middlewares/validate-jwt'
import { createOrder, showAllOrders, showOneOrder, updateSuccesOrder } from '../controllers/order.controller';
const router = Router()

router.route('/').post(validateJWT, createOrder)
router.route('/').get(validateJWT, showAllOrders)
router.route('/:id').get(validateJWT, showOneOrder)
router.route('/success/:id').put(validateJWT, updateSuccesOrder)

export default router
