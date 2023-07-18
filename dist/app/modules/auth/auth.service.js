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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const JwtHelpers_1 = require("../../../helpers/JwtHelpers");
const user_model_1 = __importDefault(require("../user/user.model"));
const authSignUp = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.create(payload);
    const userDetails = {
        email: user.email,
    };
    const accessToken = yield JwtHelpers_1.JwtHelpers.createToken(userDetails, config_1.default.jwt_secret, config_1.default.jwt_expired);
    return Object.assign(Object.assign({}, userDetails), { accessToken });
});
const authLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield user_model_1.default.isUserExist(email);
    if (!isUserExist) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'User not found', '');
    }
    const passMatch = yield user_model_1.default.matchPassword(password, isUserExist.password);
    if (!passMatch) {
        throw new ApiErrors_1.default(http_status_1.default.UNAUTHORIZED, 'Email and Password are wrong', '');
    }
    const userDetails = {
        email: isUserExist.email,
    };
    const accessToken = yield JwtHelpers_1.JwtHelpers.createToken(userDetails, config_1.default.jwt_secret, config_1.default.jwt_expired);
    const refreshToken = yield JwtHelpers_1.JwtHelpers.createToken(userDetails, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expired);
    return Object.assign(Object.assign({}, userDetails), { accessToken, refreshToken });
});
exports.AuthService = {
    authSignUp,
    authLogin,
};
