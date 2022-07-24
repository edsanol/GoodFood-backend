"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewOrderEntry = exports.toUpdateDiner = exports.toNewDiner = exports.toUpdateFood = exports.toNewFood = exports.toNewCategory = exports.toUpdateRestaurantEntry = exports.toNewRestaurantEntry = void 0;
const parseString = (stringFromRequest) => {
    if (!isString(stringFromRequest)) {
        throw new Error(`${stringFromRequest} is using an incorrect format`);
    }
    return stringFromRequest;
};
const parseState = (stringFromRequest) => {
    if (!isString(stringFromRequest)) {
        return 'offline';
    }
    return stringFromRequest;
};
const parseLogo = (stringFromRequest) => {
    if (!isString(stringFromRequest)) {
        return 'https://ceslava.s3-accelerate.amazonaws.com/2016/04/mistery-man-gravatar-wordpress-avatar-persona-misteriosa.png';
    }
    return stringFromRequest;
};
const parseEmail = (emailFromRequest) => {
    if (!isString(emailFromRequest) || !isEmail(emailFromRequest)) {
        throw new Error('the email format is incorrect');
    }
    return emailFromRequest;
};
const parsePassword = (passwordFromRequest) => {
    if (!isString(passwordFromRequest) || !isPassword(passwordFromRequest)) {
        throw new Error('the password format is incorrect');
    }
    return passwordFromRequest;
};
const isPassword = (password) => {
    const passwordFormat = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    return passwordFormat.test(password);
};
const isEmail = (email) => {
    const emailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailFormat.test(email);
};
const isString = (string) => {
    return (typeof string === 'string');
};
const toNewRestaurantEntry = (Object) => {
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
    };
};
exports.toNewRestaurantEntry = toNewRestaurantEntry;
const toUpdateRestaurantEntry = (Object) => {
    return {
        admin: parseString(Object.admin),
        name: parseString(Object.name),
        phone: parseString(Object.phone),
        address: parseString(Object.address),
        city: parseString(Object.city),
        logo: parseLogo(Object.logo)
    };
};
exports.toUpdateRestaurantEntry = toUpdateRestaurantEntry;
const toNewCategory = (Object) => {
    return {
        name: parseString(Object.name),
        description: parseString(Object.description),
        image: parseLogo(Object.image)
    };
};
exports.toNewCategory = toNewCategory;
const toNewFood = (Object) => {
    return {
        restaurantId: Object.uid,
        categoryId: Object.categoryId,
        name: parseString(Object.name),
        description: parseString(Object.description),
        price: parseString(Object.price),
        image: parseLogo(Object.image),
        rating: parseString(Object.rating)
    };
};
exports.toNewFood = toNewFood;
const toUpdateFood = (Object) => {
    return {
        name: parseString(Object.name),
        description: parseString(Object.description),
        price: parseString(Object.price),
        image: Object.image,
        rating: parseString(Object.rating)
    };
};
exports.toUpdateFood = toUpdateFood;
const toNewDiner = (Object) => {
    return {
        name: parseString(Object.name),
        email: parseEmail(Object.email),
        password: parsePassword(Object.password),
        phone: parseString(Object.phone),
        address: parseString(Object.address),
        city: parseString(Object.city)
    };
};
exports.toNewDiner = toNewDiner;
const toUpdateDiner = (Object) => {
    return {
        name: parseString(Object.name),
        phone: parseString(Object.phone),
        address: parseString(Object.address),
        city: parseString(Object.city)
    };
};
exports.toUpdateDiner = toUpdateDiner;
const toNewOrderEntry = (Object) => {
    return {
        dinerId: Object.dinerId,
        restaurantId: Object.restaurantId,
        detail: Object.detail
    };
};
exports.toNewOrderEntry = toNewOrderEntry;
