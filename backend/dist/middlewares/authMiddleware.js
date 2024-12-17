"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "Aman1234"; // Use a secure secret key
const authenticateJWT = (req, // Use the extended interface
res, next) => {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.status(401).json({ error: 'Access denied, no token provided' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.id = decoded.id; // Store `id` in the extended `req` object
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid token", token: token });
    }
};
exports.authenticateJWT = authenticateJWT;
