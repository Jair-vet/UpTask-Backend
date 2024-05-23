import type { Request, Response } from "express"
import Project from "../models/Project"


export class ProjectController {

    static createProject = async (req: Request, res: Response) => {
        
        const project = new Project(req.body)

        try {
            // Almacenar en la base de Datos
            await project.save()
            res.send('Proyecto creado Correctamente')
        } catch (error) {
            console.log(error);
        }
        
    }

    static getAllProjects = async (req: Request, res: Response) => {
        
        const projects = await Project.find()
        res.json({data: projects})

    }


}

