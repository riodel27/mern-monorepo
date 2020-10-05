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
const typedi_1 = require("typedi");
const ramda_1 = require("ramda");
const mongoose_1 = require("mongoose");
const crypto_1 = require("crypto");
let AuthService = class AuthService {
    constructor(user, logger) {
        this.user = user;
        this.logger = logger;
    }
    SignUp(userInputDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salt = crypto_1.randomBytes(32);
                const userInput = Object.assign(Object.assign({}, userInputDTO), { salt: salt.toString('hex'), password: yield argon2_1.default.hash(userInputDTO.password, { salt }) });
                const userRecord = yield this.user.create(userInput);
                if (ramda_1.not(userRecord)) {
                    throw new Error('User cannot be created');
                }
                return { user: userRecord.toObject() };
            }
            catch (e) {
                this.logger.error(e);
                throw e;
            }
        });
    }
    SignIn(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRecord = yield this.user.findOne({ email });
            if (ramda_1.not(userRecord)) {
                throw new Error('Incorrect email or password');
            }
            const validPassword = yield argon2_1.default.verify(userRecord.password, password);
            if (ramda_1.not(validPassword))
                throw new Error('Incorrect email or password');
            return { user: userRecord === null || userRecord === void 0 ? void 0 : userRecord.toObject() };
        });
    }
};
AuthService = __decorate([
    typedi_1.Service(),
    __param(0, typedi_1.Inject('userModel')),
    __param(1, typedi_1.Inject('logger')),
    __metadata("design:paramtypes", [mongoose_1.Model, Object])
], AuthService);
exports.default = AuthService;
//# sourceMappingURL=auth.js.map