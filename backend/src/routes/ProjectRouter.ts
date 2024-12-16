import { Router } from "express";
import { createProject, deleteProject, getAllProjects, updateProject } from "../controllers/ProjectController";
import { addProgress, updateProgress } from "../controllers/ProgressController";
import { authenticateJWT } from "../middlewares/authMiddleware";

const projectRouter=Router();

projectRouter.post('/projects', authenticateJWT ,createProject);
projectRouter.get('/projects',authenticateJWT, getAllProjects);
projectRouter.put('/projects/:id',authenticateJWT, updateProject);
projectRouter.delete('/projects/:id',authenticateJWT, deleteProject);


projectRouter.post('/projects/:id/progress', authenticateJWT,addProgress);
projectRouter.patch('/projects/:id/progress',authenticateJWT, updateProgress);


export default projectRouter;