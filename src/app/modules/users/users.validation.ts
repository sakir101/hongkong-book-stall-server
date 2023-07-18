import { z } from "zod";

const createUserZodSchema = z.object({
    body: z.object({
        name: z.object({
            firstName: z.string({
                required_error: 'First Name is required'
            }),
            middleName: z.string({
                required_error: 'Middle Name is required'
            }).optional(),
            lastName: z.string({
                required_error: 'Last Name is required'
            }),
        }),
        img: z.string({
            required_error: 'Img is required'
        }),
        role: z.string({
            required_error: 'Role is required'
        }),
        email: z.string({
            required_error: 'Email is required'
        }),
        password: z.string({
            required_error: 'Password is required'
        }),
    })
})

export const UserValidation = {
    createUserZodSchema,
}