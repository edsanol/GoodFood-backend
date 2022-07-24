"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    dinerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Diner',
        required: true
    },
    restaurantId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    detail: {
        type: Array,
        required: true
    },
    success: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
orderSchema.set('toJSON', {
    transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});
exports.default = (0, mongoose_1.model)('Order', orderSchema);
