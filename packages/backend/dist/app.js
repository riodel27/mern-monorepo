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
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const logger_1 = __importDefault(require("./loaders/logger"));
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    yield require('./loaders').default({ expressApp: app });
    app.listen(config_1.default.port, () => {
        logger_1.default.info(`
    ################################################
    🛡️  Server listening on port: ${config_1.default.port} 🛡️ 
    ################################################
  `);
    });
});
startServer();
//# sourceMappingURL=app.js.map