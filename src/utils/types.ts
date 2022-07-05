import { RestaurantModel } from '../models/restaurant.model'

export type NewRestaurantModel = Pick<RestaurantModel, 'admin' | 'name' | 'email' | 'password' |
'phone' | 'address' | 'city' | 'state' | 'logo' >
