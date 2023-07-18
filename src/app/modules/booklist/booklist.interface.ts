import { Model } from "mongoose";

export type IBookList = {
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
    status: string;
}

export type BookListModel = Model<IBookList, Record<string, unknown>>