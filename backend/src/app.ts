import express, { Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import authRoutes from '../src/routes/auth.routes'
import { errorHandler } from './middlewares/error.middleware'
import projectRouter from '../src/routes/project.routes'
import cookieParser from 'cookie-parser'

const app = express()
app.use(helmet())
app.use(express.json())
app.use(cors())
app.use(cookieParser());
app.use('/auth', authRoutes);
app.use("/projects", projectRouter);
app.get('/', (req: Request, res: Response) => {
    res.json("Welcome to Event Analytics")
})  
app.get('/health', (req: Request, res: Response) => {
    res.json({
        status: "ok"
    })
})

app.use(errorHandler)
export default app;