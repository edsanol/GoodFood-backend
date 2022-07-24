"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const foodSchema = new mongoose_1.Schema({
    restaurantId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    orderId: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Order' }],
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: 'https://ceslava.s3-accelerate.amazonaws.com/2016/04/mistery-man-gravatar-wordpress-avatar-persona-misteriosa.png'
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        default: '-'
    },
    price: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
foodSchema.set('toJSON', {
    transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});
exports.default = (0, mongoose_1.model)('Food', foodSchema);
