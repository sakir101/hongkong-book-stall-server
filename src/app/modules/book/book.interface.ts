import { Model } from "mongoose";

export type IBook = {
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

export type BookModel = Model<IBook, Record<string, unknown>>

export type IBooksFilters = {
    searchTerm?: string;

}