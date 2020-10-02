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
const mongoose_1 = __importDefault(require("./mongoose"));
const logger_1 = __importDefault(require("./logger"));
exports.default = ({ expressApp }) => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default();
    logger_1.default.info("✌️ DB loaded and connected!");
    const userModel = {
        name: "userModel",
        model: require("../models/user").default,
    };
    yield dependencyInjector_1.default({
        models: [userModel],
    });
    logger_1.default.info("✌️ Dependency Injector loaded");
    yield express_1.default({ app: expressApp });
    logger_1.default.info("✌️ Express loaded");
});
//# sourceMappingURL=index.js.map