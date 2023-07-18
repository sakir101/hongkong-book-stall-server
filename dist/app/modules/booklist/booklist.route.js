"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookLstRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const book_validation_1 = require("../book/book.validation");
const book_controller_1 = require("../book/book.controller");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(book_validation_1.BookValidation.createBookZodSchema), book_controller_1.BookController.addBookToBookList);
router.patch('/:id', (0, validateRequest_1.default)(book_validation_1.BookValidation.updateBookZodSchema), book_controller_1.BookController.updateBookList);
router.get('/', book_controller_1.BookController.getAllBooksFromBookList);
exports.BookLstRoutes = router;
