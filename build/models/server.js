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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const restaurant_1 = __importDefault(require("../routes/restaurant"));
const category_1 = __importDefault(require("../routes/category"));
const food_1 = __importDefault(require("../routes/food"));
const diner_1 = __importDefault(require("../routes/diner"));
const order_1 = __importDefault(require("../routes/order"));
const http_1 = __importDefault(require("http"));
const socket_model_1 = __importDefault(require("../models/socket.model"));
const socketIo = require('socket.io');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = `${process.env.PORT}`;
        this.server = http_1.default.createServer(this.app);
        this.io = socketIo(this.server, {});
    }
    middleware() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        // End points
        this.app.use('/api/restaurant', restaurant_1.default);
        this.app.use('/api/category', category_1.default);
        this.app.use('/api/food', food_1.default);
        this.app.use('/api/diner', diner_1.default);
        this.app.use('/api/order', order_1.default);
        // Stripe
        this.app.post('/api/pay', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { amount } = req.body;
                const paymentIntent = yield stripe.paymentIntents.create({
                    amount: amount * 100,
                    currency: 'usd',
                    payment_method_types: ['card'],
                    description: 'Good Food charge',
                });
                const clientSecret = paymentIntent.client_secret;
                res.json({ message: 'Payment initiated', clientSecret });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: 'Internal server error' });
            }
        }));
    }
    configSocket() {
        new socket_model_1.default(this.io);
    }
    execute() {
        this.middleware();
        this.configSocket();
    }
}
exports.default = Server;
