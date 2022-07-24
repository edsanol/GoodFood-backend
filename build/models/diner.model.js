"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dinerSchema = new mongoose_1.Schema({
    orderId: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Order' }],
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
dinerSchema.set('toJSON', {
    transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});
exports.default = (0, mongoose_1.model)('Diner', dinerSchema);
