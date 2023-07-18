"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookList = void 0;
const mongoose_1 = require("mongoose");
const bookListSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    publicationDate: {
        type: String,
        required: true,
    },
    publicationYear: {
        type: String,
    },
    publisherEmail: {
        type: String,
        required: true,
    },
    rating: {
        type: [String],
    },
    avgRating: {
        type: Number,
    },
    comments: {
        type: [String],
    },
    status: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});
exports.BookList = (0, mongoose_1.model)('BookList', bookListSchema);
