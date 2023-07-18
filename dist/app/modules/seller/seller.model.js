"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Seller = exports.sellerSchema = void 0;
const mongoose_1 = require("mongoose");
exports.sellerSchema = new mongoose_1.Schema({
    income: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});
exports.Seller = (0, mongoose_1.model)('Seller', exports.sellerSchema);
