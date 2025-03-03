"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const v1_user_1 = __importDefault(require("./routes/v1-user"));
exports.default = () => {
    const app = express_1.Router();
    auth_1.default(app);
    user_1.default(app);
    v1_user_1.default(app);
    app.get('/', (_, res) => res.send('✌️Welcome to node-express-typescript-boilerplate API!✌️'));
    return app;
};
//# sourceMappingURL=index.js.map