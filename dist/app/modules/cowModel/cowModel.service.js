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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowModelService = void 0;
const cowModel_model_1 = require("./cowModel.model");
const cowModel_constant_1 = require("./cowModel.constant");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const createCowModel = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cowModel_model_1.CowModel.create(payload);
    return result;
});
const getAllCowModels = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    console.log(searchTerm);
    console.log(Object.keys(filtersData)[0]);
    console.log(Object.keys(filtersData)[1]);
    const andConditions = [];
    const priceCond = [];
    if (searchTerm) {
        andConditions.push({
            $or: cowModel_constant_1.cowModelSearchableFields.map(field => ({
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
    if (Object.keys(filtersData)[0] === 'maxPrice') {
        if (Object.keys(filtersData)[1] === 'minPrice') {
            const result = yield cowModel_model_1.CowModel.find({ price: { $gt: Object.values(filtersData)[1], $lt: Object.values(filtersData)[0] } })
                .populate('seller')
                .sort(sortConditions)
                .skip(skip)
                .limit(limit);
            const total = yield cowModel_model_1.CowModel.countDocuments({ price: { $gt: Object.values(filtersData)[1], $lt: Object.values(filtersData)[0] } });
            return {
                meta: {
                    page,
                    limit,
                    total
                },
                data: result
            };
        }
    }
    if (Object.keys(filtersData)[0] === 'maxPrice') {
        console.log(andConditions);
        const result = yield cowModel_model_1.CowModel.find({ price: { $lt: Object.values(filtersData)[0] } })
            .populate('seller')
            .sort(sortConditions)
            .skip(skip)
            .limit(limit);
        const total = yield cowModel_model_1.CowModel.countDocuments({ price: { $lt: Object.values(filtersData)[0] } });
        return {
            meta: {
                page,
                limit,
                total
            },
            data: result
        };
    }
    if (Object.keys(filtersData)[0] === 'minPrice') {
        console.log(andConditions);
        const result = yield cowModel_model_1.CowModel.find({ price: { $gt: Object.values(filtersData)[0] } })
            .populate('seller')
            .sort(sortConditions)
            .skip(skip)
            .limit(limit);
        const total = yield cowModel_model_1.CowModel.countDocuments({ price: { $gt: Object.values(filtersData)[0] } });
        return {
            meta: {
                page,
                limit,
                total
            },
            data: result
        };
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield cowModel_model_1.CowModel.find(whereConditions)
        .populate('seller')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield cowModel_model_1.CowModel.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
});
const getSingleCowModel = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cowModel_model_1.CowModel.findById(id).populate('seller');
    return result;
});
const updateCowModel = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cowModel_model_1.CowModel.findOneAndUpdate({ _id: id }, payload, { new: true }).populate('seller');
    return result;
});
const deleteCowModel = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cowModel_model_1.CowModel.findByIdAndDelete(id).populate('seller');
    return result;
});
exports.CowModelService = {
    createCowModel,
    getAllCowModels,
    getSingleCowModel,
    updateCowModel,
    deleteCowModel
};
