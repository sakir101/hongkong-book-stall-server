import { Schema, model } from "mongoose";
import { BookModel, IBook } from "./book.interface";



const bookSchema = new Schema<IBook>({
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
},
    {
        timestamps: true,
        toJSON: {
            virtuals: true
        }
    }
)

export const Book = model<IBook, BookModel>('Book', bookSchema);