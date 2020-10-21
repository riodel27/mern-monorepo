"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../controllers/user"));
const middlewares_1 = __importDefault(require("../middlewares"));
const route = express_1.Router();
exports.default = (app) => {
    route.use(middlewares_1.default.isAuth);
    app.use('/v1/users', route);
    route.get('/', user_1.default.getUsersV1);
};
//# sourceMappingURL=v1-user.js.map