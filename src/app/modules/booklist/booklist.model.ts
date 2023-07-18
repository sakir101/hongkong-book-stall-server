import { Schema, model } from "mongoose";
import { BookListModel, IBookList } from "./booklist.interface";

const bookListSchema = new Schema<IBookList>({
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
    status: {
        type: String,
    },
},
    {
        timestamps: true,
        toJSON: {
            virtuals: true
        }
    }
)

export const BookList = model<IBookList, BookListModel>('BookList', bookListSchema);