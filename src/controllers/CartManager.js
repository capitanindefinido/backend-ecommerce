import {promises as fs} from 'fs'
import {nanoid} from "nanoid"
import ProductManager from './ProductManager.js'

const productAll = new ProductManager()

class CartManager {
    constructor(){
        this.path = "./src/models/carts.json"
    }

    exist = async (id) => {
        let carts = await this.readCarts()
        return carts.find(cart => cart.id === id)
    }

    readCarts = async () => {
        let carts = await fs.readFile(this.path, "utf-8")
        return JSON.parse(carts)        
    }

    writeCarts = async (carts) => {
        await fs.writeFile(this.path, JSON.stringify(carts))
    }

    addCarts = async () => {
        let cartsOld = await this.readCarts()
        let id = nanoid()
        let cartsConcat = [{id:id, products : []}, ...cartsOld]
        await this.writeCarts(cartsConcat)
        return "Carrito agregado"
    }

    getCartsById = async (id) => {
        let cartById = await this.exist(id)
        if(!cartById) return "Carrito no encontrado"
        return cartById
    }

    addProductInCart = async (cartId, productId) => {
        let carroId = await this.exist(cartId)
        if(!carroId) return "Carrito no encontrado"
        console.log(carroId)
        let productById = await productAll.exist(productId)
        if(!productById) return "Producto no encontrado"
        let cartsAll = await this.readCarts()
        let cartFilter = cartsAll.filter((cart) => cart.id != cartId)
        console.log(carroId.products)
        if(carroId.products.some((prod) => prod.id === productId)){
            let moreProductInCart = carroId.products.find((prod) => prod.id === productId)
            moreProductInCart.cantidad++
            let cartsConcat = [carroId, ...cartFilter]
            await this.writeCarts(cartsConcat)
            return "Producto sumado al Carrito"
        }
        carroId.products.push({id:productById.id,cantidad: 1})
        let cartsConcat = [carroId,...cartFilter]
        await this.writeCarts(cartsConcat)
        return "Producto Agregado al Carrito"
    }
}    

export default CartManager