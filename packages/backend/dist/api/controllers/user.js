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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const auth_1 = __importDefault(require("../../services/auth"));
const user_1 = __importDefault(require("../../services/user"));
exports.default = {
    createUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const logger = typedi_1.Container.get('logger');
        logger.debug('calling create user endpoint with body: ', req.body);
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
    }),
    getUserById: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const logger = typedi_1.Container.get('logger');
        logger.debug('calling get user  by id endpoint');
        try {
            const { id } = req.params;
            const UserServiceInstance = typedi_1.Container.get(user_1.default);
            const user = yield UserServiceInstance.findOneUser({ _id: id });
            logger.info(`${req.method} ${req.originalUrl} ${200}`);
            return res.status(200).json({ message: 'Ok', data: user });
        }
        catch (error) {
            return next(error);
        }
    }),
    getCurrentUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const logger = typedi_1.Container.get('logger');
        logger.debug('calling get current user  endpoint');
        try {
            const id = req.session.user_id;
            const UserServiceInstance = typedi_1.Container.get(user_1.default);
            const user = yield UserServiceInstance.findOneUser({ _id: id });
            logger.info(`${req.method} ${req.originalUrl} ${200}`);
            return res
                .status(200)
                .json({ user: { name: user === null || user === void 0 ? void 0 : user.name, email: user === null || user === void 0 ? void 0 : user.email, id: user === null || user === void 0 ? void 0 : user._id } });
        }
        catch (error) {
            return next(error);
        }
    }),
    getUsers: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const logger = typedi_1.Container.get('logger');
        logger.debug(`calling get users endpoint`);
        try {
            const UserServiceInstance = typedi_1.Container.get(user_1.default);
            const _a = yield UserServiceInstance.getAll(req.query), { users } = _a, rest = __rest(_a, ["users"]);
            logger.info(`${req.method} ${req.originalUrl} ${200}`);
            return res.status(200).json(Object.assign({ users }, rest));
        }
        catch (error) {
            return next(error);
        }
    }),
    getUsersV1: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const logger = typedi_1.Container.get('logger');
        logger.debug(`calling get api v1 users endpoint`);
        try {
            const UserServiceInstance = typedi_1.Container.get(user_1.default);
            const _b = yield UserServiceInstance.getAllV1(req.query), { users } = _b, rest = __rest(_b, ["users"]);
            logger.info(`${req.method} ${req.originalUrl} ${200}`);
            return res.status(200).json(Object.assign({ users }, rest));
        }
        catch (error) {
            return next(error);
        }
    }),
    updateUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const logger = typedi_1.Container.get('logger');
        logger.debug(`calling update user endpoint`);
        try {
            const { id } = req.params;
            const { body: user_input } = req;
            const UserServiceInstance = typedi_1.Container.get(user_1.default);
            const user = yield UserServiceInstance.updateUser(id, user_input);
            logger.info(`${req.method} ${req.originalUrl} ${202}`);
            return res.status(202).json({ message: 'User Updated', data: user });
        }
        catch (error) {
            return next(error);
        }
    }),
    deleteUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const logger = typedi_1.Container.get('logger');
        logger.debug(`calling delete user endpoint`);
        try {
            const { id } = req.params;
            const UserServiceInstance = typedi_1.Container.get(user_1.default);
            yield UserServiceInstance.deleteOneUser({ _id: id });
            logger.info(`${req.method} ${req.originalUrl} ${202}`);
            return res.status(202).json({ message: 'delete successful' });
        }
        catch (error) {
            return next(error);
        }
    }),
};
//# sourceMappingURL=user.js.map