"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderHistoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const orderHistory_validation_1 = require("./orderHistory.validation");
const orderHistory_controller_1 = require("./orderHistory.controller");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(orderHistory_validation_1.OrderHistoryValidation.createOrderHistoryZodSchema), orderHistory_controller_1.OrderHistoryController.createOrderHistory);
router.get('/', orderHistory_controller_1.OrderHistoryController.getAllOrderHistories);
exports.OrderHistoryRoutes = router;
