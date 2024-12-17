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
exports.getUserProjects = exports.deleteProject = exports.updateProject = exports.getAllProjects = exports.createProject = void 0;
const Client_1 = __importDefault(require("../db/Client"));
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, status, candidateId } = req.body;
        const project = yield Client_1.default.project.create({
            data: {
                name,
                description,
                status,
                candidateId
            }
        });
        res.status(201).json(project);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create project' });
    }
});
exports.createProject = createProject;
// Get all projects
const getAllProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield Client_1.default.project.findMany();
        res.status(200).json(projects);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});
exports.getAllProjects = getAllProjects;
// Update a project
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const candidateId = req.id;
    console.log(candidateId);
    const status = req.body.status;
    try {
        const updatedProject = yield Client_1.default.project.update({
            where: { id },
            data: {
                status: status,
                candidateId,
            },
        });
        res.status(200).json(updatedProject);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update project' });
    }
});
exports.updateProject = updateProject;
// Delete a project
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield Client_1.default.project.delete({
            where: { id },
        });
        res.status(200).json({ message: 'Project deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete project' });
    }
});
exports.deleteProject = deleteProject;
//return project based on a particular user
const getUserProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const candidateId = req.id;
    try {
        const projects = yield Client_1.default.project.findMany({ where: {
                candidateId: candidateId
            } });
        res.status(200).json(projects);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});
exports.getUserProjects = getUserProjects;
