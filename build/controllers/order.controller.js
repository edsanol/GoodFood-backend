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
exports.updateSuccesOrder = exports.showOneOrder = exports.showAllOrders = exports.createOrder = void 0;
const restaurant_model_1 = __importDefault(require("../models/restaurant.model"));
const order_model_1 = __importDefault(require("../models/order.model"));
const validateFields_1 = require("../middlewares/validateFields");
const diner_model_1 = __importDefault(require("../models/diner.model"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req;
    try {
        const { dinerId, restaurantId } = req.body;
        const restaurant = yield restaurant_model_1.default.findById(restaurantId);
        if (!restaurant) {
            throw new Error('the restaurant does not exist here');
        }
        const diner = yield diner_model_1.default.findById(dinerId);
        if (!diner || diner.id !== uid) {
            throw new Error('the diner does not exist here');
        }
        const newOrder = yield (0, validateFields_1.toNewOrderEntry)(req.body);
        const order = yield order_model_1.default.create(newOrder);
        yield diner.updateOne({
            $push: {
                orderId: order
            }
        });
        yield restaurant.updateOne({
            $push: {
                orderId: order
            }
        });
        res.status(200).json({
            ok: true,
            message: 'Order created',
            data: order
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            ok: false,
            message: 'Order coult not be created',
            data: error.message
        });
    }
});
exports.createOrder = createOrder;
const showAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req;
        const diner = yield diner_model_1.default.findById(uid);
        const restaurant = yield restaurant_model_1.default.findById(uid);
        if (!diner && !restaurant) {
            throw new Error('you can not see orders because you are not a diner or a restaurant');
        }
        const orders = yield order_model_1.default.find();
        res.status(200).json({
            ok: true,
            message: 'Orders found',
            data: orders
        });
    }
    catch (error) {
        res.status(404).json({
            ok: false,
            message: 'Orders coult not be found',
            data: error.message
        });
    }
});
exports.showAllOrders = showAllOrders;
const showOneOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req;
        const { id } = req.params;
        const diner = yield diner_model_1.default.findById(uid);
        const restaurant = yield restaurant_model_1.default.findById(uid);
        if (!diner && !restaurant) {
            throw new Error('you can not see orders because you are not a diner or a restaurant');
        }
        const order = yield order_model_1.default.findById(id);
        if (!order) {
            throw new Error('the order does not exist here');
        }
        res.status(200).json({
            ok: true,
            message: 'Order found',
            data: order
        });
    }
    catch (error) {
        res.status(404).json({
            ok: false,
            message: 'Order coult not be found',
            data: error.message
        });
    }
});
exports.showOneOrder = showOneOrder;
const updateSuccesOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req;
        const { id } = req.params;
        const { data } = req.body;
        const restaurant = yield restaurant_model_1.default.findById(uid);
        if (!restaurant) {
            throw new Error('you can not see orders because you are not a restaurant');
        }
        const order = yield order_model_1.default.findById(id);
        if (!order) {
            throw new Error('the order does not exist here');
        }
        order.success = data;
        yield order.save();
        res.status(200).json({
            ok: true,
            message: 'Order updated',
            data: order
        });
    }
    catch (error) {
        res.status(404).json({
            ok: false,
            message: 'Order coult not be updated',
            data: error.message
        });
    }
});
exports.updateSuccesOrder = updateSuccesOrder;
