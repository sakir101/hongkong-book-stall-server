import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { bookSearchableFields } from "./book.constant";
import { IBook, IBooksFilters } from "./book.interface";
import { Book } from "./book.model";
import { WishList } from "../wishList/wishList.model";
import { IWishList } from "../wishList/wishList.interface";
import { BookList } from "../booklist/booklist.model";
import { IBookList } from "../booklist/booklist.interface";
import ApiError from "../../../errors/ApiError";
import { NOT_FOUND } from "http-status";

const createBook = async (payload: IBook): Promise<IBook> => {
    console.log(payload);

    const publicationYear = payload.publicationDate.split("-")[0];

    const bookData = {
        ...payload,
        publicationYear: publicationYear,
        rating: [],
        avgRating: 0,
        comments: []
    };

    const result = await Book.create(bookData);
    return result;
};
const addBookToWishList = async (payload: IBook): Promise<IBook> => {


    const result = await WishList.create(payload);
    return result;
};
const addBookToBookList = async (payload: IBookList): Promise<IBookList> => {

    const newBookData = {
        ...payload,
        status: 'reading',
    };

    console.log(newBookData)

    const result = await BookList.create(newBookData);
    return result;
};


const getAllBooks = async (
    filters: IBooksFilters,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBook[]>> => {
    const { searchTerm, ...filtersData } = filters;



    const andConditions = []

    if (searchTerm) {
        andConditions.push({
            $or: bookSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i'
                },
            })),
        });
    }


    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value
            }))
        })
    }

    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(paginationOptions);

    const sortConditions: { [key: string]: SortOrder } = {}

    if (sortBy && sortConditions) {
        sortConditions[sortBy] = sortOrder;
    }

    if (Object.keys(filtersData)[0] === 'maxRate') {

        const topRatedBooks = await Book.find().sort({ avgRating: -1 }).limit(10);

        const total = await Book.countDocuments(topRatedBooks);
        return {
            meta: {
                page,
                limit,
                total
            },
            data: topRatedBooks

        }
    }

    const whereConditions =
        andConditions.length > 0 ? { $and: andConditions } : {}

    const result = await Book.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

    const total = await Book.countDocuments(whereConditions);

    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    }
}


const getAllBooksFromWishList = async (
    filters: IBooksFilters,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IWishList[]>> => {
    const { searchTerm, ...filtersData } = filters;



    const andConditions = []

    if (searchTerm) {
        andConditions.push({
            $or: bookSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i'
                },
            })),
        });
    }


    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value
            }))
        })
    }

    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(paginationOptions);

    const sortConditions: { [key: string]: SortOrder } = {}

    if (sortBy && sortConditions) {
        sortConditions[sortBy] = sortOrder;
    }

    const whereConditions =
        andConditions.length > 0 ? { $and: andConditions } : {}

    const result = await WishList.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

    const total = await WishList.countDocuments(whereConditions);

    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    }
}

const getAllBooksFromBookList = async (
    filters: IBooksFilters,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBookList[]>> => {
    const { searchTerm, ...filtersData } = filters;



    const andConditions = []

    if (searchTerm) {
        andConditions.push({
            $or: bookSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i'
                },
            })),
        });
    }


    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value
            }))
        })
    }

    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(paginationOptions);

    const sortConditions: { [key: string]: SortOrder } = {}

    if (sortBy && sortConditions) {
        sortConditions[sortBy] = sortOrder;
    }

    const whereConditions =
        andConditions.length > 0 ? { $and: andConditions } : {}

    const result = await BookList.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

    const total = await BookList.countDocuments(whereConditions);

    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    }
}

const getSingleBook = async (id: string): Promise<IBook | null> => {
    const result = await Book.findById(id);
    return result;
}



const updateBook = async (
    id: string,
    payload: Partial<IBook>
): Promise<IBook | null> => {
    const { comments, rating, ...restPayload } = payload;

    if (comments === undefined) {

        const result = await Book.findOneAndUpdate({ _id: id }, payload, { new: true })
        return result

    }

    const result = await Book.findOneAndUpdate(
        { _id: id },
        { $set: restPayload, $push: { comments: { $each: comments }, rating: { $each: rating } } },
        { new: true }
    );

    const book = await Book.findById(id);
    if (!book) {
        throw new ApiError(NOT_FOUND, "Book Data not found");
    }

    const ratings = book.rating.map((value) => Number(value));
    const totalRating = ratings.reduce((sum, rating) => sum + rating, 0);
    const averageRating = totalRating / ratings.length;
    const averageRatingInteger = Math.round(averageRating);

    const result2 = await Book.findOneAndUpdate(
        { _id: id },
        { $set: { avgRating: averageRatingInteger } },
        { new: true }
    );

    return result2;
}


const updateBookList = async (
    id: string,
    payload: Partial<IBookList>
): Promise<IBookList | null> => {
    const result = await BookList.findOneAndUpdate({ _id: id }, payload, { new: true });
    return result;
}

const deleteBook = async (id: string): Promise<IBook | null> => {
    const result = await Book.findByIdAndDelete(id);
    return result;
}

const deleteBookFRomWishList = async (id: string): Promise<IWishList | null> => {
    const result = await WishList.findByIdAndDelete(id);
    return result;
}

export const BookService = {
    createBook,
    addBookToWishList,
    addBookToBookList,
    getAllBooks,
    getAllBooksFromWishList,
    getAllBooksFromBookList,
    getSingleBook,
    updateBook,
    updateBookList,
    deleteBook,
    deleteBookFRomWishList
}