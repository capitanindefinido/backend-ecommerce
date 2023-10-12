import express from "express"
import ProductRouter from "./router/products.routes.js"
import CartRouter from "./router/carts.routes.js"
import router from "./router/upload.routes.js"
import mongoose from "mongoose"
import __dirname from "./utils.js"
import { engine } from "express-handlebars"
import * as path from "path"
import ProductManagerMongo from "./DAO/Mongo/productManager.js"
import CartManagerMongo from "./DAO/Mongo/cartsManager.js"
import { productsModel } from "./models/products.model.js"

const app = express()
const PORT = 4000
const product = new ProductManagerMongo()
const cart = new CartManagerMongo()

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

//--Rutas--//
app.use("/api/carts", CartRouter)
app.use("/api/prods", ProductRouter)
app.use("/", router)

//Handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))

//Static
app.use("/", express.static(__dirname + "/public/css"))


app.get("/products", async (req, res) => {
    let allProducts  = await product.getProducts()
    allProducts = allProducts.map(product => product.toJSON());
    res.render("viewProducts", {
        title: "Vista Productos",
        products : allProducts
    });
})
app.get("/carts/:cid", async (req, res) => {
    let id = req.params.cid
    let allCarts  = await cart.getCartWithProducts(id)
    res.render("viewCart", {
        title: "Vista Carro",
        carts : allCarts
    });
})