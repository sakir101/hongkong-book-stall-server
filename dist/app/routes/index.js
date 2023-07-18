"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_route_1 = require("../modules/book/book.route");
const wishList_route_1 = require("../modules/wishList/wishList.route");
const auth_route_1 = require("../modules/auth/auth.route");
const booklist_route_1 = require("../modules/booklist/booklist.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/book',
        route: book_route_1.BookRoutes
    },
    {
        path: '/wishList',
        route: wishList_route_1.WishLstRoutes
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes
    },
    {
        path: '/bookList',
        route: booklist_route_1.BookLstRoutes
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
