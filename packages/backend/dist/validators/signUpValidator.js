"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
exports.default = celebrate_1.Joi.object({
    name: celebrate_1.Joi.string().required(),
    email: celebrate_1.Joi.string().required(),
    password: celebrate_1.Joi.string().required(),
});
//# sourceMappingURL=signUpValidator.js.map