import { RestaurantModel } from '../models/restaurant.model'
import { CategoryModel } from '../models/category.model'
import { FoodModel } from '../models/food.model'

export type NewRestaurantModel = Pick<RestaurantModel, 'admin' | 'name' | 'email' | 'password' |
'phone' | 'address' | 'city' | 'state' | 'logo' >

export type UpdateRestaurantModel = Pick<RestaurantModel, 'admin' | 'name' | 'phone' | 'address' | 'city' | 'logo' >

export type newCategoryModel = Pick<CategoryModel, 'name' | 'description' | 'image' >
export type newFoodModel = Pick<FoodModel, 'restaurantId' | 'categoryId' | 'name' | 'description' | 'image' | 'rating' | 'price' >
export type UpdateFoodModel = Pick<FoodModel, 'name' | 'description' | 'image' | 'rating' | 'price' >
