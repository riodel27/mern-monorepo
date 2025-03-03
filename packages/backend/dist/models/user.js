"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a full name'],
        index: true,
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        index: true,
    },
    password: { type: String, required: true },
    age: { type: Number, required: false },
    city: String,
    country: String,
    birthday: Date,
    message: String,
    position: String,
    responsibilities: Array,
    department: String,
    supervisor: String,
    skills: Array,
    phone_number: Number,
    github: String,
    salt: String,
    role: {
        type: String,
        default: 'user',
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('User', User);
//# sourceMappingURL=user.js.map