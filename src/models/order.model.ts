import { model, Schema, Document } from 'mongoose'
import { DinerModel } from './diner.model'
import { RestaurantModel } from './restaurant.model'

export interface OrderModel extends Document {
  id: string
  dinerId: DinerModel
  restaurantId: RestaurantModel
  detail: any[]
}

const orderSchema = new Schema({
  dinerId: {
    type: Schema.Types.ObjectId,
    ref: 'Diner',
    required: true
  },
  restaurantId: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  detail: {
    type: Array,
    required: true
  }
},
{
  timestamps: true
})

orderSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})

export default model<OrderModel>('Order', orderSchema)
