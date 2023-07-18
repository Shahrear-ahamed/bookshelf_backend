"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const handleValidationError = (error) => {
    const statusCode = http_status_1.default.BAD_REQUEST;
    const errors = Object.values(error === null || error === void 0 ? void 0 : error.errors).map((elem) => {
        const error = elem;
        return {
            path: error.path,
            message: error.message,
        };
    });
    return {
        statusCode,
        message: 'Validation error',
        errorMessages: errors,
    };
};
exports.default = handleValidationError;
