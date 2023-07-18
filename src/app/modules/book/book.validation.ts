import { z } from "zod";


const createBookZodSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: "Title is required"
        }),
        author: z.string({
            required_error: "Author name is required"
        }),
        genre: z.string({
            required_error: "Genre is required"
        }),
        img: z.string({
            required_error: "Image is required"
        }),
        publicationDate: z.string({
            required_error: "Publication date is required"
        }),
        publisherEmail: z.string({
            required_error: "Publisher email is required"
        }),

    })
})

const updateBookZodSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        author: z.string().optional(),
        genre: z.string().optional(),
        img: z.string().optional(),
        publicationDate: z.string().optional(),
        publisherEmail: z.string().optional(),
    }).optional()
});

export const BookValidation = {
    createBookZodSchema,
    updateBookZodSchema
}