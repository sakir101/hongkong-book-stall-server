"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const book_constant_1 = require("./book.constant");
const book_model_1 = require("./book.model");
const wishList_model_1 = require("../wishList/wishList.model");
const booklist_model_1 = require("../booklist/booklist.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = require("http-status");
const createBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const publicationYear = payload.publicationDate.split("-")[0];
    const bookData = Object.assign(Object.assign({}, payload), { publicationYear: publicationYear, rating: [], avgRating: 0, comments: [] });
    const result = yield book_model_1.Book.create(bookData);
    return result;
});
const addBookToWishList = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wishList_model_1.WishList.create(payload);
    return result;
});
const addBookToBookList = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newBookData = Object.assign(Object.assign({}, payload), { status: 'reading' });
    console.log(newBookData);
    const result = yield booklist_model_1.BookList.create(newBookData);
    return result;
});
const getAllBooks = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: book_constant_1.bookSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i'
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value
            }))
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortConditions) {
        sortConditions[sortBy] = sortOrder;
    }
    if (Object.keys(filtersData)[0] === 'maxRate') {
        const topRatedBooks = yield book_model_1.Book.find().sort({ avgRating: -1 }).limit(10);
        const total = yield book_model_1.Book.countDocuments(topRatedBooks);
        return {
            meta: {
                page,
                limit,
                total
            },
            data: topRatedBooks
        };
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield book_model_1.Book.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield book_model_1.Book.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
});
const getAllBooksFromWishList = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: book_constant_1.bookSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i'
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value
            }))
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortConditions) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield wishList_model_1.WishList.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield wishList_model_1.WishList.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
});
const getAllBooksFromBookList = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: book_constant_1.bookSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i'
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value
            }))
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortConditions) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield booklist_model_1.BookList.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield booklist_model_1.BookList.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findById(id);
    return result;
});
const updateBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { comments, rating } = payload, restPayload = __rest(payload, ["comments", "rating"]);
    if (comments === undefined) {
        const result = yield book_model_1.Book.findOneAndUpdate({ _id: id }, payload, { new: true });
        return result;
    }
    const result = yield book_model_1.Book.findOneAndUpdate({ _id: id }, { $set: restPayload, $push: { comments: { $each: comments }, rating: { $each: rating } } }, { new: true });
    const book = yield book_model_1.Book.findById(id);
    if (!book) {
        throw new ApiError_1.default(http_status_1.NOT_FOUND, "Book Data not found");
    }
    const ratings = book.rating.map((value) => Number(value));
    const totalRating = ratings.reduce((sum, rating) => sum + rating, 0);
    const averageRating = totalRating / ratings.length;
    const averageRatingInteger = Math.round(averageRating);
    const result2 = yield book_model_1.Book.findOneAndUpdate({ _id: id }, { $set: { avgRating: averageRatingInteger } }, { new: true });
    return result2;
});
const updateBookList = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booklist_model_1.BookList.findOneAndUpdate({ _id: id }, payload, { new: true });
    return result;
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findByIdAndDelete(id);
    return result;
});
const deleteBookFRomWishList = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wishList_model_1.WishList.findByIdAndDelete(id);
    return result;
});
exports.BookService = {
    createBook,
    addBookToWishList,
    addBookToBookList,
    getAllBooks,
    getAllBooksFromWishList,
    getAllBooksFromBookList,
    getSingleBook,
    updateBook,
    updateBookList,
    deleteBook,
    deleteBookFRomWishList
};
