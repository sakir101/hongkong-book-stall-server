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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderHistoryService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const orderHistory_model_1 = require("./orderHistory.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const buyer_model_1 = require("../buyer/buyer.model");
const cowModel_model_1 = require("../cowModel/cowModel.model");
const seller_model_1 = require("../seller/seller.model");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const createOrderHistory = (orderHistory) => __awaiter(void 0, void 0, void 0, function* () {
    const buyerId = orderHistory.buyer;
    const cowModelId = orderHistory.cow;
    let newOrderHistoryAllData;
    try {
        const buyerData = yield buyer_model_1.Buyer.findById(buyerId).exec();
        const cowData = yield cowModel_model_1.CowModel.findById(cowModelId).exec();
        const sellerData = yield seller_model_1.Seller.findById(cowData === null || cowData === void 0 ? void 0 : cowData.seller).exec();
        if (buyerData === null || cowData === null || sellerData === null) {
            throw new Error("Data not found");
        }
        else {
            let budget = (buyerData === null || buyerData === void 0 ? void 0 : buyerData.budget);
            let price = (cowData === null || cowData === void 0 ? void 0 : cowData.price);
            let income = (sellerData === null || sellerData === void 0 ? void 0 : sellerData.income);
            if (cowData.label === 'for sale') {
                if (budget >= price) {
                    const session = yield mongoose_1.default.startSession();
                    try {
                        session.startTransaction();
                        let current = budget - price;
                        buyer_model_1.Buyer.updateOne({ _id: buyerData === null || buyerData === void 0 ? void 0 : buyerData._id }, { budget: current })
                            .exec()
                            .then(result => {
                            console.log(result);
                        })
                            .catch(err => {
                            throw err;
                            console.error(err);
                        });
                        let income2 = parseInt(income) + parseInt(price);
                        seller_model_1.Seller.updateOne({ _id: sellerData === null || sellerData === void 0 ? void 0 : sellerData._id }, { income: income2 })
                            .exec()
                            .then(result => {
                            console.log(result);
                        })
                            .catch(err => {
                            throw err;
                            console.error(err);
                        });
                        cowModel_model_1.CowModel.updateOne({ _id: cowModelId }, { label: 'sold out' })
                            .exec()
                            .then(result => {
                            console.log(result);
                        })
                            .catch(err => {
                            throw err;
                        });
                        const newOrderHistory = yield orderHistory_model_1.OrderHistory.create([orderHistory], { session });
                        if (!newOrderHistory.length) {
                            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create order history');
                        }
                        newOrderHistoryAllData = newOrderHistory[0];
                        yield session.commitTransaction();
                        yield session.endSession();
                        console.log(newOrderHistoryAllData);
                    }
                    catch (error) {
                        yield session.abortTransaction();
                        yield session.endSession();
                        throw error;
                    }
                }
                else {
                    throw new Error("Budget is too low");
                }
            }
            else {
                throw new Error("Cow is sold");
            }
        }
    }
    catch (err) {
        throw err;
    }
    return newOrderHistoryAllData;
});
const getAllOrderHistories = (paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortConditions) {
        sortConditions[sortBy] = sortOrder;
    }
    const result = yield orderHistory_model_1.OrderHistory.find()
        .populate('cow')
        .populate('buyer')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield orderHistory_model_1.OrderHistory.countDocuments();
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
});
exports.OrderHistoryService = {
    createOrderHistory,
    getAllOrderHistories
};
