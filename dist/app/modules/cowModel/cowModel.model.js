"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowModel = void 0;
const mongoose_1 = require("mongoose");
const cowModel_constant_1 = require("./cowModel.constant");
const cowModelSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
        enum: cowModel_constant_1.cowModelLocation
    },
    breed: {
        type: String,
        required: true,
        enum: cowModel_constant_1.cowModelBreed
    },
    weight: {
        type: Number,
        required: true,
    },
    label: {
        type: String,
        required: true,
        enum: cowModel_constant_1.cowModelLabel
    },
    category: {
        type: String,
        required: true,
        enum: cowModel_constant_1.cowModelCategory
    },
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Seller',
        required: true
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});
exports.CowModel = (0, mongoose_1.model)('CowModel', cowModelSchema);
