"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const celebrate_1 = require("celebrate");
const connect_redis_1 = __importDefault(require("connect-redis"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const api_1 = __importDefault(require("../api"));
const config_1 = __importDefault(require("../config"));
const constants_1 = require("../constants");
exports.default = ({ app, redis_client }) => {
    const RedisStore = connect_redis_1.default(express_session_1.default);
    app.enable('trust proxy');
    app.use(cors_1.default());
    app.use(body_parser_1.default.json());
    app.use(express_session_1.default({
        name: constants_1.COOKIE_NAME,
        store: new RedisStore({
            client: redis_client,
            disableTouch: true,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: 'lax',
            secure: constants_1.__prod__,
        },
        saveUninitialized: false,
        secret: config_1.default.redis.secret,
        resave: false,
    }));
    app.use(config_1.default.api.prefix, api_1.default());
    app.use(celebrate_1.errors());
    app.use((_, __, next) => {
        const err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });
    app.use((err, _, res, next) => {
        if (err.name === 'UnauthorizedError') {
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