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
exports.UserService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const buyer_model_1 = require("../buyer/buyer.model");
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("./user.model");
const seller_model_1 = require("../seller/seller.model");
const user_constant_1 = require("./user.constant");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const createUser = (buyer, seller, user) => __awaiter(void 0, void 0, void 0, function* () {
    //password
    if (!user.password) {
        user.password = config_1.default.default_user_pass;
    }
    let newUserAllData = null;
    if (user.role === 'seller') {
        const session = yield mongoose_1.default.startSession();
        try {
            session.startTransaction();
            //array
            const newSeller = yield seller_model_1.Seller.create([seller], { session });
            if (!newSeller.length) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create seller');
            }
            user.seller = newSeller[0]._id;
            const newUser = yield user_model_1.User.create([user], { session });
            if (!newUser.length) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
            }
            newUserAllData = newUser[0];
            yield session.commitTransaction();
            yield session.endSession();
        }
        catch (error) {
            yield session.abortTransaction();
            yield session.endSession();
            throw error;
        }
    }
    if (user.role === 'buyer') {
        const session = yield mongoose_1.default.startSession();
        try {
            session.startTransaction();
            //array
            const newBuyer = yield buyer_model_1.Buyer.create([buyer], { session });
            if (!newBuyer.length) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create buyer');
            }
            user.buyer = newBuyer[0]._id;
            const newUser = yield user_model_1.User.create([user], { session });
            if (!newUser.length) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
            }
            newUserAllData = newUser[0];
            yield session.commitTransaction();
            yield session.endSession();
        }
        catch (error) {
            yield session.abortTransaction();
            yield session.endSession();
            throw error;
        }
    }
    return newUserAllData;
});
const getAllUsers = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: user_constant_1.userSearchableFields.map(field => ({
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
    const result = yield user_model_1.User.find(whereConditions)
        .populate('buyer')
        .populate('seller')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield user_model_1.User.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(id)
        .populate('buyer')
        .populate('seller');
    return result;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.User.findOne({ _id: id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const { name } = payload, userData = __rest(payload, ["name"]);
    const updateUserData = Object.assign({}, userData);
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach(key => {
            const nameKey = `name.${key}`;
            updateUserData[nameKey] = name[key];
        });
    }
    const result = yield user_model_1.User.findOneAndUpdate({ _id: id }, updateUserData, { new: true })
        .populate('buyer')
        .populate('seller');
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.User.findOne({ _id: id });
    const userData1 = yield user_model_1.User.findById(id).exec();
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found !');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        if ((userData1 === null || userData1 === void 0 ? void 0 : userData1.role) === 'buyer') {
            const buyerRes = yield buyer_model_1.Buyer.deleteOne({ _id: userData1.buyer });
            if (!buyerRes) {
                throw new ApiError_1.default(404, 'Failed to delete user');
            }
        }
        if ((userData1 === null || userData1 === void 0 ? void 0 : userData1.role) === 'seller') {
            const sellerRes = yield seller_model_1.Seller.deleteOne({ _id: userData1.seller });
            if (!sellerRes) {
                throw new ApiError_1.default(404, 'Failed to delete user');
            }
        }
        const user = yield user_model_1.User.deleteOne({ _id: id });
        if (!user) {
            throw new ApiError_1.default(404, 'Failed to delete user');
        }
        session.commitTransaction();
        session.endSession();
        return user;
    }
    catch (error) {
        session.abortTransaction();
        throw error;
    }
});
exports.UserService = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
};
