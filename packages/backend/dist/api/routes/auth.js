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
const express_1 = require("express");
const typedi_1 = require("typedi");
const auth_1 = __importDefault(require("../../services/auth"));
const route = express_1.Router();
exports.default = (app) => {
    app.use("/auth", route);
    route.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const logger = typedi_1.Container.get("logger");
        logger.debug(`calling auth login endpoint`);
        try {
            const { email, password } = req.body;
            const authServiceInstance = typedi_1.Container.get(auth_1.default);
            const { user, token } = yield authServiceInstance.SignIn(email, password);
            logger.info(`${req.method} ${req.originalUrl} ${200}`);
            return res.status(200).json({
                user,
                token,
            });
        }
        catch (error) {
            return next(error);
        }
    }));
};
//# sourceMappingURL=auth.js.map