import express, {Request , Response} from 'express'
import cors from 'cors'
import helmet from 'helmet'

const app = express()
app.use(helmet())   
app.use(express.json())
app.use(cors())

app.get('/' ,(req:Request , res:Response)=>{
    res.json("Welcome to Event Analytics")
})
app.get('/health' , (req:Request , res:Response)=>{
    res.json({
        status : "ok"
    })
})
export default app;