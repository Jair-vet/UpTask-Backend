import type { Request, Response } from "express"
import Project from "../models/Project";
import Task from "../models/Task";


export class TaskController {
    static createTask = async (req: Request, res: Response) => {

        try {
            const task = new Task(req.body)
            task.project = req.project.id   // Asignamos el Proyecto al que pertenece la tarea
            req.project.tasks.push(task.id)
            // Promesas Por separado
            // await task.save()
            // await req.project.save()
            // ejecutar las Promesas al mismo tiempo 
            await Promise.allSettled([task.save(), req.project.save()])
            res.send('Tarea creada Correctamente')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static getProjectTask = async (req: Request, res: Response) => {

        try {
            const tasks = await Task.find({project: req.project.id})
            res.json({data: tasks})
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }
}

