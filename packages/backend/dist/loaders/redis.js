"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const config_1 = __importDefault(require("../config"));
const logger_1 = __importDefault(require("./logger"));
exports.default = () => {
    return new Promise((resolve, _) => {
        const redis = new ioredis_1.default(config_1.default.redis.url);
        redis.on("error", (error) => {
            logger_1.default.error(error);
            process.exit(1);
        });
        redis.on("connect", () => {
            resolve(redis);
        });
    });
};
//# sourceMappingURL=redis.js.map