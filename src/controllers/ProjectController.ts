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
        try {
            const projects = await Project.find({})
            res.json({data: projects})
            
        } catch (error) {
            console.log(error);
        }
    }

    static getProjectById = async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            const project = await Project.findById( id )
            if(!project){
                const error = new Error('Proyecto no encontrado')
                return res.status(404).json({ error: error.message})
            }
            res.json({data: project})

        } catch (error) {
            console.log(error);
        }
    }



}

