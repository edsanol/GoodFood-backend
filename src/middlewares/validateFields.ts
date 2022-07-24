import { NewRestaurantModel, newCategoryModel, UpdateRestaurantModel, newFoodModel, UpdateFoodModel, NewDinerModel, UpdateDinerModel, NewOrderModel } from '../utils/types'

const parseString = (stringFromRequest: any): string => {
  if (!isString(stringFromRequest)) {
    throw new Error(`${stringFromRequest as string} is using an incorrect format`)
  }
  return stringFromRequest
}

const parseState = (stringFromRequest: any): string => {
  if (!isString(stringFromRequest)) {
    return 'offline'
  }
  return stringFromRequest
}

const parseLogo = (stringFromRequest: any): string => {
  if (!isString(stringFromRequest)) {
    return 'https://ceslava.s3-accelerate.amazonaws.com/2016/04/mistery-man-gravatar-wordpress-avatar-persona-misteriosa.png'
  }
  return stringFromRequest
}

const parseEmail = (emailFromRequest: any): string => {
  if (!isString(emailFromRequest) || !isEmail(emailFromRequest)) {
    throw new Error('the email format is incorrect')
  }
  return emailFromRequest
}

const parsePassword = (passwordFromRequest: any): string => {
  if (!isString(passwordFromRequest) || !isPassword(passwordFromRequest)) {
    throw new Error('the password format is incorrect')
  }
  return passwordFromRequest
}

const isPassword = (password: any): boolean => {
  const passwordFormat = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
  return passwordFormat.test(password)
}

const isEmail = (email: string): boolean => {
  const emailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  return emailFormat.test(email)
}

const isString = (string: any): boolean => {
  return (typeof string === 'string')
}

export const toNewRestaurantEntry = (Object: any): NewRestaurantModel => {
  return {
    admin: parseString(Object.admin),
    name: parseString(Object.name),
    email: parseEmail(Object.email),
    password: parsePassword(Object.password),
    phone: parseString(Object.phone),
    address: parseString(Object.address),
    city: parseString(Object.city),
    state: parseState(Object.state),
    logo: parseLogo(Object.logo)
  }
}

export const toUpdateRestaurantEntry = (Object: any): UpdateRestaurantModel => {
  return {
    admin: parseString(Object.admin),
    name: parseString(Object.name),
    phone: parseString(Object.phone),
    address: parseString(Object.address),
    city: parseString(Object.city),
    logo: parseLogo(Object.logo)
  }
}

export const toNewCategory = (Object: any): newCategoryModel => {
  return {
    name: parseString(Object.name),
    description: parseString(Object.description),
    image: parseLogo(Object.image)
  }
}

export const toNewFood = (Object: any): newFoodModel => {
  return {
    restaurantId: Object.uid,
    categoryId: Object.categoryId,
    name: parseString(Object.name),
    description: parseString(Object.description),
    price: parseString(Object.price),
    image: parseLogo(Object.image),
    rating: parseString(Object.rating)
  }
}

export const toUpdateFood = (Object: any): UpdateFoodModel => {
  return {
    name: parseString(Object.name),
    description: parseString(Object.description),
    price: parseString(Object.price),
    image: Object.image,
    rating: parseString(Object.rating)
  }
}

export const toNewDiner = (Object: any): NewDinerModel => {
  return {
    name: parseString(Object.name),
    email: parseEmail(Object.email),
    password: parsePassword(Object.password),
    phone: parseString(Object.phone),
    address: parseString(Object.address),
    city: parseString(Object.city)
  }
}

export const toUpdateDiner = (Object: any): UpdateDinerModel => {
  return {
    name: parseString(Object.name),
    phone: parseString(Object.phone),
    address: parseString(Object.address),
    city: parseString(Object.city)
  }
}

export const toNewOrderEntry = (Object: any): NewOrderModel => {
  return {
    dinerId: Object.dinerId,
    restaurantId: Object.restaurantId,
    detail: Object.detail
  }
}
