"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProjectRouter_1 = __importDefault(require("./routes/ProjectRouter"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
dotenv_1.default.config();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api', ProjectRouter_1.default);
app.use('/api', userRouter_1.default);
app.get("/hello", (req, res) => {
    res.json("hi from the server");
});
app.listen(port, () => {
    console.log("listening from port:" + port);
});
