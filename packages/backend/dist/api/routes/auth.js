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
const celebrate_1 = require("celebrate");
const express_1 = require("express");
const typedi_1 = require("typedi");
const auth_1 = __importDefault(require("../../services/auth"));
const signUpValidator_1 = __importDefault(require("../../validators/signUpValidator"));
const route = express_1.Router();
exports.default = (app) => {
    app.use('/auth', route);
    route.post('/signup', celebrate_1.celebrate({ body: signUpValidator_1.default }), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const logger = typedi_1.Container.get('logger');
        logger.debug('Calling Sign-Up endpoint with body: %o', req.body);
        try {
            const AuthServiceInstance = typedi_1.Container.get(auth_1.default);
            const { user } = yield AuthServiceInstance.SignUp(req.body);
            req.session.user_id = user._id;
            logger.info(`${req.method} ${req.originalUrl} ${201}`);
            return res.status(201).json({ user });
        }
        catch (error) {
            return next(error);
        }
    }));
    route.post('/signin', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const logger = typedi_1.Container.get('logger');
        logger.debug('Calling Sign-In endpoint with body: %o', req.body);
        try {
            const { email, password } = req.body;
            const authServiceInstance = typedi_1.Container.get(auth_1.default);
            const { user } = yield authServiceInstance.SignIn(email, password);
            req.session.user_id = user._id;
            logger.info(`${req.method} ${req.originalUrl} ${200}`);
            return res.status(200).json({ user });
        }
        catch (error) {
            return next(error);
        }
    }));
};
//# sourceMappingURL=auth.js.map