import { Router } from "express";
import { cartsModel } from "../models/carts.model.js";
import CartManagerMongo from "../DAO/Mongo/cartsManager.js";

const CartRouter = Router()
const serviceCarts = new CartManagerMongo()


// cre
// traer un carrito por id
CartRouter.get('/:cid', async (req, res) => {
    const {cid} = req.params
    // const cart = await cartModel.findOne({_id:'651c3fe98e5062e4fb9090ec'})
    const cart = await serviceCarts.getCartBy({_id: cid})
    // const cart = await cartModel.findOne({_id:'651c3fe98e5062e4fb9090ec'}).populate('products.product')
    // console.log(cart.products)
    res.send({
        status: 'success',
        payload: cart
    })
})

CartRouter.post("/", async (req,res) =>{
    let newCart = await serviceCarts.createCart()
    res.send({
        status: 'success',
        payload: newCart
    })
})



// /api/carts - PUT - /:cid/products/:pid
CartRouter.put('/:cid/products/:pid', async (req, res) => {
    const {cid, pid} = req.params
    const {quantity} = req.body 
    // if (!cart) {
    //     // return res
    // }
    
    
    const result = await serviceCarts.addProducToCart({cid, pid, quantity})
    // console.log(result)
    res.send({status: 'success', payload: 'result'})
})
// /api/carts - delete - /:cid/products/pid
CartRouter.delete('/:cid/products/:pid', async (req, res) => {
    res.send({status: 'success', payload: 'result'})
})

//  api/carts - PUT - /:cid
CartRouter.put('/:cid', async (req, res) => {})

// /api/carts - delete - /:cid
CartRouter.delete('/:cid', async (req, res) => {
    res.send({status: 'success', payload: 'result'})
})



























/* //Se agrega carrito http://localhost:8080/api/carts con post donde nos ingresa un id y un producto con arreglo vacio
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
}) */



export default CartRouter