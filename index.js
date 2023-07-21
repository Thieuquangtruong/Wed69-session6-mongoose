const express = require("express")
const app = express()
const PORT = 8888
const router = require('./router/index')
const morgan = require("morgan")
const cors =  require('cors')
const dotenv = require("dotenv")
const {connectToDb} = require("./database")

dotenv.config()
app.use(morgan("combined"))
connectToDb()
app.use(cors({
    origin: ["http://localhost:4000"]
}))
app.use(express.json()) // middleware
app.use(router)

app.listen(PORT, () =>{
    console.log("Sever is listening on http://localhost:"+PORT)
})