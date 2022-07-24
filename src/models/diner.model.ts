import { model, Schema, Document } from 'mongoose'
import { OrderModel } from './order.model'

export interface DinerModel extends Document {
  id: string
  orderId: OrderModel[]
  name: string
  email: string
  password: string
  phone: string
  address: string
  city: string
  createdAt: Date | string
  updatedAt: Date | string
}

const dinerSchema = new Schema({
  orderId: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
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
  }
},
{
  timestamps: true
})

dinerSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})

export default model<DinerModel>('Diner', dinerSchema)
