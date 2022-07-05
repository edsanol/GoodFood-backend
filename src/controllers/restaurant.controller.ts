import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { JWTgenerator } from '../utils/jwt'
import { toNewRestaurantEntry } from '../middlewares/validateFields'
import Restaurant, { RestaurantModel } from '../models/restaurant.model'
import { RequestWithId } from '../middlewares/validate-jwt'

export const registerRestaurants = async (req: Request, res: Response): Promise<void> => {
  try {
    const newRestaurants = await toNewRestaurantEntry(req.body)

    // Verificar que el email no exista
    const email: string = newRestaurants.email
    const emailExists: RestaurantModel | null = await Restaurant.findOne({ email })

    if (emailExists) {
      throw new Error('the email already exists')
    }

    // Encrypta la contraseña
    const encryptPassword = await bcrypt.hash(newRestaurants.password, 8)
    const restaurant: RestaurantModel = await Restaurant.create({ ...newRestaurants, password: encryptPassword })

    // Generar el JWT
    const token = await JWTgenerator(restaurant.id)
    res.status(200).json({
      ok: true,
      message: 'User created',
      data: restaurant,
      token
    })
  } catch (error: any) {
    res.status(404).json({
      ok: false,
      message: 'Restaurant coult not be create',
      data: error.message
    })
  }
}

export const restaurantLogin = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body

  try {
    // Verificar si existe el correo
    const restaurantFromDB: RestaurantModel | null = await Restaurant.findOne({ email })
    if (!restaurantFromDB) {
      throw new Error('the email does not exist')
    }

    // Validar el password
    const validPassword = bcrypt.compareSync(password, restaurantFromDB.password)
    if (!validPassword) {
      throw new Error('the password is incorrect')
    }

    // Generar el JWT
    const token = await JWTgenerator(restaurantFromDB.id)

    res.json({
      ok: true,
      restaurant: restaurantFromDB,
      token,
      message: 'Restaurant logged'
    })
  } catch (error: any) {
    res.status(500).json({
      ok: false,
      message: 'Incorrect Sesion',
      data: error.message
    })
  }
}

export const listRestaurants = async (_req: Request, res: Response): Promise<void> => {
  // TODO: Implementar listar restaurantes mientras el usuario tenga token ********

  try {
    const restaurants: RestaurantModel[] = await Restaurant.find().select('-password -createdAt -updatedAt')
    res.status(200).json({
      ok: true,
      message: 'Users found',
      data: restaurants
    })
  } catch (error: any) {
    res.status(404).json({
      ok: false,
      message: 'Restaurants coult not be found',
      data: error.message
    })
  }
}

// TODO: Implementar listar restaurantes por ciudad *******************************
// TODO: Implementar busqueda de restaurantes por id y token de usuario ***********

export const destroyRestaurants = async (req: RequestWithId, res: Response): Promise<void> => {
  const { id } = req.params
  const { uid }: any = req

  try {
    const restaurant: RestaurantModel | null = await Restaurant.findById(id)
    if (!restaurant || restaurant.id !== uid) {
      throw new Error('the restaurant does not exist here')
    }

    await Restaurant.findByIdAndDelete(restaurant.id)

    res.status(200).json({
      ok: true,
      message: 'Restaurant deleted'
    })
  } catch (error: any) {
    res.status(404).json({
      ok: false,
      message: 'Restaurant coult not be deleted',
      data: error.message
    })
  }
}
