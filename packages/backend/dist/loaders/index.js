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
const dependencyInjector_1 = __importDefault(require("./dependencyInjector"));
const express_1 = __importDefault(require("./express"));
const logger_1 = __importDefault(require("./logger"));
const mongoose_1 = __importDefault(require("./mongoose"));
const redis_1 = __importDefault(require("./redis"));
exports.default = ({ expressApp }) => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default();
    logger_1.default.info('✌️ DB loaded and connected!');
    const userModel = {
        name: 'userModel',
        model: require('../models/user').default,
    };
    const redis_client = yield redis_1.default();
    logger_1.default.info('✌️ Redis loaded and connected!');
    yield dependencyInjector_1.default({
        models: [userModel],
    });
    logger_1.default.info('✌️ Dependency Injector loaded');
    yield express_1.default({ app: expressApp, redis_client });
    logger_1.default.info('✌️ Express loaded');
});
//# sourceMappingURL=index.js.map