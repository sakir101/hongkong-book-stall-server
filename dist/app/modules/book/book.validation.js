"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidation = void 0;
const zod_1 = require("zod");
const createBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Title is required"
        }),
        author: zod_1.z.string({
            required_error: "Author name is required"
        }),
        genre: zod_1.z.string({
            required_error: "Genre is required"
        }),
        img: zod_1.z.string({
            required_error: "Image is required"
        }),
        publicationDate: zod_1.z.string({
            required_error: "Publication date is required"
        }),
        publisherEmail: zod_1.z.string({
            required_error: "Publisher email is required"
        }),
    })
});
const updateBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        author: zod_1.z.string().optional(),
        genre: zod_1.z.string().optional(),
        img: zod_1.z.string().optional(),
        publicationDate: zod_1.z.string().optional(),
        publisherEmail: zod_1.z.string().optional(),
    }).optional()
});
exports.BookValidation = {
    createBookZodSchema,
    updateBookZodSchema
};
