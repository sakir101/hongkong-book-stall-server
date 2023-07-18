import express from 'express';
import { BookRoutes } from '../modules/book/book.route';
import { WishLstRoutes } from '../modules/wishList/wishList.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BookLstRoutes } from '../modules/booklist/booklist.route';





const router = express.Router();

const moduleRoutes = [
    {
        path: '/book',
        route: BookRoutes
    },
    {
        path: '/wishList',
        route: WishLstRoutes
    },
    {
        path: '/auth',
        route: AuthRoutes
    },
    {
        path: '/bookList',
        route: BookLstRoutes
    },



]
moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;

