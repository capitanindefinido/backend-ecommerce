import express from "express"
import ProductRouter from "./router/products.routes.js"
import CartRouter from "./router/carts.routes.js"
import MessagesRouter from "./router/messages.routes.js"
import router from "./router/upload.routes.js"
import mongoose from "mongoose"
import __dirname from "./utils.js"
import { engine } from "express-handlebars"
import * as path from "path"

const app = express()
const PORT = 4000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor express Puerto ${PORT}`)
})

//-------------------------------------Mongoose----------------------------------------------------------//
mongoose.connect("mongodb+srv://admin:admin@cluster0.es3hczs.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("Conectado a la base de datos")
})
.catch(error => {
    console.error("Error al conectarse a la base de datos, error"+error)
})
app.use("/api/carts", CartRouter)
app.use("/api/msg", MessagesRouter)
app.use("/api/prod", ProductRouter)
app.use("/", router)

//Handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))

//Static
app.use("/", express.static(__dirname + "/public"))

app.get("/", async(req, res) => {
    res.render("chat",{
        title: "chat con mongoose"
    })
})