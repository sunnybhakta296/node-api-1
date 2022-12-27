const express = require('express')
const deserializeUser = require('./middleware/deserializeUser')
const routes = require('./routes')
const connect = require('./utils/connect')
const app = express()

app.use(express.json())
app.use(deserializeUser)
app.listen(1337, async()=> {
    console.log('Application started')
    await connect()
    routes(app)

})



// const createServer = require("./server")
// const connect = require("./utils/connect")


// const app=createServer()

// app.listen(3000, async()=> {
//     await connect()
//     console.log('Application started')
// })

// module.exports=app