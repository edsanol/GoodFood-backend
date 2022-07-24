"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    foodId: [{
            type: Array,
            ref: 'Food'
        }],
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
    }
}, {
    timestamps: true
});
categorySchema.set('toJSON', {
    transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});
exports.default = (0, mongoose_1.model)('Category', categorySchema);
