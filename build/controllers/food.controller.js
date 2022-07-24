"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFood = exports.updateFood = exports.showOneFood = exports.showAllFoodsByRestaurant = exports.showAllFoods = exports.createFood = void 0;
const food_model_1 = __importDefault(require("../models/food.model"));
const validateFields_1 = require("../middlewares/validateFields");
const restaurant_model_1 = __importDefault(require("../models/restaurant.model"));
const category_model_1 = __importDefault(require("../models/category.model"));
const createFood = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req;
        const restaurant = yield restaurant_model_1.default.findById(uid);
        if (!restaurant) {
            throw new Error('the restaurant does not exist here');
        }
        const { categoryId, name, description, image, rating, price } = req.body;
        const category = yield category_model_1.default.findById(categoryId);
        if (!category) {
            throw new Error('the category does not exist here');
        }
        const newFood = yield (0, validateFields_1.toNewFood)({ uid, categoryId, name, description, image, rating, price });
        const food = yield food_model_1.default.create(newFood);
        yield restaurant.updateOne({
            $push: {
                foodId: food
            }
        });
        yield category.updateOne({
            $push: {
                foodId: food
            }
        });
        res.status(200).json({
            ok: true,
            message: 'Food created',
            data: food
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            ok: false,
            message: 'Food coult not be create',
            data: error.message
        });
    }
});
exports.createFood = createFood;
const showAllFoods = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req;
        // TODO: Validar también con el token del usuario
        const restaurant = yield restaurant_model_1.default.findById(uid);
        if (!restaurant) {
            throw new Error('the restaurant does not exist here');
        }
        const foods = yield food_model_1.default.find();
        res.status(200).json({
            ok: true,
            message: 'Food found',
            data: foods
        });
    }
    catch (error) {
        res.status(404).json({
            ok: false,
            message: 'Food coult not be found',
            data: error.message
        });
    }
});
exports.showAllFoods = showAllFoods;
const showAllFoodsByRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req;
        // TODO: Validar también con el token del usuario
        const restaurant = yield restaurant_model_1.default.findById(uid);
        if (!restaurant) {
            throw new Error('the restaurant does not exist here');
        }
        const foods = yield food_model_1.default.find({ restaurantId: restaurant.id });
        res.status(200).json({
            ok: true,
            message: 'Food found',
            data: foods
        });
    }
    catch (error) {
        res.status(404).json({
            ok: false,
            message: 'Food coult not be found',
            data: error.message
        });
    }
});
exports.showAllFoodsByRestaurant = showAllFoodsByRestaurant;
const showOneFood = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req;
        const { id } = req.params;
        // TODO: Validar también con el token del usuario
        const restaurant = yield restaurant_model_1.default.findById(uid);
        if (!restaurant) {
            throw new Error('the restaurant does not exist here');
        }
        const food = yield food_model_1.default.findById(id);
        if (!food) {
            throw new Error('the food does not exist here');
        }
        res.status(200).json({
            ok: true,
            message: 'Food found',
            data: food
        });
    }
    catch (error) {
        res.status(404).json({
            ok: false,
            message: 'Food coult not be found',
            data: error.message
        });
    }
});
exports.showOneFood = showOneFood;
const updateFood = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req;
        const { id } = req.params;
        const restaurant = yield restaurant_model_1.default.findById(uid);
        if (!restaurant) {
            throw new Error('the restaurant does not exist here');
        }
        const food = yield food_model_1.default.findById(id);
        if (!food) {
            throw new Error('the food does not exist here');
        }
        const { name, description, image, rating, price } = req.body;
        const newFood = yield (0, validateFields_1.toUpdateFood)({ name, description, image, rating, price });
        const updatedFood = yield food_model_1.default.findByIdAndUpdate(id, newFood, {
            new: true,
            runValidators: true,
            context: 'query'
        });
        res.status(200).json({
            ok: true,
            message: 'Food updated',
            data: updatedFood
        });
    }
    catch (error) {
        res.status(404).json({
            ok: false,
            message: 'Food coult not be updated',
            data: error.message
        });
    }
});
exports.updateFood = updateFood;
const deleteFood = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req;
        const { id } = req.params;
        const { categoryId } = req.body;
        const restaurant = yield restaurant_model_1.default.findById(uid);
        if (!restaurant) {
            throw new Error('the restaurant does not exist here');
        }
        const category = yield category_model_1.default.findById(categoryId);
        if (!category) {
            throw new Error('the category does not exist here');
        }
        const food = yield food_model_1.default.findById(id);
        if (!food) {
            throw new Error('the food does not exist here');
        }
        yield food_model_1.default.findByIdAndDelete(id);
        yield restaurant.updateOne({
            $pull: {
                foodId: food._id
            }
        });
        yield category.updateOne({
            $pull: {
                foodId: food._id
            }
        });
        res.status(200).json({
            ok: true,
            message: 'Food deleted',
            data: food
        });
    }
    catch (error) {
        res.status(404).json({
            ok: false,
            message: 'Food coult not be deleted',
            data: error.message
        });
    }
});
exports.deleteFood = deleteFood;
