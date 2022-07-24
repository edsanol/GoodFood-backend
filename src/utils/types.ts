import { RestaurantModel } from '../models/restaurant.model'
import { CategoryModel } from '../models/category.model'
import { FoodModel } from '../models/food.model'
import { DinerModel } from '../models/diner.model'
import { OrderModel } from '../models/order.model'

export type NewRestaurantModel = Pick<RestaurantModel, 'admin' | 'name' | 'email' | 'password' |
'phone' | 'address' | 'city' | 'state' | 'logo' >
export type UpdateRestaurantModel = Pick<RestaurantModel, 'admin' | 'name' | 'phone' | 'address' | 'city' | 'logo' >

export type newCategoryModel = Pick<CategoryModel, 'name' | 'description' | 'image' >

export type newFoodModel = Pick<FoodModel, 'restaurantId' | 'categoryId' | 'name' | 'description' | 'image' | 'rating' | 'price' >
export type UpdateFoodModel = Pick<FoodModel, 'name' | 'description' | 'image' | 'rating' | 'price' >

export type NewDinerModel = Pick<DinerModel, 'name' | 'email' | 'password' | 'phone' | 'address' | 'city' >
export type UpdateDinerModel = Pick<DinerModel, 'name' | 'phone' | 'address' | 'city' >

export type NewOrderModel = Pick<OrderModel, 'dinerId' | 'restaurantId' | 'detail' >
