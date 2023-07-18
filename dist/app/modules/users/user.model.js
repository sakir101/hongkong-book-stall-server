"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: {
            firstName: {
                type: String,
                required: true,
            },
            middleName: {
                type: String
            },
            lastName: {
                type: String,
                required: true,
            }
        }
    },
    address: {
        type: String,
        required: true,
    },
    buyer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Buyer'
    },
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Seller'
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});
exports.User = (0, mongoose_1.model)('User', userSchema);
