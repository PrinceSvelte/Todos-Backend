require('dotenv').config()
const express = require("express")
const connectDB = require('./db/connect')
const authRouter = require("./routes/auth")
const todoRouter = require("./routes/todos")
const cors = require("cors")
const {auth} = require('./middleware/auth')
 const app = express()
app.use(express.json())
app.use(cors())

//routes
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/todo',auth,todoRouter)



const port = process.env.PORT || 4000

const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI)
      app.listen(port,() => {
        console.log(`Source is listening on port ${port}`)
      })  
    } catch (error) {
       console.log(error) 
    }
}
start()