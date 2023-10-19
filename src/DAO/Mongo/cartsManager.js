import { cartsModel } from "../../models/carts.model.js";
import ProductManagerMongo from "./productManager.js";

class CartManagerMongo {
  constructor() {
    this.model = cartsModel
  }

  async createCart() {
    return await this.model.create({
      products: [],
    });
  }
  async getCartBy(condition) {
    return await this.model.findOne(condition);
  }

  async addProducToCart({ cid, pid, quantity }) {
    const updatedCart = await this.model.findOneAndUpdate(
      { _id: cid, "products.product": pid },
      { $inc: { "products.$.quantity": quantity } }, // producto actual resultado de dal búsqueda
      { new: true } // hace que retorne el elemento modificado
      // {new: true, upsert: true, setDefaultsOnInsert: true} // hace que retorne el elemento modificado
    );
    if (updatedCart) {
      // condición que depende si encontro el producto
      // El producto ya estaba en el carrito, se actualizó su cantidad
      return updatedCart;
    }
    // El producto no estaba en el carrito, se agrega con quantity seleccionada
    const newProductInCart = await this.model.findOneAndUpdate(
      { _id: cid },
      { $push: { products: { product: pid, quantity } } }
      // { new: true, upsert: true }
    );
    return newProductInCart;
  }

  async deleteProdcutToCart({ cid, pid }) {
    return await this.model.findOneAndUpdate(
      { _id: cid },
      { $pull: { products: { product: pid } } },
      { new: true }
    );
  }
  async getCarts() {
    try {
      const carts = await cartsModel.find({}).populate({
        path: "products.productId",
        model: "products",
        select: "image description price stock",
      });
      return carts;
    } catch (error) {
      console.error("Error al obtener los carritos:", error);
      return [];
    }
  }
}

export default CartManagerMongo;
