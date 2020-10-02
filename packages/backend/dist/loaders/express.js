"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const celebrate_1 = require("celebrate");
const config_1 = __importDefault(require("../config"));
const api_1 = __importDefault(require("../api"));
exports.default = ({ app }) => {
    app.enable("trust proxy");
    app.use(cors_1.default());
    app.use(body_parser_1.default.json());
    app.use(config_1.default.api.prefix, api_1.default());
    app.use(celebrate_1.errors());
    app.use((_, __, next) => {
        const err = new Error("Not Found");
        err["status"] = 404;
        next(err);
    });
    app.use((err, _, res, next) => {
        if (err.name === "UnauthorizedError") {
            return res.status(err.status).send({ message: err.message }).end();
        }
        return next(err);
    });
    app.use((err, _, res, __) => {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
            },
        });
    });
};
//# sourceMappingURL=express.js.map