import { Request,Response } from "express";
import client from "../db/Client";

// Add Progress
export const addProgress = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { completedTasks, totalTasks, progress, score } = req.body;

    try {
        // Ensure the project exists
        const project = await client.project.findUnique({
            where: { id },
        });
        if (!project) {
            res.status(404).json({ error: "Project not found" });
            return;
        }

        // Check if progress already exists for the project
        const existingProgress = await client.progress.findUnique({
            where: { projectId: id },
        });

        if (existingProgress) {
            res.status(400).json({ error: "Progress already exists for this project" });
            return;
        }

        // Create Progress
        const newProgress = await client.progress.create({
            data: {
                projectId: id,
                completedTasks,
                totalTasks,
                progress,
                score,
            },
        });

        res.status(201).json(newProgress);
    } catch (error) {
        res.status(500).json({ error: "Failed to add progress" });
    }
};

// Update Progress
export const updateProgress = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { completedTasks, totalTasks, progress, score } = req.body;

    try {
        // Ensure progress exists
        const existingProgress = await client.progress.findUnique({
            where: { projectId: id },
        });
        if (!existingProgress) {
            res.status(404).json({ error: "Progress not found for this project" });
            return;
        }

        // Update Progress
        const updatedProgress = await client.progress.update({
            where: { projectId: id },
            data: {
                completedTasks,
                totalTasks,
                progress,
                score,
            },
        });

        res.status(200).json(updatedProgress);
    } catch (error) {
        res.status(500).json({ error: "Failed to update progress" });
    }
};