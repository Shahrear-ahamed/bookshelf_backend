"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const userReadingZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        book: zod_1.z.string(),
        status: zod_1.z.string(),
    }),
});
exports.UserValidation = {
    userReadingZodSchema,
};
