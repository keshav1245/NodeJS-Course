const express = require('express');
require('./db/mongoose') 

const app = express();
const port = process.env.PORT || 3000

app.use(express.json())

//Loading Task Router
const userRouter = require('./routers/user')
app.use(userRouter)

//Loading Task Router
const taskRouter = require('./routers/task')
app.use(taskRouter)

app.listen(port, ()=>{
    console.log("Server is up and running on port : "+port)
})