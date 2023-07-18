"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../../constant/pagination");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const book_constant_1 = require("./book.constant");
const book_service_1 = require("./book.service");
const createBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookData = req.body;
    const result = yield book_service_1.BookService.createBook(bookData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        status: true,
        message: 'Book created successfully',
        data: result,
    });
}));
const getAllBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filterData = req.query;
    const filter = (0, pick_1.default)(filterData, book_constant_1.bookFilterableFields);
    const pagination = (0, pick_1.default)(filterData, pagination_1.paginationFields);
    const result = yield book_service_1.BookService.getAllBooks(filter, pagination);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        status: true,
        message: 'Book retrieve successfully',
        data: result,
    });
}));
const getMyBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userEmail = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
    const result = yield book_service_1.BookService.getMyBooks(userEmail);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        status: true,
        message: 'User book retrieve successfully',
        data: result,
    });
}));
const getSingleBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.id;
    const result = yield book_service_1.BookService.getSingleBook(bookId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        status: true,
        message: 'Book retrieve successfully',
        data: result,
    });
}));
const updateBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.id;
    const bookData = req.body;
    const result = yield book_service_1.BookService.updateBook(bookId, bookData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        status: true,
        message: 'Book updated successfully',
        data: result,
    });
}));
const deleteBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.id;
    const result = yield book_service_1.BookService.deleteBook(bookId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        status: true,
        message: 'Book deleted successfully',
        data: result,
    });
}));
const reviewBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const bookId = req.params.id;
    const reviewData = (_b = req.body) === null || _b === void 0 ? void 0 : _b.review;
    const result = yield book_service_1.BookService.reviewBook(bookId, reviewData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        status: true,
        message: 'Book review added successfully',
        data: result,
    });
}));
exports.BookController = {
    createBook,
    getAllBooks,
    getMyBooks,
    getSingleBook,
    updateBook,
    deleteBook,
    reviewBook,
};
