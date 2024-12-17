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
exports.updateProgress = exports.addProgress = void 0;
const Client_1 = __importDefault(require("../db/Client"));
// Add Progress
const addProgress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { completedTasks, totalTasks, progress, score } = req.body;
    try {
        // Ensure the project exists
        const project = yield Client_1.default.project.findUnique({
            where: { id },
        });
        if (!project) {
            res.status(404).json({ error: "Project not found" });
            return;
        }
        // Check if progress already exists for the project
        const existingProgress = yield Client_1.default.progress.findUnique({
            where: { projectId: id },
        });
        if (existingProgress) {
            res.status(400).json({ error: "Progress already exists for this project" });
            return;
        }
        // Create Progress
        const newProgress = yield Client_1.default.progress.create({
            data: {
                projectId: id,
                completedTasks,
                totalTasks,
                progress,
                score,
            },
        });
        res.status(201).json(newProgress);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to add progress" });
    }
});
exports.addProgress = addProgress;
// Update Progress
const updateProgress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { completedTasks, totalTasks, progress, score } = req.body;
    try {
        // Ensure progress exists
        const existingProgress = yield Client_1.default.progress.findUnique({
            where: { projectId: id },
        });
        if (!existingProgress) {
            res.status(404).json({ error: "Progress not found for this project" });
            return;
        }
        // Update Progress
        const updatedProgress = yield Client_1.default.progress.update({
            where: { projectId: id },
            data: {
                completedTasks,
                totalTasks,
                progress,
                score,
            },
        });
        res.status(200).json(updatedProgress);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update progress" });
    }
});
exports.updateProgress = updateProgress;
