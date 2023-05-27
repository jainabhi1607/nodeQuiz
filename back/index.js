import express from "express"
import path from "path"
import adminRouter from "./routes/admin.js"
import frontRouter from "./routes/front.js"
import connection from "./db/index.js"

const app = express()
app.use(express.json())
app.use(express.urlencoded()) // This will used to tell router that data will also send, if we will not used this then form data will not send to router

app.set("view engine", "pug")
app.use("/admin",adminRouter)

connection.then(() => app.listen(3300,() =>{console.log("server start at port 3300")}))
.catch((err) => console.log(err))
