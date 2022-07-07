import { Router } from 'express'
import { registerDiner, DinerLogin, updateDiner, showOneDiner, destroyDiner } from '../controllers/diner.controller'
import { validateJWT } from '../middlewares/validate-jwt'
const router = Router()

router.route('/register').post(registerDiner)
router.route('/login').post(DinerLogin)
router.route('/:id').get(validateJWT, showOneDiner)
router.route('/:id').put(validateJWT, updateDiner)
router.route('/:id').delete(validateJWT, destroyDiner)

export default router
