import express  from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db'
// import router from './router'
// import db from './config/db'
// import swaggerUi from 'swagger-ui-express'
// import swaggerSpec, { swaggerUiOptions } from './config/swagger'
// import cors, { CorsOptions } from 'cors'
// import morgan from 'morgan'

dotenv.config()

// Conectar DB
connectDB()

// connectDB()

// Instancia de express
const server = express()

// Permitir conexiones CORS
// const corsOptions : CorsOptions = {
//     origin: function(origin, callback) {
//         if(origin === process.env.FRONTEND_URL) {
//             callback(null, true)
//         } else {
//             callback(new Error('Error de CORS')) 
//         }
//     }
// }
// server.use(cors(corsOptions))

// Leer datos de formularios
// server.use(express.json())

// MORGAN
// server.use(morgan('dev'))

// server.use('/api/products', router)


// Docs
// server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions) )


export default server