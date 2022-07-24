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
exports.destroyRestaurants = exports.updateRestaurant = exports.showOneRestaurant = exports.listRestaurants = exports.tokenRevalidate = exports.restaurantLogin = exports.registerRestaurants = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../utils/jwt");
const validateFields_1 = require("../middlewares/validateFields");
const restaurant_model_1 = __importDefault(require("../models/restaurant.model"));
const food_model_1 = __importDefault(require("../models/food.model"));
const category_model_1 = __importDefault(require("../models/category.model"));
const diner_model_1 = __importDefault(require("../models/diner.model"));
const registerRestaurants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newRestaurants = yield (0, validateFields_1.toNewRestaurantEntry)(req.body);
        // Verificar que el email no exista
        const email = newRestaurants.email;
        const emailExists = yield restaurant_model_1.default.findOne({ email });
        if (emailExists) {
            throw new Error('the email already exists');
        }
        // Encrypta la contraseña
        const encryptPassword = yield bcrypt_1.default.hash(newRestaurants.password, 8);
        const restaurant = yield restaurant_model_1.default.create(Object.assign(Object.assign({}, newRestaurants), { password: encryptPassword }));
        const restaurantFromDB = yield restaurant_model_1.default.findById(restaurant.id).select('-password -createdAt -updatedAt');
        // Generar el JWT
        const token = yield (0, jwt_1.JWTgenerator)(restaurant.id);
        res.status(200).json({
            ok: true,
            message: 'User created',
            data: restaurantFromDB,
            token
        });
    }
    catch (error) {
        res.status(404).json({
            ok: false,
            message: 'Restaurant coult not be create',
            data: error.message
        });
    }
});
exports.registerRestaurants = registerRestaurants;
const restaurantLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Verificar si existe el correo
        const restaurantFromDB = yield restaurant_model_1.default.findOne({ email });
        if (!restaurantFromDB) {
            throw new Error('the email does not exist');
        }
        const restaurant = yield yield restaurant_model_1.default.findById(restaurantFromDB.id).select('-password -createdAt -updatedAt');
        // Validar el password
        const validPassword = bcrypt_1.default.compareSync(password, restaurantFromDB.password);
        if (!validPassword) {
            throw new Error('the password is incorrect');
        }
        // Generar el JWT
        const token = yield (0, jwt_1.JWTgenerator)(restaurantFromDB.id);
        res.json({
            ok: true,
            restaurant: restaurant,
            token,
            message: 'Restaurant logged'
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Incorrect Sesion',
            data: error.message
        });
    }
});
exports.restaurantLogin = restaurantLogin;
const tokenRevalidate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req;
    try {
        const restaurantFromDB = yield restaurant_model_1.default.findById(uid).select('-password -createdAt -updatedAt');
        if (!restaurantFromDB) {
            throw new Error('the restaurant does not exist');
        }
        // Generar el JWT
        const token = yield (0, jwt_1.JWTgenerator)(restaurantFromDB.id);
        res.json({
            ok: true,
            message: 'token revalidated',
            token,
            data: restaurantFromDB
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Incorrect Sesion',
            data: error.message
        });
    }
});
exports.tokenRevalidate = tokenRevalidate;
const listRestaurants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req;
    try {
        const dinerFromDB = yield diner_model_1.default.findById(uid);
        if (!dinerFromDB) {
            throw new Error('access denied');
        }
        const restaurants = yield restaurant_model_1.default.find().select('-password -createdAt -updatedAt');
        res.status(200).json({
            ok: true,
            message: 'Users found',
            data: restaurants
        });
    }
    catch (error) {
        res.status(404).json({
            ok: false,
            message: 'Restaurants coult not be found',
            data: error.message
        });
    }
});
exports.listRestaurants = listRestaurants;
// TODO: Implementar listar restaurantes por ciudad *******************************
const showOneRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: Implementar listar restaurantes mientras el usuario tenga token ********
    const { id } = req.params;
    try {
        const restaurant = yield restaurant_model_1.default.findById(id).select('-password -createdAt -updatedAt');
        if (!restaurant) {
            throw new Error('the restaurant does not exist here');
        }
        res.status(200).json({
            ok: true,
            message: 'Restaurant found',
            data: restaurant
        });
    }
    catch (error) {
        res.status(404).json({
            ok: false,
            message: 'Restaurant coult not be found',
            data: error.message
        });
    }
});
exports.showOneRestaurant = showOneRestaurant;
const updateRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { uid } = req;
    const { body } = req;
    try {
        const restaurant = yield restaurant_model_1.default.findById(id);
        if (!restaurant || restaurant.id !== uid) {
            throw new Error('the restaurant does not exist here');
        }
        const newRestaurant = yield (0, validateFields_1.toUpdateRestaurantEntry)(body);
        const updatedRestaurant = yield restaurant_model_1.default.findByIdAndUpdate(uid, newRestaurant, {
            new: true,
            runValidators: true,
            context: 'query'
        }).select('-password -createdAt -updatedAt');
        res.status(200).json({
            ok: true,
            message: 'Restaurant updated',
            data: updatedRestaurant
        });
    }
    catch (error) {
        res.status(404).json({
            ok: false,
            message: 'Restaurant coult not be updated',
            data: error.message
        });
    }
});
exports.updateRestaurant = updateRestaurant;
const destroyRestaurants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { uid } = req;
    try {
        const restaurant = yield restaurant_model_1.default.findById(id);
        if (!restaurant || restaurant.id !== uid) {
            throw new Error('the restaurant does not exist here');
        }
        yield restaurant_model_1.default.findByIdAndDelete(restaurant.id);
        // Elimina todos los platos creados por el restaurante
        const foodFromDB = yield food_model_1.default.find({ restaurantId: restaurant.id });
        if (foodFromDB.length > 0) {
            yield food_model_1.default.deleteMany({ restaurantId: restaurant.id });
        }
        // Elimina todos los platos recientemente eliminados del array foodId de las coleaciones de categorias
        for (const food of foodFromDB) {
            yield category_model_1.default.updateMany({
                $pull: {
                    foodId: food._id
                }
            });
        }
        res.status(200).json({
            ok: true,
            message: 'Restaurant deleted'
        });
    }
    catch (error) {
        res.status(404).json({
            ok: false,
            message: 'Restaurant coult not be deleted',
            data: error.message
        });
    }
});
exports.destroyRestaurants = destroyRestaurants;
