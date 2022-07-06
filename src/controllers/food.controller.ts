import { Response } from 'express'
import { RequestWithId } from '../middlewares/validate-jwt'
import Food, { FoodModel } from '../models/food.model'
import { toNewFood, toUpdateFood } from '../middlewares/validateFields'
import Restaurant, { RestaurantModel } from '../models/restaurant.model'
import Category, { CategoryModel } from '../models/category.model'

export const createFood = async (req: RequestWithId, res: Response): Promise<void> => {
  try {
    const { uid }: any = req

    const restaurant: RestaurantModel | null = await Restaurant.findById(uid)
    if (!restaurant) {
      throw new Error('the restaurant does not exist here')
    }

    const { categoryId, name, description, image, rating, price }: any = req.body

    const category: CategoryModel | null = await Category.findById(categoryId)
    if (!category) {
      throw new Error('the category does not exist here')
    }

    const newFood = await toNewFood({ uid, categoryId, name, description, image, rating, price })
    const food: FoodModel = await Food.create(newFood)

    await restaurant.updateOne({
      $push: {
        foodId: food
      }
    })
    await category.updateOne({
      $push: {
        foodId: food
      }
    })

    res.status(200).json({
      ok: true,
      message: 'Food created',
      data: food
    })
  } catch (error: any) {
    console.log(error)
    res.status(404).json({
      ok: false,
      message: 'Food coult not be create',
      data: error.message
    })
  }
}

export const showAllFoods = async (req: RequestWithId, res: Response): Promise<void> => {
  try {
    const { uid }: any = req

    // TODO: Validar también con el token del usuario

    const restaurant: RestaurantModel | null = await Restaurant.findById(uid)
    if (!restaurant) {
      throw new Error('the restaurant does not exist here')
    }

    const foods: FoodModel[] = await Food.find()

    res.status(200).json({
      ok: true,
      message: 'Food found',
      data: foods
    })
  } catch (error: any) {
    res.status(404).json({
      ok: false,
      message: 'Food coult not be found',
      data: error.message
    })
  }
}

export const showOneFood = async (req: RequestWithId, res: Response): Promise<void> => {
  try {
    const { uid }: any = req
    const { id }: any = req.params

    // TODO: Validar también con el token del usuario

    const restaurant: RestaurantModel | null = await Restaurant.findById(uid)
    if (!restaurant) {
      throw new Error('the restaurant does not exist here')
    }

    const food: FoodModel | null = await Food.findById(id)
    if (!food) {
      throw new Error('the food does not exist here')
    }

    res.status(200).json({
      ok: true,
      message: 'Food found',
      data: food
    })
  } catch (error: any) {
    res.status(404).json({
      ok: false,
      message: 'Food coult not be found',
      data: error.message
    })
  }
}

export const updateFood = async (req: RequestWithId, res: Response): Promise<void> => {
  try {
    const { uid }: any = req
    const { id }: any = req.params

    const restaurant: RestaurantModel | null = await Restaurant.findById(uid)
    if (!restaurant) {
      throw new Error('the restaurant does not exist here')
    }

    const food: FoodModel | null = await Food.findById(id)
    if (!food) {
      throw new Error('the food does not exist here')
    }

    const { name, description, image, rating, price }: any = req.body

    const newFood = await toUpdateFood({ name, description, image, rating, price })
    const updatedFood = await Food.findByIdAndUpdate(id, newFood, {
      new: true,
      runValidators: true,
      context: 'query'
    })

    res.status(200).json({
      ok: true,
      message: 'Food updated',
      data: updatedFood
    })
  } catch (error: any) {
    res.status(404).json({
      ok: false,
      message: 'Food coult not be updated',
      data: error.message
    })
  }
}

export const deleteFood = async (req: RequestWithId, res: Response): Promise<void> => {
  try {
    const { uid }: any = req
    const { id }: any = req.params
    const { categoryId }: any = req.body

    const restaurant: RestaurantModel | null = await Restaurant.findById(uid)
    if (!restaurant) {
      throw new Error('the restaurant does not exist here')
    }

    const category: CategoryModel | null = await Category.findById(categoryId)
    if (!category) {
      throw new Error('the category does not exist here')
    }

    const food: FoodModel | null = await Food.findById(id)
    if (!food) {
      throw new Error('the food does not exist here')
    }

    await Food.findByIdAndDelete(id)
    await restaurant.updateOne({
      $pull: {
        foodId: food._id
      }
    })
    await category.updateOne({
      $pull: {
        foodId: food._id
      }
    })

    res.status(200).json({
      ok: true,
      message: 'Food deleted',
      data: food
    })
  } catch (error: any) {
    res.status(404).json({
      ok: false,
      message: 'Food coult not be deleted',
      data: error.message
    })
  }
}
