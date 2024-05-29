import { Router } from 'express';
import { body, param } from 'express-validator';
import { ProjectController } from '../controllers/ProjectController';
import { handleInputErrors } from '../middleware/validation';
import { TaskController } from '../controllers/TaskContoller';
import { validateProjectExists } from '../middleware/project';

const router = Router()
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


/*  Routes for task  */
router.param('projectId', validateProjectExists)

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
// ! OBTENER ID - task
router.get('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID no válido'),
    handleInputErrors,
    TaskController.getTaskById
)
// ! ACTUALIZAR -task
router.put('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID no válido'),
    body('name')
        .notEmpty().withMessage('El nombre de la Tarea es Obligatoria'),
    body('description')
        .notEmpty().withMessage('La descripcion de la Tarea es Obligatoria'),
    handleInputErrors,
    TaskController.updateTask
)

export default router