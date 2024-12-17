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
exports.signin = exports.getUsers = exports.createUser = void 0;
const Client_1 = __importDefault(require("../db/Client"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "Aman1234";
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const user = yield Client_1.default.candidate.create({
            data: {
                name,
                email,
                password
            }
        });
        var token = jsonwebtoken_1.default.sign({ id: user.id }, JWT_SECRET);
        res.status(201).json({ token: token });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});
exports.createUser = createUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield Client_1.default.candidate.findMany();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});
exports.getUsers = getUsers;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield Client_1.default.candidate.findFirst({
        where: {
            email: email,
            password: password
        }
    });
    if (user) {
        var token = jsonwebtoken_1.default.sign({ id: user.id }, JWT_SECRET);
        res.status(201).json({ token: token });
    }
    else {
        res.status(500).json({ message: "user doesn't exist" });
    }
});
exports.signin = signin;
