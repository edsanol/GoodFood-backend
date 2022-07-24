"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const restaurant_controller_1 = require("../controllers/restaurant.controller");
const validate_jwt_1 = require("../middlewares/validate-jwt");
const router = (0, express_1.Router)();
router.route('/register').post(restaurant_controller_1.registerRestaurants);
router.route('/login').post(restaurant_controller_1.restaurantLogin);
router.route('/renew').get(validate_jwt_1.validateJWT, restaurant_controller_1.tokenRevalidate);
router.route('/').get(validate_jwt_1.validateJWT, restaurant_controller_1.listRestaurants);
router.route('/:id').get(restaurant_controller_1.showOneRestaurant);
router.route('/:id').put(validate_jwt_1.validateJWT, restaurant_controller_1.updateRestaurant);
router.route('/:id').delete(validate_jwt_1.validateJWT, restaurant_controller_1.destroyRestaurants);
exports.default = router;