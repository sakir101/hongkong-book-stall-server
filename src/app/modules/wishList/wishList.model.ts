import { Schema, model } from "mongoose";
import { IWishList, WishListModel } from "./wishList.interface";

const wishListSchema = new Schema<IWishList>({
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

export const WishList = model<IWishList, WishListModel>('WishList', wishListSchema);