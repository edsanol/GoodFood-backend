import { model, Schema, Document } from 'mongoose'

export interface RestaurantModel extends Document {
  id: string
  foodId: string[]
  admin: string
  name: string
  email: string
  password: string
  phone: string
  address: string
  city: string
  state: string
  logo: string
  rating: string
  createdAt: Date | string
  updatedAt: Date | string
}

const restaurantSchema = new Schema({
  foodId: {
    type: String
  },
  admin: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    default: 'offline'
  },
  logo: {
    type: String,
    default: 'https://ceslava.s3-accelerate.amazonaws.com/2016/04/mistery-man-gravatar-wordpress-avatar-persona-misteriosa.png'
  },
  rating: {
    type: String
  }
},
{
  timestamps: true
})

restaurantSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})

export default model<RestaurantModel>('Restaurant', restaurantSchema)
