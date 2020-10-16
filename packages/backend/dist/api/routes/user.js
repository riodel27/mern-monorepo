"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
const express_1 = require("express");
const user_1 = __importDefault(require("../controllers/user"));
const middlewares_1 = __importDefault(require("../middlewares"));
const route = express_1.Router();
exports.default = (app) => {
    app.use('/user', route);
    route.post('/', celebrate_1.celebrate({
        body: celebrate_1.Joi.object({
            name: celebrate_1.Joi.string().required(),
            email: celebrate_1.Joi.string().required(),
            password: celebrate_1.Joi.string().required(),
        }),
    }), user_1.default.createUser);
    route.use(middlewares_1.default.isAuth);
    route.get('/:id', user_1.default.getUserById);
    route.put('/:id', user_1.default.updateUser);
    route.delete('/:id', user_1.default.deleteUser);
    app.use('/users', route);
    route.get('/', user_1.default.getUsers);
};
//# sourceMappingURL=user.js.map