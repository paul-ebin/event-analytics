
import dotenv from 'dotenv'
import app from '../src/app'
dotenv.config()

const PORT = process.env.PORT || 3000
console.log("here")
app.listen(PORT , ()=>{
console.log(`Server is started on ${PORT}`)
})