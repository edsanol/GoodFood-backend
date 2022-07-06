import { Request, Response } from 'express'
import { RequestWithId } from '../middlewares/validate-jwt'
import { toNewCategory } from '../middlewares/validateFields'
import Category, { CategoryModel } from '../models/category.model'
import Restaurant, { RestaurantModel } from '../models/restaurant.model'

export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, image }: any = req.body
    const newCategory = await toNewCategory({ name, description, image })
    const category: CategoryModel = await Category.create(newCategory)

    res.status(200).json({
      ok: true,
      message: 'Category created',
      data: category
    })
  } catch (error: any) {
    res.status(404).json({
      ok: false,
      message: 'Category coult not be create',
      data: error.message
    })
  }
}

export const showAllCategory = async (req: RequestWithId, res: Response): Promise<void> => {
  try {
    const { uid }: any = req
    const restaurant: RestaurantModel | null = await Restaurant.findById(uid)
    if (!restaurant) {
      throw new Error('the restaurant does not exist here')
    }

    // TODO: verificar tambien el token del usuario

    const categories: CategoryModel[] = await Category.find()

    res.status(200).json({
      ok: true,
      message: 'Categories found',
      data: categories
    })
  } catch (error: any) {
    res.status(404).json({
      ok: false,
      message: 'Categories coult not be found',
      data: error.message
    })
  }
}

export const showOneCategory = async (req: RequestWithId, res: Response): Promise<void> => {
  try {
    const { uid }: any = req
    const { id }: any = req.params

    // TODO: Validar si el token proviene de un usuario autorizado

    const restaurant: RestaurantModel | null = await Restaurant.findById(uid)
    if (!restaurant) {
      throw new Error('the restaurant does not exist here')
    }

    const category: CategoryModel | null = await Category.findById(id)

    res.status(200).json({
      ok: true,
      message: 'Category found',
      data: category
    })
  } catch (error: any) {
    res.status(404).json({
      ok: false,
      message: 'Category coult not be found',
      data: error.message
    })
  }
}

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { uid }: any = req
    const { id }: any = req.params
    const { body }: any = req

    const category: CategoryModel | null = await Category.findById(id)
    if (!category) {
      throw new Error('the category does not exist here')
    }

    // TODO: Validar si el token proviene de un usuario autorizado

    const restaurant: RestaurantModel | null = await Restaurant.findById(uid)
    if (!restaurant) {
      throw new Error('the restaurant does not exist here')
    }

    const newCategory = await toNewCategory(body)
    const updatedCategory = await Category.findByIdAndUpdate(id, newCategory, {
      new: true,
      runValidators: true,
      context: 'query'
    })

    res.status(200).json({
      ok: true,
      message: 'Category updated',
      data: updatedCategory
    })
  } catch (error: any) {
    res.status(404).json({
      ok: false,
      message: 'Category coult not be updated',
      data: error.message
    })
  }
}

export const destroyCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { uid }: any = req
    const { id }: any = req.params

    const restaurant: RestaurantModel | null = await Restaurant.findById(uid)
    if (!restaurant) {
      throw new Error('the restaurant does not exist here')
    }

    const category: CategoryModel | null = await Category.findById(id)
    if (!category) {
      throw new Error('the category does not exist here')
    }

    await Category.findByIdAndDelete(category.id)

    res.status(200).json({
      ok: true,
      message: 'Category deleted',
      data: category
    })
  } catch (error: any) {
    res.status(404).json({
      ok: false,
      message: 'Category coult not be deleted',
      data: error.message
    })
  }
}
