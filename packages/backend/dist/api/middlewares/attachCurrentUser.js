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
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const attachCurrentUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const Logger = typedi_1.Container.get("logger");
    try {
        const UserModel = typedi_1.Container.get("userModel");
        const userRecord = yield UserModel.findById(req.token._id);
        if (!userRecord) {
            return res.sendStatus(401);
        }
        const currentUser = userRecord.toObject();
        Reflect.deleteProperty(currentUser, "password");
        Reflect.deleteProperty(currentUser, "salt");
        req.currentUser = currentUser;
        return next();
    }
    catch (e) {
        Logger.error("🔥 Error attaching user to req: %o", e);
        return next(e);
    }
});
exports.default = attachCurrentUser;
//# sourceMappingURL=attachCurrentUser.js.map