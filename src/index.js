import express from "express"
import ProductRouter from "./router/products.routes.js"
import CartRouter from "./router/carts.routes.js"
import userRouter from "./router/users.routes.js"
import mongoose from "mongoose"
import __dirname from "./utils.js"
import { engine } from "express-handlebars"
import * as path from "path"
import ProductManagerMongo from "./DAO/Mongo/productManager.js"
import CartManagerMongo from "./DAO/Mongo/cartsManager.js"
import { productsModel } from "./models/products.model.js"
import MongoStore from "connect-mongo"
import session from 'express-session'
import FileStore from 'session-file-store'

const app = express()
const PORT = 4000
const fileStorage = FileStore(session)
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

app.use(session({
    //Session registrada en mongo atlas
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://admin:admin@cluster0.es3hczs.mongodb.net/?retryWrites=true&w=majority",
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true}, ttl: 3600
    }),
    secret: "ClaveSecreta",
    resave: false,
    saveUninitialized: false,
}))

//--Rutas--//
app.use("/api/carts", CartRouter)
app.use("/api/prods", ProductRouter)
app.use("/api/sessions", userRouter)

//Handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))

//Static
app.use("/", express.static(__dirname + "/public"))


app.get("/products", async (req, res) => {
    if (!req.session.emailUsuario) 
    {
        return res.redirect("/login")
    }
    let allProducts  = await product.getProducts()
    allProducts = allProducts.map(product => product.toJSON());
    res.render("viewProducts", {
        title: "Vista Productos",
        products : allProducts,
        style: "style.css",
        email: req.session.emailUsuario,
        rol: req.session.rolUsuario,
        algo: req.session.algo,
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

//Ingreso Login http://localhost:8080/login
app.get("/login", async (req, res) => {
    res.render("login", {
        title: "Vista Login",
    });
    
})
//Ingreso Register http://localhost:8080/register
app.get("/register", async (req, res) => { 
    res.render("register", {
        title: "Vista Register",
    });
})
//Ingreso Profile http://localhost:8080/profile
app.get("/profile", async (req, res) => { 
    if (!req.session.emailUsuario) 
    {
        return res.redirect("/login")
    }
    res.render("profile", {
        title: "Vista Profile Admin",
        first_name: req.session.nomUsuario,
        last_name: req.session.apeUsuario,
        email: req.session.emailUsuario,
        rol: req.session.rolUsuario,

    });
})