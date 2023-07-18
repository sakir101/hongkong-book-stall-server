"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Buyer = exports.buyerSchema = void 0;
const mongoose_1 = require("mongoose");
exports.buyerSchema = new mongoose_1.Schema({
    budget: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});
exports.Buyer = (0, mongoose_1.model)('Buyer', exports.buyerSchema);
