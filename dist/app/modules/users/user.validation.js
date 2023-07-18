"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({
            required_error: 'Phone number is required'
        }),
        role: zod_1.z.string({
            required_error: 'Role is required'
        }),
        password: zod_1.z.string().optional(),
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: 'First Name is required'
            }),
            middleName: zod_1.z.string({
                required_error: 'Middle Name is required'
            }).optional(),
            lastName: zod_1.z.string({
                required_error: 'Last Name is required'
            }),
        }),
        address: zod_1.z.string({
            required_error: 'Address is required'
        }),
        buyer: zod_1.z.object({
            budget: zod_1.z.number({
                required_error: 'Budget is required'
            })
        }),
        seller: zod_1.z.object({
            income: zod_1.z.number({
                required_error: 'Income is required'
            })
        })
    })
});
const updateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string().optional(),
        password: zod_1.z.string().optional(),
        name: zod_1.z.object({
            firstName: zod_1.z.string().optional(),
            middleName: zod_1.z.string().optional(),
            lastName: zod_1.z.string().optional(),
        }).optional(),
        address: zod_1.z.string().optional(),
        buyer: zod_1.z.object({
            budget: zod_1.z.number().optional(),
        }).optional(),
        seller: zod_1.z.object({
            income: zod_1.z.number().optional(),
        }).optional(),
    }).optional(),
});
exports.UserValidation = {
    createUserZodSchema,
    updateUserZodSchema
};
