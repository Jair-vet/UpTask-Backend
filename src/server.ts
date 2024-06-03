import express  from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db'
import router from './routes/projectRoutes'
// import router from './router'
// import db from './config/db'
// import swaggerUi from 'swagger-ui-express'
// import swaggerSpec, { swaggerUiOptions } from './config/swagger'
import { corsConfig } from './config/cors'
// import morgan from 'morgan'
import cors from 'cors';

dotenv.config()

// Conectar DB
connectDB()

// connectDB()

// Instancia de express
const server = express()

// Permitir conexiones CORS
server.use(cors(corsConfig))

// Leer datos de formularios de tipo JSON en el servidor
server.use(express.json())

// MORGAN
// server.use(morgan('dev'))

// Instanciar las rutas
server.use('/api/projects', router)


// Docs
// server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions) )


export default server