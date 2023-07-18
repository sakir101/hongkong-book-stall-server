"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderHistory = exports.orderHistorySchema = void 0;
const mongoose_1 = require("mongoose");
exports.orderHistorySchema = new mongoose_1.Schema({
    cow: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'CowModel',
        required: true
    },
    buyer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Buyer',
        required: true
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});
exports.OrderHistory = (0, mongoose_1.model)('OrderHistory', exports.orderHistorySchema);
