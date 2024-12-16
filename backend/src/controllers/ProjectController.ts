import { Request,Response } from "express";
import client from "../db/Client";

export const createProject=async(req:Request,res:Response)=>{
    try{
        const {name, description, status, candidateId}=req.body;

        const project=await client.project.create({
            data:{
                name,
                description,
                status,
                candidateId
            }
        });

        res.status(201).json(project);
    }
    catch(error){
        res.status(500).json({ error: 'Failed to create project' });
    }
};

// Get all projects
export const getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await client.project.findMany();
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch projects' });
    }
};

// Update a project
export const updateProject = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, status, candidateId } = req.body;
  
    try {
      const updatedProject = await client.project.update({
        where: { id },
        data: {
          name,
          description,
          status,
          candidateId,
        },
      });
  
      res.status(200).json(updatedProject);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update project' });
    }
};

// Delete a project
export const deleteProject = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      await client.project.delete({
        where: { id },
      });
  
      res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete project' });
    }
  };