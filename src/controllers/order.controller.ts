import { Response } from 'express'
import { RequestWithId } from '../middlewares/validate-jwt'
import Restaurant, { RestaurantModel } from '../models/restaurant.model'
import Order, { OrderModel } from '../models/order.model'
import { toNewOrderEntry } from '../middlewares/validateFields'
import Diner, { DinerModel } from '../models/diner.model'

export const createOrder = async (req: RequestWithId, res: Response): Promise<void> => {
  const { uid }: any = req

  try {
    const { dinerId, restaurantId }: any = req.body

    const restaurant: RestaurantModel | null = await Restaurant.findById(restaurantId)
    if (!restaurant) {
      throw new Error('the restaurant does not exist here')
    }

    const diner: DinerModel | null = await Diner.findById(dinerId)
    if (!diner || diner.id !== uid) {
      throw new Error('the diner does not exist here')
    }

    const newOrder = await toNewOrderEntry(req.body)
    const order: OrderModel = await Order.create(newOrder)

    await diner.updateOne({
      $push: {
        orderId: order
      }
    })

    await restaurant.updateOne({
      $push: {
        orderId: order
      }
    })

    res.status(200).json({
      ok: true,
      message: 'Order created',
      data: order
    })
  } catch (error: any) {
    console.log(error)
    res.status(404).json({
      ok: false,
      message: 'Order coult not be created',
      data: error.message
    })
  }
}

export const showAllOrders = async (req: RequestWithId, res: Response): Promise<void> => {
  try {
    const { uid }: any = req

    const diner: DinerModel | null = await Diner.findById(uid)
    const restaurant: RestaurantModel | null = await Restaurant.findById(uid)
    if (!diner && !restaurant) {
      throw new Error('you can not see orders because you are not a diner or a restaurant')
    }

    const orders: OrderModel[] = await Order.find()

    res.status(200).json({
      ok: true,
      message: 'Orders found',
      data: orders
    })
  } catch (error: any) {
    res.status(404).json({
      ok: false,
      message: 'Orders coult not be found',
      data: error.message
    })
  }
}

export const showOneOrder = async (req: RequestWithId, res: Response): Promise<void> => {
  try {
    const { uid }: any = req
    const { id }: any = req.params

    const diner: DinerModel | null = await Diner.findById(uid)
    const restaurant: RestaurantModel | null = await Restaurant.findById(uid)
    if (!diner && !restaurant) {
      throw new Error('you can not see orders because you are not a diner or a restaurant')
    }

    const order: OrderModel | null = await Order.findById(id)
    if (!order) {
      throw new Error('the order does not exist here')
    }

    res.status(200).json({
      ok: true,
      message: 'Order found',
      data: order
    })
  } catch (error: any) {
    res.status(404).json({
      ok: false,
      message: 'Order coult not be found',
      data: error.message
    })
  }
}

export const updateSuccesOrder = async (req: RequestWithId, res: Response) => {
  try {
    const { uid }: any = req
    const { id }: any = req.params
    const { data }: any = req.body
    const restaurant: RestaurantModel | null = await Restaurant.findById(uid)
    if (!restaurant) {
      throw new Error('you can not see orders because you are not a restaurant')
    }

    const order: OrderModel | null = await Order.findById(id)
    if (!order) {
      throw new Error('the order does not exist here')
    }

    order.success = data
    await order.save()

    res.status(200).json({
      ok: true,
      message: 'Order updated',
      data: order
    })
  } catch (error: any) {
    res.status(404).json({
      ok: false,
      message: 'Order coult not be updated',
      data: error.message
    })
  }
}
