"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const book_route_1 = require("../modules/book/book.route");
const user_route_1 = require("../modules/user/user.route");
const router = express_1.default.Router();
const routerModules = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/books',
        route: book_route_1.BookRoutes,
    },
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
];
routerModules.forEach(module => {
    router.use(module.path, module.route);
});
exports.default = router;
