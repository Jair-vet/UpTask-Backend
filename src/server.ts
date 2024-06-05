import express  from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db'
import router from './routes/projectRoutes'
import { corsConfig } from './config/cors'
import cors from 'cors';

dotenv.config()

// Conectar DB
connectDB()

// Instancia de express
const server = express()

// Permitir conexiones CORS
server.use(cors(corsConfig))

// Leer datos de formularios de tipo JSON en el servidor
server.use(express.json())

// Instanciar las rutas
server.use('/api/projects', router)


export default server