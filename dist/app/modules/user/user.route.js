"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.put('/add-wishlist', auth_1.default, user_controller_1.UserController.addWishlist);
router.put('/reading-list', auth_1.default, (0, validateRequest_1.default)(user_validation_1.UserValidation.userReadingZodSchema), user_controller_1.UserController.addReadingList);
router.put('/reading-list/finished', auth_1.default, (0, validateRequest_1.default)(user_validation_1.UserValidation.userReadingZodSchema), user_controller_1.UserController.finishedReading);
router.get('/reading-list', auth_1.default, user_controller_1.UserController.getReadingList);
exports.UserRoutes = router;
