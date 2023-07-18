"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    genre: {
        type: String,
        required: true,
        trim: true,
    },
    publicationDate: {
        type: Number,
        required: true,
    },
    publisher: {
        type: String,
        required: true,
    },
    reviews: {
        type: [String],
        default: [],
    },
}, {
    timestamps: true,
    versionKey: false,
});
const Book = (0, mongoose_1.model)('Book', bookSchema);
exports.default = Book;
