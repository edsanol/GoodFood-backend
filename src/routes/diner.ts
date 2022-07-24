import { Router } from 'express'
import { registerDiner, DinerLogin, updateDiner, showOneDiner, destroyDiner, tokenRevalidate, showAllDiners } from '../controllers/diner.controller';
import { validateJWT } from '../middlewares/validate-jwt'
const router = Router()

router.route('/register').post(registerDiner)
router.route('/login').post(DinerLogin)
router.route('/renew').get(validateJWT, tokenRevalidate)
router.route('/').get(validateJWT, showAllDiners)
router.route('/:id').get(validateJWT, showOneDiner)
router.route('/:id').put(validateJWT, updateDiner)
router.route('/:id').delete(validateJWT, destroyDiner)

export default router
