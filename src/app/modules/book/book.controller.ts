import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { IBook } from "./book.interface";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constant/constant";
import { bookFilterableField } from "./book.constant";
import { BookService } from "./book.service";
import { IWishList } from "../wishList/wishList.interface";
import { IBookList } from "../booklist/booklist.interface";

const createBook = catchAsync(async (req: Request, res: Response) => {


    const { ...BookData } = req.body
    const result = await BookService.createBook(BookData)

    sendResponse<IBook>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Book created successfully',
        data: result,
    });


})
const addBookToWishList = catchAsync(async (req: Request, res: Response) => {


    const { ...BookData } = req.body
    const result = await BookService.addBookToWishList(BookData)

    sendResponse<IWishList>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Book added successfully',
        data: result,
    });


})

const addBookToBookList = catchAsync(async (req: Request, res: Response) => {


    const { ...BookData } = req.body
    const result = await BookService.addBookToBookList(BookData)

    sendResponse<IBookList>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Book added successfully',
        data: result,
    });


})

const getAllBooks = catchAsync(
    async (req: Request, res: Response) => {

        const filters = pick(req.query, bookFilterableField)
        const paginationOptions = pick(req.query, paginationFields)

        const result = await BookService.getAllBooks(
            filters,
            paginationOptions
        )


        sendResponse<IBook[]>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Books retrived successfully',
            meta: result.meta,
            data: result.data,
        });
    }
)
const getAllBooksFromWishList = catchAsync(
    async (req: Request, res: Response) => {

        const filters = pick(req.query, bookFilterableField)
        const paginationOptions = pick(req.query, paginationFields)

        const result = await BookService.getAllBooksFromWishList(
            filters,
            paginationOptions
        )


        sendResponse<IWishList[]>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Books retrived successfully',
            meta: result.meta,
            data: result.data,
        });
    }
)
const getAllBooksFromBookList = catchAsync(
    async (req: Request, res: Response) => {

        const filters = pick(req.query, bookFilterableField)
        const paginationOptions = pick(req.query, paginationFields)

        const result = await BookService.getAllBooksFromBookList(
            filters,
            paginationOptions
        )


        sendResponse<IWishList[]>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Books retrived successfully',
            meta: result.meta,
            data: result.data,
        });
    }
)

const getSingleBook = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id;

        const result = await BookService.getSingleBook(id)

        sendResponse<IBook>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Single book retrived successfully',
            data: result,
        });




    }
)

const updateBook = catchAsync(
    async (req: Request, res: Response) => {

        const id = req.params.id;

        const updatedData = req.body;

        const result = await BookService.updateBook(id, updatedData)

        sendResponse<IBook>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Book update successfully',
            data: result,
        });



    }
)


const updateBookList = catchAsync(
    async (req: Request, res: Response) => {

        const id = req.params.id;

        const updatedData = req.body;

        const result = await BookService.updateBookList(id, updatedData)

        sendResponse<IBookList>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Status update successfully',
            data: result,
        });



    }
)

const deleteBook = catchAsync(
    async (req: Request, res: Response) => {

        const id = req.params.id;

        const result = await BookService.deleteBook(id)

        sendResponse<IBook>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Book deleted successfully',
            data: result,
        });
    }
)
const deleteBookFromWishList = catchAsync(
    async (req: Request, res: Response) => {

        const id = req.params.id;

        const result = await BookService.deleteBookFRomWishList(id)

        sendResponse<IWishList>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Book remove from wishlist successfully',
            data: result,
        });
    }
)

export const BookController = {
    createBook,
    addBookToWishList,
    addBookToBookList,
    getAllBooks,
    getAllBooksFromWishList,
    getSingleBook,
    getAllBooksFromBookList,
    updateBook,
    updateBookList,
    deleteBook,
    deleteBookFromWishList
}