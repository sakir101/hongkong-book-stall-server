import { Model } from "mongoose";

export type IWishList = {
    title: string;
    author: string;
    genre: string;
    img: string;
    publicationDate: string;
    publicationYear: string;
    publisherEmail: string;
    rating: string[];
    avgRating: number;
    comments: string[];
}

export type WishListModel = Model<IWishList, Record<string, unknown>>

