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
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const user_model_1 = __importDefault(require("./user.model"));
const addWishlist = (email, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    // find user by email and push bookId to wishlist
    const user = yield user_model_1.default.findOne({ email });
    const wishlist = user === null || user === void 0 ? void 0 : user.wishlist;
    const objectIdBookId = new mongoose_1.default.Types.ObjectId(bookId);
    if (wishlist === null || wishlist === void 0 ? void 0 : wishlist.includes(objectIdBookId)) {
        throw new ApiErrors_1.default(http_status_1.default.CONFLICT, 'Book already in wishlist', '');
    }
    return yield user_model_1.default.findOneAndUpdate({ email }, { $push: { wishlist: bookId } }, { new: true }).select('-password -email -createdAt -updatedAt -currentlyReading -finishedReading');
});
const getReadingList = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email })
        .select('-password -email -createdAt -updatedAt -wishlist')
        .populate('readingList.book', '-reviews -createdAt -updatedAt -__v');
    return user === null || user === void 0 ? void 0 : user.readingList;
});
const addReadingList = (email, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { book: id, status } = payload;
    const bookData = { book: id, status };
    const isUserExist = yield user_model_1.default.findOne({ email });
    if (!isUserExist) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'User not found', '');
    }
    // check if bookId is already in reading list
    const isBookExist = isUserExist.readingList.find(book => book.book.toString() === id.toString());
    if (isBookExist && isBookExist.status === status) {
        throw new ApiErrors_1.default(http_status_1.default.CONFLICT, 'Book already in reading list', '');
    }
    return yield user_model_1.default.findOneAndUpdate({ email }, { $push: { readingList: bookData } }, { new: true });
});
const finishedReading = (email, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { book: id, status } = payload;
    const isUserExist = yield user_model_1.default.findOne({ email });
    if (!isUserExist) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'User not found', '');
    }
    // check if bookId is already in reading list
    const isBookExist = isUserExist.readingList.find(book => book.book.toString() === id.toString());
    if (!isBookExist) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'Book not found', '');
    }
    if (isBookExist && isBookExist.status === status) {
        throw new ApiErrors_1.default(http_status_1.default.CONFLICT, 'Book already marked as finished', '');
    }
    return yield user_model_1.default.findOneAndUpdate({ email, 'readingList.book': id }, { $set: { 'readingList.$.status': status } }, { new: true });
});
exports.UserService = {
    addWishlist,
    getReadingList,
    addReadingList,
    finishedReading,
};
