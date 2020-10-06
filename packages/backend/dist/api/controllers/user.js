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
            return res.status(201).json({
                message: 'User Created',
                data: { user },
            });
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
    getUsers: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const logger = typedi_1.Container.get('logger');
        logger.debug(`calling get users endpoint`);
        try {
            const UserServiceInstance = typedi_1.Container.get(user_1.default);
            const users = yield UserServiceInstance.getAll(req.query);
            logger.info(`${req.method} ${req.originalUrl} ${202}`);
            return res.status(202).json({ message: 'users', data: users });
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