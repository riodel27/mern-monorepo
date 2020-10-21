"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const argon2_1 = __importDefault(require("argon2"));
const crypto_1 = require("crypto");
const ramda_1 = require("ramda");
const typedi_1 = require("typedi");
let UserService = class UserService {
    constructor(user, logger) {
        this.user = user;
        this.logger = logger;
    }
    findOneUser(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.user.findOne(query);
                if (ramda_1.not(user))
                    throw new Error('user not found');
                return user;
            }
            catch (e) {
                this.logger.error(e);
                throw e;
            }
        });
    }
    updateUser(id, user_input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (user_input.email) {
                    const existing_user_email = yield this.user.findOne({
                        email: user_input.email,
                    });
                    if (existing_user_email && existing_user_email.id !== id)
                        throw new Error('User with this email already exists');
                }
                const salt = crypto_1.randomBytes(32);
                const hash_password = user_input.password &&
                    user_input.password.trim() &&
                    (yield argon2_1.default.hash(user_input.password, { salt }));
                const user = yield this.user.findOneAndUpdate({ _id: id }, Object.assign(Object.assign({}, user_input), (hash_password && {
                    salt: salt.toString('hex'),
                    password: hash_password,
                })), { new: true });
                if (ramda_1.not(user))
                    throw new Error('Unknown user');
                return user;
            }
            catch (e) {
                this.logger.error(e);
                throw e;
            }
        });
    }
    deleteOneUser(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.user.deleteOne(filter);
            return response;
        });
    }
    getAll(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const offset = (query.offset && parseInt(query.offset)) || 0;
            const limit = (query.limit && parseInt(query.limit)) || 10;
            const total = yield this.user.countDocuments();
            this.logger.debug('offset: %o', offset);
            const users = yield this.user.find({}).sort({ _id: -1 }).skip(offset).limit(limit);
            const next_offset = offset < total ? offset + limit : null;
            return { users, next_offset, meta: { count: total, limit, offset } };
        });
    }
    getAllV1(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = (query.page && parseInt(query.page)) || 1;
            const offset = (query.offset && parseInt(query.offset)) || 0;
            const limit = (query.limit && parseInt(query.limit)) || 10;
            const total = yield this.user.countDocuments();
            if (query.page) {
                this.logger.debug('skip: %o', (page - 1) * limit);
                const users = yield this.user
                    .find({})
                    .sort({ _id: -1 })
                    .skip((page - 1) * limit)
                    .limit(limit);
                const has_more = page * limit < total;
                return { users, has_more, meta: { count: total, limit, page } };
            }
            const users = yield this.user.find({}).sort({ _id: -1 }).skip(offset).limit(limit);
            const next_offset = offset < total ? offset + limit : null;
            return { users, next_offset, meta: { count: total, limit, offset } };
        });
    }
};
UserService = __decorate([
    typedi_1.Service(),
    __param(0, typedi_1.Inject('userModel')),
    __param(1, typedi_1.Inject('logger')),
    __metadata("design:paramtypes", [Object, Object])
], UserService);
exports.default = UserService;
//# sourceMappingURL=user.js.map