"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const isAuth = (req, _, next) => {
    if (ramda_1.not(req.session.user_id)) {
        throw new Error('not authenticated');
    }
    return next();
};
exports.default = isAuth;
//# sourceMappingURL=isAuth.js.map