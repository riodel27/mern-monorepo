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
const typedi_1 = require("typedi");
const argon2_1 = __importDefault(require("argon2"));
const mongoose_1 = require("mongoose");
const crypto_1 = require("crypto");
const ramda_1 = require("ramda");
let UserService = class UserService {
    constructor(user, logger) {
        this.user = user;
        this.logger = logger;
    }
    FindOneUser(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.user.findOne(query);
                if (ramda_1.not(user))
                    throw new Error("user not found");
                return user;
            }
            catch (e) {
                this.logger.error(e);
                throw e;
            }
        });
    }
    UpdateUser(id, userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (userInput.email) {
                    const existingUserEmail = yield this.user.findOne({
                        email: userInput.email,
                    });
                    if (existingUserEmail && existingUserEmail.id !== id)
                        throw new Error("User with this email already exists");
                }
                const salt = crypto_1.randomBytes(32);
                const hashPassword = userInput.password &&
                    userInput.password.trim() &&
                    (yield argon2_1.default.hash(userInput.password, { salt }));
                const user = yield this.user.findOneAndUpdate({ _id: id }, Object.assign(Object.assign({}, userInput), (hashPassword && {
                    salt: salt.toString("hex"),
                    password: hashPassword,
                })), { new: true });
                if (ramda_1.not(user))
                    throw new Error("Unknown user");
                return user;
            }
            catch (e) {
                this.logger.error(e);
                throw e;
            }
        });
    }
    DeleteOneUser(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.user.deleteOne(filter);
            return response;
        });
    }
};
UserService = __decorate([
    typedi_1.Service(),
    __param(0, typedi_1.Inject("userModel")),
    __param(1, typedi_1.Inject("logger")),
    __metadata("design:paramtypes", [mongoose_1.Model, Object])
], UserService);
exports.default = UserService;
//# sourceMappingURL=user.js.map