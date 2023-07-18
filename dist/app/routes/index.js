"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/users/user.route");
const cowModel_route_1 = require("../modules/cowModel/cowModel.route");
const orderHistory_route_1 = require("../modules/orderHistory/orderHistory.route");
const auth_route_1 = require("../modules/auth/auth.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes
    },
    {
        path: '/cows',
        route: cowModel_route_1.CowModelRoutes
    },
    {
        path: '/orders',
        route: orderHistory_route_1.OrderHistoryRoutes
    },
    {
        path: '/users',
        route: user_route_1.UserRoutes
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
