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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const book_constant_1 = require("./book.constant");
const book_model_1 = __importDefault(require("./book.model"));
const createBook = (payload) => {
    return book_model_1.default.create(payload);
};
const getAllBooks = (filterData, paginationData) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filterData, otherFilters = __rest(filterData, ["searchTerm"]);
    const condition = [];
    // implement dynamic search here
    if (searchTerm) {
        condition.push({
            $or: book_constant_1.bookSearchableField.map(field => ({
                [field]: { $regex: searchTerm, $options: 'i' },
            })),
        });
    }
    // implement dynamic filter here
    if (Object.keys(otherFilters).length) {
        condition.push({
            $and: Object.entries(otherFilters).map(([key, value]) => ({
                [key]: value,
            })),
        });
    }
    // implement dynamic pagination here
    const { skip, limit, sortBy, sortOrder } = (0, paginationHelper_1.calculatePagination)(paginationData);
    // sort condition
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    // where condition for
    const whereCondition = condition.length ? { $and: condition } : {};
    const result = yield book_model_1.default.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    return result;
});
const getMyBooks = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield book_model_1.default.find({ publisher: email });
});
const getSingleBook = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield book_model_1.default.findById(bookId);
});
const updateBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.default.findById(id);
    if (!book) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'Book not found', '');
    }
    return yield book_model_1.default.findByIdAndUpdate({ _id: id }, payload, { new: true });
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield book_model_1.default.findByIdAndDelete(id);
});
const reviewBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield book_model_1.default.findOne({ _id: id });
    if (!isExist) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'Book not found', '');
    }
    return yield book_model_1.default.findByIdAndUpdate({ _id: id }, { $push: { reviews: payload } }, { new: true });
});
exports.BookService = {
    createBook,
    getAllBooks,
    getMyBooks,
    getSingleBook,
    updateBook,
    deleteBook,
    reviewBook,
};
