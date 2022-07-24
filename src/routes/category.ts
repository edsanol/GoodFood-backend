import { Router } from 'express'
import {
  createCategory,
  showAllCategory,
  showOneCategory,
  updateCategory,
  destroyCategory
} from '../controllers/category.controller'
import { validateJWT } from '../middlewares/validate-jwt'
const router = Router()

router.route('/').post(createCategory)
router.route('/').get(validateJWT, showAllCategory)
router.route('/:id').get(validateJWT, showOneCategory)
router.route('/:id').put(validateJWT, updateCategory)
router.route('/:id').delete(validateJWT, destroyCategory)

export default router
