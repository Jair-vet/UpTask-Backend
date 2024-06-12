import { Router } from 'express';
import { body, param } from 'express-validator';
import { ProjectController } from '../controllers/ProjectController';
import { handleInputErrors } from '../middleware/validation';
import { TaskController } from '../controllers/TaskContoller';
import { ProjectExists } from '../middleware/project';
import { taskBelongsToProject, taskExists } from '../middleware/task';
import { NoteController } from '../controllers/NoteController';

const router = Router()
// ? ---- Routes for projects ----
// ! CREAR
router.post('/',
    body('projectName')
        .notEmpty().withMessage('El nombre del Proyecto es Obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El nombre del Cliente es Obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripcion del proyecto es Obligatoria'),
    handleInputErrors,
    // Controlador
    ProjectController.createProject
)
//  ! Obtener
router.get('/', ProjectController.getAllProjects)

// ! Obtener by ID
router.get('/:id',
    param('id').isMongoId().withMessage('ID no válido'),
    handleInputErrors,
    // controlador
    ProjectController.getProjectById
)

// ! Actulizar
router.put('/:id',
    param('id').isMongoId().withMessage('ID no válido'),
    body('projectName')
        .notEmpty().withMessage('El nombre del Proyecto es Obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El nombre del Cliente es Obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripcion del proyecto es Obligatoria'),
    handleInputErrors,
    // controlador
    ProjectController.updateProject
)
// ! Eliminar
router.delete('/:id',
    param('id').isMongoId().withMessage('ID no válido'),
    handleInputErrors,
    // controlador
    ProjectController.deleteProject
)


// ?  ---- Routes for task ----  
router.param('projectId', ProjectExists)

// ! CREAR - task
router.post('/:projectId/tasks',
    body('name')
        .notEmpty().withMessage('El nombre de la Tarea es Obligatoria'),
    body('description')
        .notEmpty().withMessage('La descripcion de la Tarea es Obligatoria'),
    handleInputErrors,
    TaskController.createTask
)
// ! OBTENER - task
router.get('/:projectId/tasks',
    TaskController.getProjectTask
)

router.param('taskId', taskExists)
router.param('taskId', taskBelongsToProject)

// ! OBTENER ID - task
router.get('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID no válido'),
    handleInputErrors,
    TaskController.getTaskById
)
// ! ACTUALIZAR - task
router.put('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID no válido'),
    body('name')
        .notEmpty().withMessage('El nombre de la Tarea es Obligatoria'),
    body('description')
        .notEmpty().withMessage('La descripcion de la Tarea es Obligatoria'),
    handleInputErrors,
    TaskController.updateTask
)
// ! DELETE - task
router.delete('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID no válido'),
    handleInputErrors,
    TaskController.deleteTask
)

router.post('/:projectId/tasks/:taskId/status', 
    param('taskId').isMongoId().withMessage('ID no válido'),
    body('status')
        .notEmpty().withMessage('El estado es obligatorio'),
    handleInputErrors,
    TaskController.updateStatus
)


// ? ---- Routes for Notes ----
router.post('/:projectId/tasks/:taskId/notes',
    body('content')
        .notEmpty().withMessage('El Contenido de la nota es obligatorio'),
    handleInputErrors,
    NoteController.createNote
)

// router.get('/:projectId/tasks/:taskId/notes',
//     NoteController.getTaskNotes
// )
// 
// router.delete('/:projectId/tasks/:taskId/notes/:noteId',
//     param('noteId').isMongoId().withMessage('ID No Válido'),
//     handleInputErrors,
//     NoteController.deleteNote
// )


export default router