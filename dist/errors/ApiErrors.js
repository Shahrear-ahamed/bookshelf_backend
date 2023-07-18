"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(statusCode, message, stack) {
        // set for parent class
        super(message);
        // this is for own property
        this.statusCode = statusCode;
        // check if stack has or not
        if (stack) {
            this.stack = stack;
        }
        else {
            // else set Error class error
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = ApiError;
