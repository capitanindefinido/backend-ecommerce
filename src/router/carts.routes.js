import { Router } from "express";
import { cartsModel } from "../models/carts.model.js";
import CartManagerMongo from "../DAO/Mongo/cartsManager.js";

const CartRouter = Router()
const serviceCarts = new CartManagerMongo()

//Se agrega carrito http://localhost:8080/api/carts con post donde nos ingresa un id y un producto con arreglo vacio
CartRouter.post("/", async (req,res) =>{
    let newCart = req.body
    res.send(await serviceCarts.addCart(newCart))
})
//Traemos todos los carritos con http://localhost:8080/api/carts con get
CartRouter.get("/", async (req,res)=>{
    res.send(await serviceCarts.getCarts())
})
//Traemos el carro por id con http://localhost:8080/api/carts/idCarts con get
CartRouter.get("/:id", async (req,res)=>{
    res.send(await serviceCarts.getCartById(req.params.id))
})

//Ingresamos el producto al carrito con el siguiente formato http://localhost:8080/api/carts/idCarts/products/idProd con post
CartRouter.post("/:cid/products/:pid", async (req,res) => {
    let cartId = req.params.cid
    let prodId = req.params.pid
    res.send(await serviceCarts.addProductInCart(cartId, prodId))
})

//Eliminar el producto al carrito con el siguiente formato http://localhost:8080/api/carts/idCarts/products/idProd con delete
CartRouter.delete("/:cid/products/:pid", async (req,res) => {
    let cartId = req.params.cid
    let prodId = req.params.pid
    res.send(await serviceCarts.removeProductFromCart(cartId, prodId))
})

//Actualizar el carro con varios productos con el siguiente formato http://localhost:8080/api/carts/idCarts con put
CartRouter.put("/:cid", async (req,res) => {
    let cartId = req.params.cid
    let newProducts = req.body
    res.send(await serviceCarts.updateProductsInCart(cartId, newProducts))
})

//Actualizar el carro con varios productos con el siguiente formato http://localhost:8080/api/carts/idCarts con put
CartRouter.put("/:cid/products/:pid", async (req,res) => {
    let cartId = req.params.cid
    let prodId = req.params.pid
    let newProduct = req.body
    res.send(await serviceCarts.updateProductInCart(cartId, prodId, newProduct))
})
//Eliminar todos los productos del carro http://localhost:8080/api/carts/idCarts con delete
CartRouter.delete("/:cid", async (req,res) => {
    let cartId = req.params.cid
    res.send(await serviceCarts.removeAllProductsFromCart(cartId))
})
//Population
//Traemos todos los carritos con http://localhost:8080/api/carts con get
CartRouter.get("/population/:cid", async (req,res)=>{
    let cartId = req.params.cid
    res.send(await serviceCarts.getCartWithProducts(cartId))
})



export default CartRouter