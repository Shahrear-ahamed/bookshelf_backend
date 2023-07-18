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
exports.UserController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const user_service_1 = require("./user.service");
const addWishlist = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.body;
    const user = req.user;
    const result = yield user_service_1.UserService.addWishlist(user === null || user === void 0 ? void 0 : user.email, bookId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        status: true,
        message: 'Add book in wishlist successfully',
        data: result,
    });
}));
const getReadingList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield user_service_1.UserService.getReadingList(user === null || user === void 0 ? void 0 : user.email);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        status: true,
        message: 'Get reading list successfully',
        data: result,
    });
}));
const addReadingList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookData = req.body;
    const user = req.user;
    const result = yield user_service_1.UserService.addReadingList(user === null || user === void 0 ? void 0 : user.email, bookData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        status: true,
        message: 'Add book in reading list successfully',
        data: result,
    });
}));
const finishedReading = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookData = req.body;
    const user = req.user;
    const result = yield user_service_1.UserService.finishedReading(user === null || user === void 0 ? void 0 : user.email, bookData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        status: true,
        message: 'Finished reading book successfully',
        data: result,
    });
}));
exports.UserController = {
    addWishlist,
    addReadingList,
    getReadingList,
    finishedReading,
};
