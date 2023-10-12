import { cartsModel } from "../../models/carts.model.js";
import ProductManagerMongo from "./productManager.js";

const prodAll = new ProductManagerMongo()

class CartManagerMongo extends cartsModel
{
    constructor() {
        super();
    }
    async getCarts() 
    {
        try 
        {
          const carts = await cartsModel.find({})
          .populate({
            path: "products.productId",
            model: "products", 
            select: "image description price stock", 
          });
          return carts;
        } 
        catch (error) 
        {
          console.error('Error al obtener los carritos:', error);
          return [];
        }
      }
    async addCart(cartData) 
    {
        try 
        {
          await cartsModel.create(cartData);
          return 'Carrito agregado';
        } catch (error) {
          console.error('Error al agregar el carrito:', error);
          return 'Error al agregar el carrito';
        }
      }
    
      async getCartById(id) 
      {
        try 
        {
          const cart = await cartsModel.findById(id)   
          if (!cart) {
            return 'Carrito no encontrado';
          } 
          return cart;
        } 
        catch (error) 
        {
          console.error('Error al obtener el carrito:', error);
          return 'Error al obtener el carrito';
        }
      }

      async addProductInCart(cartId, prodId) 
      {
        try 
        {
          const cart = await cartsModel.findById(cartId);
    
          if (!cart) 
          {
            return 'Carrito no encontrado';
          }
    
          const existingProduct = cart.products.find((product) => product.productId === prodId);
    
          if (existingProduct) 
          {
            existingProduct.quantity += 1;
          } 
          else 
          {
            cart.products.push({
              productId: prodId,
              quantity: 1,
            });
          } 
          await cart.save();
          return 'Producto agregado al carrito';
        } catch (error) {
          console.error('Error al agregar el producto al carrito:', error);
          return 'Error al agregar el producto al carrito';
        }
      }
      async removeProductFromCart(cartId, prodId) 
      {
        try 
        {
          const cart = await cartsModel.findById(cartId);
          if (!cart) 
          {
            return 'Carrito no encontrado';
          }
      
          const productIndex = cart.products.findIndex((product) => product.productId === prodId);
      
          if (productIndex !== -1) 
          {
            cart.products.splice(productIndex, 1);
            await cart.save();
            return 'Producto eliminado del carrito';
          } 
          else 
          {
            return 'Producto no encontrado en el carrito';
          }
        } catch (error) {
          console.error('Error al eliminar el producto del carrito:', error);
          return 'Error al eliminar el producto del carrito';
        }
      }
      async updateProductsInCart(cartId, newProducts) 
      {
        try 
        {
          const cart = await cartsModel.findById(cartId);
      
          if (!cart) 
          {
            return 'Carrito no encontrado';
          }
      
          cart.products = newProducts;
      
          await cart.save();
          return 'Carrito actualizado con nuevos productos';
        } catch (error) {
          console.error('Error al actualizar el carrito con nuevos productos:', error);
          return 'Error al actualizar el carrito con nuevos productos';
        }
      }
      async updateProductInCart(cartId, prodId, updatedProduct) 
      {
        try 
        {
          const cart = await cartsModel.findById(cartId);
          if (!cart) 
          {
            return 'Carrito no encontrado';
          }     
          const productToUpdate = cart.products.find((product) => product.productId === prodId);
      
          if (!productToUpdate) 
          {
            return 'Producto no encontrado en el carrito';
          }
      
          Object.assign(productToUpdate, updatedProduct);
      
          await cart.save();
          return 'Producto actualizado en el carrito';
        } catch (error) {
          console.error('Error al actualizar el producto en el carrito:', error);
          return 'Error al actualizar el producto en el carrito';
        }
      }
      async removeAllProductsFromCart(cartId) 
      {
        try {
          const cart = await cartsModel.findById(cartId);    
          if (!cart) 
          {
            return 'Carrito no encontrado';
          }
      
          cart.products = [];
          await cart.save();
          
          return 'Todos los productos han sido eliminados del carrito';
        } catch (error) {
          console.error('Error al eliminar los productos del carrito:', error);
          return 'Error al eliminar los productos del carrito';
        }
      }
      async getCartWithProducts(cartId) 
      {
        try
        {
          const cart = await cartsModel.findById(cartId).populate('products.productId').lean();
      
          if (!cart) {
            return 'Carrito no encontrado';
          }
      
          return cart;
        } catch (error) {
          console.error('Error al obtener el carrito con productos:', error);
          return 'Error al obtener el carrito con productos';
        }
      }     
}

export default CartManagerMongo