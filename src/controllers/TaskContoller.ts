import type { Request, Response } from "express"
import Task from "../models/Task";


export class TaskController {
    // ! CREATE
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
    // ! GET ALL
    static getProjectTask = async (req: Request, res: Response) => {

        try {
            const tasks = await Task.find({project: req.project.id}).populate('project')
            res.json({data: tasks})
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }
    // ! GET BY ID
    static getTaskById = async (req: Request, res: Response) => {

        try {
            // Si no pertenece al Proyecto
            if(req.task.project.toString() !== req.project.id){
                const error = new Error('Accion no Valida')
                return res.status(400).json({error: error.message})
            }

            res.json(req.task)
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }
    // ! UPDATE
    static updateTask = async (req: Request, res: Response) => {

        try {
            // Si no pertenece al Proyecto
            if(req.task.project.toString() !== req.project.id){
                const error = new Error('Accion no Valida')
                return res.status(400).json({error: error.message})
            }
            req.task.name = req.body.name
            req.task.description = req.body.description
            await req.task.save()
            res.send("Tarea Actualizada Correctamente")
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }
    // ! DELETE
    static deleteTask = async (req: Request, res: Response) => {
        try {
            req.project.tasks = req.project.tasks.filter( task => task.toString() !== req.task.id.toString() )
            await Promise.allSettled([ req.task.deleteOne(), req.project.save() ])
            res.send("Tarea Eliminada Correctamente")

        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }
    // ! CHANGE STATUS
    static updateStatus = async (req: Request, res: Response) => {
        try {
            const { status } = req.body
            req.task.status = status
            
            await req.task.save()
            res.send('Tarea Actualizada')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }
}

