"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProjectController_1 = require("../controllers/ProjectController");
const ProgressController_1 = require("../controllers/ProgressController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const projectRouter = (0, express_1.Router)();
projectRouter.post('/projects', authMiddleware_1.authenticateJWT, ProjectController_1.createProject);
projectRouter.get('/projects', authMiddleware_1.authenticateJWT, ProjectController_1.getAllProjects);
projectRouter.get("/projects/user", authMiddleware_1.authenticateJWT, ProjectController_1.getUserProjects);
projectRouter.put('/projects/:id', authMiddleware_1.authenticateJWT, ProjectController_1.updateProject);
projectRouter.delete('/projects/:id', authMiddleware_1.authenticateJWT, ProjectController_1.deleteProject);
projectRouter.post('/projects/:id/progress', authMiddleware_1.authenticateJWT, ProgressController_1.addProgress);
projectRouter.patch('/projects/:id/progress', authMiddleware_1.authenticateJWT, ProgressController_1.updateProgress);
exports.default = projectRouter;