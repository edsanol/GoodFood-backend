import { model, Schema, Document } from 'mongoose'
import { FoodModel } from './food.model'

export interface CategoryModel extends Document {
  id: string
  foodId: FoodModel[]
  name: string
  image: string
  description: string
  createdAt: Date | string
  updatedAt: Date | string
}

const categorySchema = new Schema({
  foodId: [{
    type: Array,
    ref: 'Food'
  }],
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
  }
},
{
  timestamps: true
})

categorySchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})

export default model<CategoryModel>('Category', categorySchema)
