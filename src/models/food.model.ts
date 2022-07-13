import { model, Schema, Document } from 'mongoose'
import { RestaurantModel } from './restaurant.model'
import { CategoryModel } from './category.model'
import { OrderModel } from './order.model'

export interface FoodModel extends Document {
  id: string
  restaurantId: RestaurantModel
  categoryId: CategoryModel
  orderId: OrderModel[]
  name: string
  image: string
  description: string
  rating: string
  price: string
  createdAt: Date | string
  updatedAt: Date | string
}

const foodSchema = new Schema({
  restaurantId: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  orderId: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: 'https://ceslava.s3-accelerate.amazonaws.com/2016/04/mistery-man-gravatar-wordpress-avatar-persona-misteriosa.png'
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    default: '-'
  },
  price: {
    type: String,
    required: true
  }

},
{
  timestamps: true
})

foodSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})

export default model<FoodModel>('Food', foodSchema)
