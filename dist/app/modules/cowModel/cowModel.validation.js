"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowModelValidation = void 0;
const zod_1 = require("zod");
const cowModel_constant_1 = require("./cowModel.constant");
const createCowModelZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required"
        }),
        age: zod_1.z.number({
            required_error: "Age is required"
        }),
        price: zod_1.z.number({
            required_error: "Price is required"
        }),
        location: zod_1.z.string({
            required_error: "Location is required"
        }),
        breed: zod_1.z.enum([...cowModel_constant_1.cowModelBreed], {
            required_error: "Breed is required"
        }),
        weight: zod_1.z.number({
            required_error: "Weight is required"
        }),
        label: zod_1.z.enum([...cowModel_constant_1.cowModelLabel], {
            required_error: "Label is required"
        }),
        category: zod_1.z.enum([...cowModel_constant_1.cowModelCategory], {
            required_error: "Category is required"
        }),
        seller: zod_1.z.string({
            required_error: "Seller is required"
        })
    })
});
const updateCowModelZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        age: zod_1.z.number().optional(),
        price: zod_1.z.number().optional(),
        location: zod_1.z.string().optional(),
        breed: zod_1.z.enum([...cowModel_constant_1.cowModelBreed]).optional(),
        weight: zod_1.z.number().optional(),
        label: zod_1.z.enum([...cowModel_constant_1.cowModelLabel]).optional(),
        category: zod_1.z.enum([...cowModel_constant_1.cowModelCategory]).optional(),
        seller: zod_1.z.string().optional()
    }).optional()
});
exports.CowModelValidation = {
    createCowModelZodSchema,
    updateCowModelZodSchema
};
