import { Request, Response } from 'express'
import Diner, { DinerModel } from '../models/diner.model'
import bcrypt from 'bcrypt'
import { JWTgenerator } from '../utils/jwt'
import { toNewDiner, toUpdateDiner } from '../middlewares/validateFields'
import { RequestWithId } from '../middlewares/validate-jwt'
import Restaurant, { RestaurantModel } from '../models/restaurant.model';

export const registerDiner = async (req: Request, res: Response): Promise<void> => {
  try {
    const newDiner = await toNewDiner(req.body)

    // Verificar que el email no exista
    const email: string = newDiner.email
    const emailExists: DinerModel | null = await Diner.findOne({ email })

    if (emailExists) {
      throw new Error('the email already exists')
    }

    // Encrypta la contraseña
    const encryptPassword = await bcrypt.hash(newDiner.password, 8)
    const diner: DinerModel = await Diner.create({ ...newDiner, password: encryptPassword })

    // Generar el JWT
    const token = await JWTgenerator(diner.id)

    res.status(200).json({
      ok: true,
      message: 'Diner created',
      data: diner,
      token: token
    })
  } catch (error: any) {
    res.status(404).json({
      ok: false,
      message: 'Diner coult not be created',
      data: error.message
    })
  }
}

export const DinerLogin = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body

  try {
    // Verificar si existe el correo
    const dinerFromDB: DinerModel | null = await Diner.findOne({ email })
    if (!dinerFromDB) {
      throw new Error('the email does not exist')
    }

    // Validar el password
    const validPassword = bcrypt.compareSync(password, dinerFromDB.password)
    if (!validPassword) {
      throw new Error('the password is incorrect')
    }

    // Generar el JWT
    const token = await JWTgenerator(dinerFromDB.id)

    res.status(200).json({
      ok: true,
      message: 'Diner logged',
      data: dinerFromDB,
      token: token
    })
  } catch (error: any) {
    res.status(404).json({
      ok: false,
      message: 'User or password incorrect',
      data: error.message
    })
  }
}

export const tokenRevalidate = async (req: RequestWithId, res: Response): Promise<void> => {
  const { uid }: any = req

  try {
    const dinerFromDB: DinerModel | null = await Diner.findById(uid).select('-password -createdAt -updatedAt')
    if (!dinerFromDB) {
      throw new Error('the diner does not exist')
    }

    // Generar el JWT
    const token = await JWTgenerator(dinerFromDB.id)

    res.json({
      ok: true,
      message: 'token revalidated',
      token,
      data: dinerFromDB
    })
  } catch (error: any) {
    res.status(500).json({
      ok: false,
      message: 'Incorrect Sesion',
      data: error.message
    })
  }
}

export const showAllDiners = async (req: RequestWithId, res: Response): Promise<void> => {
  const { uid }: any = req

  try {
    const restaurant: RestaurantModel | null = await Restaurant.findById(uid)
    
    if (!restaurant) {
      throw new Error('you can not see orders because you are not a diner or a restaurant')
    }
    const diner: DinerModel[] = await Diner.find()

    res.status(200).json({
      ok: true,
      message: 'Diner found',
      data: diner
    })
  } catch (error: any) {
    res.status(404).json({
      ok: false,
      message: 'Diner coult not be found',
      data: error.message
    })
  }
}

export const showOneDiner = async (req: RequestWithId, res: Response): Promise<void> => {
  const { id } = req.params
  const { uid }: any = req

  try {
    const diner: DinerModel | null = await Diner.findById(id)
    const restaurant: RestaurantModel | null = await Restaurant.findById(uid)

    if (!diner && !restaurant) {
      throw new Error('you can not see orders because you are not a diner or a restaurant')
    }

    res.status(200).json({
      ok: true,
      message: 'Diner found',
      data: diner
    })
  } catch (error: any) {
    res.status(404).json({
      ok: false,
      message: 'Diner coult not be found',
      data: error.message
    })
  }
}

export const updateDiner = async (req: RequestWithId, res: Response): Promise<void> => {
  const { id } = req.params
  const { uid }: any = req

  try {
    const newDiner = await toUpdateDiner(req.body)
    const diner: DinerModel | null = await Diner.findById(id)
    if (!diner || diner.id !== uid) {
      throw new Error('the diner does not exist')
    }

    const dinerUpdated: DinerModel | null = await Diner.findByIdAndUpdate(id, newDiner, {
      new: true,
      runValidators: true,
      context: 'query'
    })
    if (!dinerUpdated) {
      throw new Error('the diner could not be updated')
    }

    res.status(200).json({
      ok: true,
      message: 'Diner updated',
      data: dinerUpdated
    })
  } catch (error: any) {
    res.status(404).json({
      ok: false,
      message: 'Diner coult not be updated',
      data: error.message
    })
  }
}

export const destroyDiner = async (req: RequestWithId, res: Response): Promise<void> => {
  const { id } = req.params
  const { uid }: any = req

  try {
    const diner: DinerModel | null = await Diner.findById(id)
    if (!diner || diner.id !== uid) {
      throw new Error('the diner does not exist')
    }

    const dinerDeleted: DinerModel | null = await Diner.findByIdAndDelete(id)
    if (!dinerDeleted) {
      throw new Error('the diner could not be deleted')
    }

    // TODO: Eliminar orden en cascada

    res.status(200).json({
      ok: true,
      message: 'Diner deleted',
      data: dinerDeleted
    })
  } catch (error: any) {
    res.status(404).json({
      ok: false,
      message: 'Diner coult not be deleted',
      data: error.message
    })
  }
}
